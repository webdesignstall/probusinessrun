import AWS from 'aws-sdk';
import email from 'emailjs';
import pdf from 'html-pdf';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import BonusSettings from '../common/bonusData';
import WorkData from '../common/collections_2';
import locations from '../imports/helpers/companyInfos.json';
import pdfTemplate from './htmlToPDFTemplate';

const locationsFetched = locations.companies.map((locationInfo, index) => {
	return locationInfo.name;
});

// Set the region
AWS.config.update({
	region: 'us-west-1',
	accessKeyId: 'AKIAT6GWTJD2WI5MB5FA',
	secretAccessKey: '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'
});

// Create S3 service object
let s3 = new AWS.S3({ apiVersion: '2006-03-01' });

/*global moment*/

if (Meteor.isServer) {
	// methods
	Meteor.methods({
		// remove user
		removeUser: function(id) {
			Meteor.users.remove(id);
		},
		// add user
		addUserOrTruck: function(obj) {
			let userInfo = Accounts.createUser(obj);
			if (userInfo) {
				return userInfo;
			} else {
				throw new Meteor.Error('Error', "Can't create information in the database");
			}
		},

		updateUserOrTruck: function(id, obj) {
			Meteor.users.update(
				{ _id: id },
				{
					$set: {
						profile: obj
					}
				},
				err => {
					if (err) {
						console.error(`id: ${obj._id}`, err);
						throw new Meteor.Error(
							'Error',
							"Can't update information. Please contact with the administration"
						);
					}
				}
			);
		},

		checkId: function(id) {
			let list = WorkData.find({ _id: id }).fetch();
			if (list.length > 0) {
				return list[0];
			} else {
				return false;
			}
		},
		officeEmployees: function() {
			return Meteor.users.find({ 'profile.rank': 'officeEmployee' }).fetch();
		},
		employees: function() {
			return Meteor.users.find({}).fetch();
		},
		findJobEx: function(param) {
			let data = WorkData.find(param || {}).fetch();
			return data;
		},
		findJobNumber: function(jobNumber) {
			return WorkData.findOne({ jobNumber });
		},
		findJobID: function(_id) {
			return WorkData.findOne({ _id });
		},
		followUpEmail: function(job, template) {
			let server = email.server.connect({
				user: job.companyInfo.email,
				password: 'BENT1fix_drop!',
				timeout: 60000,
				host: job.companyInfo.smtp,
				ssl: true
			});

			let workDate = moment(job.workDate);
			let today = moment(new Date());

			let diff = workDate.diff(today, 'days');

			let message = {
				text: ' ',
				from: job.companyInfo.name + ' ' + job.companyInfo.email,
				to: job.email,
				subject: `${diff} more ${diff === 1 ? 'day' : 'days'}! Job #${job.jobNumber}`,
				attachment: [
					{
						data: template,
						alternative: true
					}
				]
			};

			server.send(message, function(err) {
				if (err) {
					console.error(`id: ${job._id}`, err);
					throw new Meteor.Error(
						'500',
						"Can't send email. Please contact system adminstration"
					);
				}
				console.info('Follow up Email succesfully sent to: ' + job.email);
			});
		},
		rate: function(_id, rate) {
			let job = WorkData.findOne({ _id });
			let oldRate = job.customerRate || 0;
			let oldJobUpdates = job.updates || [];
			let updates = {
				by: Meteor.userId(),
				date: new Date(),
				changes: [
					{
						kind: 'E',
						path: ['customerRate'],
						lhs: oldRate,
						rhs: rate
					}
				]
			};
			oldJobUpdates.push(updates);
			WorkData.update(
				{ _id },
				{ $set: { customerRate: rate, updates: oldJobUpdates } },
				err => {
					console.error(`id: ${_id}`, err);
				}
			);
		},
		saveBonusSettings: function(_id, settings) {
			BonusSettings.update({ _id }, { $set: { options: settings } }, err => {
				if (err) {
					console.error(`id: ${_id}`, err);
					throw new Meteor.Error('Error while saving settings');
				}
			});
		},
		saveSmallItemPacking: function(value, what, id) {
			WorkData.update({ _id: id }, { $set: { [what]: value } });
		},
		saveToPdf: function(canvas, id) {
			let htmlTemplate = pdfTemplate(canvas);
			let options = { format: 'Letter' };

			pdf.create(htmlTemplate, options).toStream((err, stream) => {
				if (err) {
					console.error(`id: ${id}`, err);
				} else {
					console.info('pdf file created successfully for id:' + id);

					// call S3 to retrieve upload file to specified bucket
					var uploadParams = {
						Bucket: 'probusinessrun.finished.jobs.pdf',
						Key: id + '.pdf',
						Body: ''
					};

					// Configure the file stream and obtain the upload parameters
					var fileStream = stream;
					fileStream.on('error', function(err) {
						console.error(`File error on id: ${id}`, err);
					});
					uploadParams.Body = fileStream;

					// call S3 to retrieve upload file to specified bucket
					s3.upload(uploadParams, (err, data) => {
						if (err) {
							console.error(`Error to upload file to S3 server on id: ${id}`, err);
						}
						if (data) {
							console.info(
								'Upload Success: pdf for job: ' + id + ' ' + data.Location
							);
						}
					});
				}
			});
		},
		cardHolderPDF: function(canvas, id, nameOfpdf) {
			let htmlTemplate = pdfTemplate(canvas);
			let options = { format: 'Letter' };

			pdf.create(htmlTemplate, options).toStream((err, stream) => {
				if (err) {
					console.error(`id: ${id}`, err);
				} else {
					console.info('pdf file created successfully for cardholder in id:' + id);

					// call S3 to retrieve upload file to specified bucket
					var uploadParams = {
						Bucket: 'probusinessrun.finished.jobs.pdf',
						Key: nameOfpdf,
						Body: ''
					};

					// Configure the file stream and obtain the upload parameters
					var fileStream = stream;
					fileStream.on('error', function(err) {
						console.error(`Error while uploading file on id: ${id}`, err);
					});
					uploadParams.Body = fileStream;

					// call S3 to retrieve upload file to specified bucket
					s3.upload(uploadParams, (err, data) => {
						if (err) {
							console.error(`id: ${id}`, err);
						}
						if (data) {
							console.info(
								'Upload Success: cardholder pdf for job: ' +
									id +
									' ' +
									data.Location
							);
						}
					});
				}
			});
		},
		createBonusSettings: function() {
			let dateForSettings = `${new Date().getMonth()}/01/${new Date().getFullYear()}`;
			let countFoundedeData = BonusSettings.find({
				date: dateForSettings
			}).fetch();

			if (!(countFoundedeData.length > 0)) {
				BonusSettings.insert({
					date: dateForSettings,
					options: [
						{
							value: 'limit',
							name: 'Jobs Limit',
							bonus: 200
						},
						{
							value: 'items',
							name: 'Items',
							bonus: 0
						},
						{
							value: 'studio',
							name: 'Studio',
							bonus: 0
						},
						{
							value: '1_bedroom',
							name: '1 Bedroom',
							bonus: 0
						},
						{
							value: '2_bedroom_small',
							name: '2 Bedroom (small size, few items)',
							bonus: 0
						},
						{
							value: '2_bedroom_avg',
							name: '2 Bedroom (avg. size, avg. items)',
							bonus: 0
						},
						{
							value: '2_bedroom_large',
							name: '2 Bedroom (large size, many items)',
							bonus: 0
						},
						{
							value: '3_bedroom_avg',
							name: '3 Bedroom (avg. size, avg. items)',
							bonus: 0
						},
						{
							value: '3_bedroom_large',
							name: '3 Bedroom (large size, many items)',
							bonus: 0
						},
						{
							value: '4_bedrooom_avg',
							name: '4 Bedrooms (avg. size, avg. items)',
							bonus: 0
						},
						{
							value: '4_bedroom_large',
							name: '4 Bedrooms (large size, many items)',
							bonus: 0
						},
						{
							value: '5_bedroom_avarage',
							name: '5 Bedrooms (avarage size, avg items)',
							bonus: 0
						},
						{
							value: 'commercial_sml',
							name: 'Commercial (small size, few items)',
							bonus: 0
						},
						{
							value: 'commercial_avg',
							name: 'Commercial (avg. size, avg. items)',
							bonus: 0
						},
						{
							value: 'commercial_large',
							name: 'Commercial (large size, many items)',
							bonus: 0
						},
						{
							value: 'long_distance_moves',
							name: 'Long Distance Moves',
							bonus: 0
						}
					]
				});
			}
		},
		getQueryData(selector, options) {
			const data = WorkData.find(selector || {}, options || { limit: 31 }).fetch();
			return data;
		},
		searchByWords(words, aggr) {
			let reg = words.map(function(word) {
				return new RegExp(word, 'gi');
			});

			return WorkData.find(
				{
					$or: [
						{
							clientFirstName: {
								$in: reg
							}
						},
						{
							clientLastName: {
								$in: reg
							}
						},
						{
							jobNumber: {
								$in: reg
							}
						},
						{
							phoneNumber: {
								$in: reg
							}
						}
					]
				},
				aggr
			).fetch();
		},
		dataCounterStatistic(param) {
			return WorkData.count(param || {});
		},
		fetchUsers(_id) {
			if (_id) {
				let user = Meteor.users.find({ _id }).fetch();
				let userRank = user[0] && user[0].profile.rank;

				if (userRank === 'admin') {
					return Meteor.users
						.find({
							$or: [{ 'profile.rank': 'admin' }, { 'profile.rank': 'officeEmployee' }]
						})
						.fetch();
				} else {
					return user;
				}
			} else {
				throw new Meteor.Error(500, 'No User information', 'Cant get user id');
			}
		},
		async statisticDataFetch(userId, dateRange, company, status, employee, monthList) {
			const locationsList = locationsFetched;
			let query = {
				workDateConverted: { $gte: dateRange[0], $lt: dateRange[1] }
			};
			let results = {
				companiesResult: {},
				employeeResults: {},
				statusResult: {},
				monthResult: {}
			};

			// find by company names and assign to results
			let companyQueryLoop = { ...query };
			let companySelection = company === 'all' ? locationsList : [company]; // if selected all assign all locations

			companySelection.map((company_, index) => {
				companyQueryLoop['companyInfo.name'] = company_;
				status && status != 'all' && (companyQueryLoop.status = status);
				employee && employee != 'all' && (companyQueryLoop.takenBy = employee);
				results.companiesResult[company_] = WorkData.find(companyQueryLoop).count();
				return null;
			});

			// find by employees and assign to results
			let employeeQueryLoop = { ...query };
			let usersList = await Meteor.call('fetchUsers', userId);

			usersList.map((employee, index) => {
				company &&
					company != 'all' &&
					(employeeQueryLoop['companyInfo.name'] = companySelection[0]);
				status && status != 'all' && (employeeQueryLoop.status = status);
				employee && (employeeQueryLoop.takenBy = employee._id);
				results.employeeResults[employee.profile.firstName] = WorkData.find(
					employeeQueryLoop
				).count();
				return null;
			});

			// find by status and assign to results
			let statusQueryLoop = { ...query };
			const statusList =
				status === 'all' ? ['won', 'lost', 'inProgress', 'cancelled'] : [status];

			statusList.map((status_, index) => {
				company &&
					company != 'all' &&
					(statusQueryLoop['companyInfo.name'] = companySelection[0]);
				usersList && usersList.length === 1 && (statusQueryLoop.takenBy = employee._id);
				statusQueryLoop.status = status_;
				results.statusResult[status_] = WorkData.find(statusQueryLoop).count();
				return null;
			});

			// find by monthls and assign to results
			monthList.map((month_, index) => {
				let monthQuery = {
					workDateConverted: {
						$gte: new Date(
							moment(month_)
								.startOf('month')
								.toISOString()
						),
						$lt: new Date(
							moment(month_)
								.endOf('month')
								.toISOString()
						)
					}
				};

				status !== 'all' && (monthQuery.status = status);
				company &&
					company != 'all' &&
					(monthQuery['companyInfo.name'] = companySelection[0]);
				usersList && usersList.length === 1 && (monthQuery.takenBy = userId);
				const monthResult = WorkData.find(monthQuery).count();
				results.monthResult[moment(month_).format('YYYY MM')] = monthResult;
				return null;
			});

			return results;
		}
	});
}
