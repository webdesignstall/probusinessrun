import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import WorkData from '../../common/collections_2';
import { ReactiveVar } from 'meteor/reactive-var';
import { modalMessage } from '../../client/templates/module_messages/moduleMessage';
import { Session } from 'meteor/session';
import ReactDOM from 'react-dom';
import React from 'react';
import { Tracker } from 'meteor/tracker';
//import componenets
import DailyStats from './DailyStats';
import EditCalendarQuote from '../../client/templates/quote/editCalendarQuote/EditCalendarQuote';
import QuoteMainPage from '../../client/templates/quote/QuoteMainPage';
import jobNumberCreator from '../../client/templates/quote/JobNumberCreator';

/*global moment $ swal*/

let z = null;

function colorIndigator() {
	let isler = document.getElementsByClassName('work-list-show');
	let i = 0;

	for (i; i < isler.length; i++) {
		let moverIndigator = isler[i].getElementsByClassName('mover--status')[0];
		let truckIndigator = isler[i].getElementsByClassName('truck--status')[0];
		let id = isler[i].id;
		if (id !== '' && id !== null && id !== undefined) {
			let is = WorkData.findOne({ _id: id });
			let shouldSelectMovers = is.numberOfWorkers || 0;
			let shouldSelectTrucks = (is.trucksTemp && is.trucksTemp.length) || 0;
			let selectedMovers = (is.workers && is.workers.length) || 0;
			let selectedTruck = (is.trucks && is.trucks.length) || 0;

			truckIndigator.classList.remove('sari');
			truckIndigator.classList.remove('qirmizi');
			truckIndigator.classList.remove('yasil');
			moverIndigator.classList.remove('sari');
			moverIndigator.classList.remove('qirmizi');
			moverIndigator.classList.remove('yasil');

			selectedMovers < shouldSelectMovers && selectedMovers > 0
				? moverIndigator.classList.add('sari')
				: selectedMovers === shouldSelectMovers && selectedMovers > 0
				? moverIndigator.classList.add('yasil')
				: selectedMovers > shouldSelectMovers && shouldSelectMovers === 0
				? moverIndigator.classList.add('yasil')
				: null;
			selectedTruck < shouldSelectTrucks && selectedTruck > 0
				? truckIndigator.classList.add('sari')
				: selectedTruck === shouldSelectTrucks && selectedTruck > 0
				? truckIndigator.classList.add('yasil')
				: selectedTruck > shouldSelectTrucks && shouldSelectTrucks === 0
				? truckIndigator.classList.add('yasil')
				: null;
		}
	}
}

let infoDisplay;
let ayDeqiq;
let ayin1ciGunu;
let aydaGunlerinSayi;
let usersBaza;
let usersBazaObject = {};
let arrayToObject = function() {
	let i;
	for (i = 0; i < usersBaza.length; i++) {
		let ad = usersBaza[i].profile.firstName + ' id: ' + usersBaza[i]._id;
		usersBazaObject[ad] = null;
	}
};

function usersAutocomplete() {
	$('input[name*="workers"]').autocomplete({
		data: usersBazaObject,
		limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
		onAutocomplete: function(/*val*/) {
			// Callback function when value is autcompleted.
		},
		minLength: 1 // The minimum length of the input for the autocomplete to start. Default: 1.
	});
}

Template.kalendar.onCreated(function() {
	Template.instance().secilenTarix2 = new ReactiveVar('burger-form');
	Template.instance().vurulanId = new ReactiveVar('zulumbala');
	usersBaza = Meteor.users.find().fetch();
	arrayToObject();
});

Template.preQuote.onDestroyed(function() {
	$('#add-schedule-page').hide();
	$('#edit-schedule-page').hide();
	Session.set('secilmisIsciler', '');
});

Template.kalendar.onDestroyed(() => {
	z.stop();
	Session.set('addingJob', false);
	ReactDOM.unmountComponentAtNode(document.getElementById('edit_calendar_quote'));
	let dailyStatsList = document.getElementsByClassName('dailyStatsComponent');
	let i;
	for (i = 0; i < dailyStatsList.length; i++) {
		ReactDOM.unmountComponentAtNode(dailyStatsList[i]);
	}
});

Template.kalendar.helpers({
	gununIsleri: function() {
		let baza = WorkData.find({
			workDate: Template.instance()
				.secilenTarix2.get()
				.toString(),
			status: 'won'
		}).fetch();

		baza.sort((a, b) => {
			let first = Date.parse('11 Jan 2018 ' + a.workMustBeginTime[0]);
			let second = Date.parse('11 Jan 2018 ' + b.workMustBeginTime[0]);
			return first - second;
		});

		return baza;
	},
	labelName: function(label) {
		return label.name;
	},
	// labelColor: function(label) {
	//     return label.color;
	// },
	isGunMelumatVar: function() {
		return !!WorkData.find({
			status: 'won',
			workDate: Template.instance()
				.secilenTarix2.get()
				.toString()
		}).fetch().length;
	},
	// isAM: function(saat) {
	//     if (Number(saat.substr(0, 2)) < 12) {
	//         return true;
	//     } else {
	//         return false;
	//     }
	// },
	saatDeqiq: function(saat) {
		return saat[0] + ' - ' + saat[1];
	}
	// buDocument: function() {
	//     return WorkData.findOne({ _id: Template.instance().vurulanId.get() });
	// },
	// quotedir: function(quote) {
	//     return quote;
	// }
});

Template.kalendar.onRendered(() => {
	z = Tracker.autorun(() => {
		this.xx && this.xx.stop();
		Session.get('calendarCurrentDate') || Session.set('calendarCurrentDate', new Date());
		let calendarDate = Session.get('calendarCurrentDate');
		this.xx = Meteor.subscribe('calendar', calendarDate, {
			onReady: function() {
				let gunler = Array.from(document.getElementsByClassName('dayData'));
				let month = moment(calendarDate).format('MM');
				let year = moment(calendarDate).format('YYYY');
				let regex_ = month + '/[0-9][0-9]/' + year;

				let baza = WorkData.find({ workDate: { $regex: regex_ }, status: 'won' }).fetch();

				// let baza = WorkData.find({}).fetch();
				let fileterdJobs_ = function(date, status) {
					return baza.filter(job => {
						return job.workDate === date && job.status === status;
					});
				};

				gunler.map(gun => {
					let div = document.createElement('div');
					div.setAttribute('id', gun.id + '_');
					div.setAttribute('className', 'dailyStatsComponent');
					document.getElementById(gun.id).appendChild(div);
					if (gun.id.search('gunNomre') < 0) {
						let fileterdJobs = fileterdJobs_(gun.id, 'won');
						ReactDOM.render(
							<DailyStats workDataList={fileterdJobs} />,
							document.getElementById(gun.id + '_')
						);
					}
				});
			}
		});
	});

	let dataBase = [];
	let sayi = 0;
	let clickOnDay = 0;
	let clickOnSelect = 0;
	let gun = moment().date();
	let gunSayimi = 1;
	let ay = moment().month();
	const ayOriginiali = moment().month();
	let il = moment().year();
	const ilOriginal = moment().year();
	let aylarSiyahi = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];
	let dateChanged = 0;
	let classAdi = '';

	//autocomplete scripti

	usersAutocomplete();

	// tarixi yuxari panelde gosteren funksiya
	function tarixiGoster(ayDaxil, ilDaxil) {
		Tracker.autorun(() => {
			let totalJobs = new ReactiveVar(0);
			let monthIndex = ayDaxil + 1;
			let reg = (monthIndex < 10 ? '0' + monthIndex : monthIndex) + '/[0-9][0-9]/' + ilDaxil;

			totalJobs.set(
				WorkData.find({
					workDate: { $regex: reg },
					status: 'won'
				}).count()
			);
			Session.set('totalJobs', totalJobs.get());

			let ayAdi = moment.months(ayDaxil);
			let tarixIn = document.getElementById('ayHaqqinda');

			if (dateChanged === 1) {
				tarixIn.innerHTML =
					gun +
					`<a href="#" id="ay" class="tarixSecim"></a>
<a href="#" id="il" class="tarixSecim"></a>
<a href="#" id="goToday" class="tarixSecimGoToday"></a>
<a href="#" id="totalMonth">Total Jobs: ${totalJobs.get()}</a>
<div class="add-moreschedule-button">Create New Job + </div>`;
			} else {
				tarixIn.innerHTML =
					gun +
					`<a href="#" id="ay" class="tarixSecim"></a>
<a href="#" id="il" class="tarixSecim"></a>
<a href="#" id="totalMonth">Total Jobs: ${totalJobs.get()}</a>
<div class="add-moreschedule-button">Create New Job + </div>`;
			}
			let ayHedef = document.getElementById('ay');
			let ilHedef = document.getElementById('il');
			let goTodayHedef = document.getElementById('goToday');
			ayHedef.innerText = ayAdi;
			ilHedef.innerText = ilDaxil;
			if (dateChanged !== 0) {
				goTodayHedef.innerText = 'Go back today';
			}
		});
	}

	// tarixiGoster(ay, il);

	this.x = Tracker.autorun(function() {
		let totalJobs = new ReactiveVar(0);
		let monthIndex = ay + 1;
		let reg = (monthIndex < 10 ? '0' + monthIndex : monthIndex) + '/[0-9][0-9]/' + il;

		totalJobs.set(
			WorkData.find({
				workDate: { $regex: reg },
				status: 'won'
			}).count()
		);
		Session.set('totalJobs', totalJobs.get());

		let ayAdi = moment.months(ay);
		let tarixIn = document.getElementById('ayHaqqinda');

		if (dateChanged === 1) {
			tarixIn.innerHTML =
				gun +
				`<a href="#" id="ay" class="tarixSecim"></a>
<a href="#" id="il" class="tarixSecim"></a>
<a href="#" id="goToday" class="tarixSecimGoToday"></a>
<a href="#" id="totalMonth">Total Jobs: ${totalJobs.get()}</a>
<div class="add-moreschedule-button">Create New Job + </div>`;
		} else {
			tarixIn.innerHTML =
				gun +
				`<a href="#" id="ay" class="tarixSecim"></a>
<a href="#" id="il" class="tarixSecim"></a>
<a href="#" id="totalMonth">Total Jobs: ${totalJobs.get()}</a>
<div class="add-moreschedule-button">Create New Job + </div>`;
		}
		let ayHedef = document.getElementById('ay');
		let ilHedef = document.getElementById('il');
		let goTodayHedef = document.getElementById('goToday');
		ayHedef.innerText = ayAdi;
		ilHedef.innerText = il;
		if (dateChanged !== 0) {
			goTodayHedef.innerText = 'Go back today';
		}
	});

	// gunleri cedvele yerlesiren funksiya
	function gunYerlesdirme(ayx, ilx) {
		ayin1ciGunu = moment([ilx, ayx])
			.startOf('month')
			.day();
		aydaGunlerinSayi = moment([ilx, ayx])
			.endOf('month')
			.date();
		ayDeqiq = ayx + 1;
		let dayBoxes = document.getElementsByClassName('dayData');
		// xanalari loop edib icine gunleri yerlesdirmek ve idlerini hemin gun etmesi
		let gunYerlesdirilecekHedef; // gunun nomresi yerlesdirilecek hedef
		let y;
		for (y = 0; y < dayBoxes.length; y++) {
			// idlerin teyin ve aid edilmesi
			if (sayi < ayin1ciGunu || gunSayimi > aydaGunlerinSayi) {
				dayBoxes[y].setAttribute('id', '');
				dayBoxes[y].setAttribute('id', 'gunNomre' + sayi);
				document.getElementById('gunNomre' + sayi).innerHTML = '';
			}
			if (sayi >= ayin1ciGunu && gunSayimi < aydaGunlerinSayi + 1) {
				if (gunSayimi < 10) {
					if (ayx < 9) {
						let teqvim = '0' + ayDeqiq + '/0' + gunSayimi + '/' + ilx;
						dayBoxes[y].setAttribute('id', '');
						dayBoxes[y].setAttribute('id', teqvim);
					} else {
						let teqvim = ayDeqiq + '/0' + gunSayimi + '/' + ilx;
						dayBoxes[y].setAttribute('id', '');
						dayBoxes[y].setAttribute('id', teqvim);
					}
				} else {
					if (ayx < 9) {
						let teqvim = '0' + ayDeqiq + '/' + gunSayimi + '/' + ilx;
						dayBoxes[y].setAttribute('id', '');
						dayBoxes[y].setAttribute('id', teqvim);
					} else {
						let teqvim = ayDeqiq + '/' + gunSayimi + '/' + ilx;
						dayBoxes[y].setAttribute('id', '');
						dayBoxes[y].setAttribute('id', teqvim);
					}
				}
			}
			if (sayi >= ayin1ciGunu && gunSayimi < aydaGunlerinSayi + 1) {
				if (gunSayimi < 10) {
					if (ayx < 9) {
						let teqvim = '0' + ayDeqiq + '/0' + gunSayimi + '/' + ilx;
						gunYerlesdirilecekHedef = document.getElementById(teqvim);
						gunYerlesdirilecekHedef.innerHTML = gunSayimi;
						gunSayimi++;
					} else {
						let teqvim = ayDeqiq + '/0' + gunSayimi + '/' + ilx;
						gunYerlesdirilecekHedef = document.getElementById(teqvim);
						gunYerlesdirilecekHedef.innerHTML = gunSayimi;
						gunSayimi++;
					}
				} else {
					if (ayx < 9) {
						let teqvim = '0' + ayDeqiq + '/' + gunSayimi + '/' + ilx;
						gunYerlesdirilecekHedef = document.getElementById(teqvim);
						gunYerlesdirilecekHedef.innerHTML = gunSayimi;
						gunSayimi++;
					} else {
						let teqvim = ayDeqiq + '/' + gunSayimi + '/' + ilx;
						gunYerlesdirilecekHedef = document.getElementById(teqvim);
						gunYerlesdirilecekHedef.innerHTML = gunSayimi;
						gunSayimi++;
					}
				}
			}
			sayi += 1;
		}
		sayi = 0;
		gunSayimi = 1;
		try {
			let aktivGunHedef = document.getElementById(moment().format('MM/DD/YYYY'));
			$('.dayData').removeClass('aktivGun');
			aktivGunHedef.className += ' aktivGun';
		} catch (err) {
			return true;
		}

		let gunler = Array.from(document.getElementsByClassName('dayData'));
		gunler.map(gun => {
			let div = document.createElement('div');
			div.setAttribute('id', gun.id + '_');
			div.setAttribute('class', 'dailyStatsComponent');
			document.getElementById(gun.id).appendChild(div);
			if (gun.id.search('gunNomre') < 0) {
				let fileterdJobs = filterJob(gun.id, 'won');
				ReactDOM.render(
					<DailyStats workDataList={fileterdJobs} />,
					document.getElementById(gun.id + '_')
				);
			}
		});
	}

	gunYerlesdirme(ay, il);

	// click eventler
	$('body').click(function(event) {
		// go today click
		if (event.target.id === 'goToday') {
			clickOnSelect = 0;
			dateChanged = 0;
			tarixiGoster(ayOriginiali, ilOriginal);
			$('#teqvimSecim').slideUp(500);
			gunYerlesdirme(ayOriginiali, ilOriginal);
			$('.dayInfo').hide();
		}

		if (event.target.className === 'tarixSecim') {
			let idInfo = event.target.id;
			let z;
			let hedefInsert = document.getElementById('teqvimSecim');
			// aylarin adlari siyahisi
			if (idInfo === 'ay') {
				let ayAdlarSiyahi = '';
				for (z = 0; z < aylarSiyahi.length; z++) {
					ayAdlarSiyahi +=
						'<a href="#" name="' +
						z +
						'" class="tarixSecim tarixSecimay">' +
						aylarSiyahi[z] +
						'</a>';
				}
				hedefInsert.innerHTML = ayAdlarSiyahi;
			}
			// illerin siyahisi
			if (idInfo === 'il') {
				let ilSiyahi = '';
				let ilHesab = il;
				for (z = -3; z < 2; z++) {
					ilHesab = Number(il) + z;
					ilSiyahi +=
						'<a href="#" name="' +
						ilHesab +
						'" class="tarixSecim tarixSecimay">' +
						ilHesab +
						'</a>';
				}
				hedefInsert.innerHTML = ilSiyahi;
			}
			// ay ve ya il siyahisini gosterme ve gizletme
			if (clickOnSelect !== idInfo) {
				clickOnSelect = idInfo;
				$('#teqvimSecim').slideDown(500);
			} else if (clickOnSelect === idInfo) {
				clickOnSelect = 0;
				$('#teqvimSecim').slideUp(500);
			}

			// vurulan tarixi funkasiya vasitesile cedvele yerlesdirme
			$('.tarixSecimay').click(function(event) {
				if (event.target.name < 12) {
					ay = Number(event.target.name);
					let oldDate = Session.get('calendarCurrentDate');
					il = moment(oldDate).format('YYYY');
					let newDate = new Date(ay + 1 + '/01/' + il);
					Session.set('calendarCurrentDate', newDate);
				}
				if (event.target.name > 2000 && event.target.name < 2100) {
					il = Number(event.target.name);
					let oldDate = Session.get('calendarCurrentDate');
					ay = moment(oldDate).format('M') - 1;
					let newDate = new Date(Number(ay) + 1 + '/01/' + il);
					Session.set('calendarCurrentDate', newDate);
				}
				dateChanged = 1;
				ayDeqiq = ay + 1;
				ayin1ciGunu = moment([il, ay])
					.startOf('month')
					.day();
				aydaGunlerinSayi = moment([il, ay])
					.endOf('month')
					.date();
				gunYerlesdirme(ay, il);
				tarixiGoster(ay, il);
				$('.dayInfo').hide();

				let gunler = Array.from(document.getElementsByClassName('dayData'));
				gunler.map(gun => {
					let div = document.createElement('div');
					div.setAttribute('id', gun.id + '_');
					div.setAttribute('className', 'dailyStatsComponent');
					document.getElementById(gun.id).appendChild(div);
					if (gun.id.search('gunNomre') < 0) {
						let fileterdJobs = filterJob(gun.id, 'won');
						ReactDOM.render(
							<DailyStats workDataList={fileterdJobs} />,
							document.getElementById(gun.id + '_')
						);
					}
				});
			});
		}

		// islerin siyahisini cixartma
		if (
			event.target.className.search('dayData') > -1 &&
			event.target.id.search('gunNomre') === -1
		) {
			// Meteor.subscribe('workSchema');

			try {
				let secilmisGun = document.getElementById(event.target.id);
				$('.dayData').removeClass('aktivGun');
				secilmisGun.className += ' aktivGun';
			} catch (err) {
				err ? console.error(err) : null;
			}

			// Islerin siyahisini cixardir
			if (clickOnDay === 0 || clickOnDay !== event.target.id) {
				clickOnDay = event.target.id;

				// aid olduqu heftenin informasiya gosteren td show edir
				infoDisplay = function() {
					let baza = ['week1', 'week2', 'week3', 'week4', 'week5', 'week6'];
					let bazatd = ['weektr1', 'weektr2', 'weektr3', 'weektr4', 'weektr5', 'weektr6'];
					classAdi = event.target.className;
					let o;
					for (o = 0; o < baza.length; o++) {
						if (classAdi.search(baza[o]) > -1) {
							$('.' + bazatd[o]).show();
						}
						if (classAdi.search(baza[o]) === -1) {
							$('.' + bazatd[o]).hide();
						}
					}
				};

				infoDisplay();
			} else {
				clickOnDay = 0;
				$('.dayInfo').hide();
			}
		}
	});

	Tracker.autorun(() => {
		// dataBase = WorkData.find(
		//     {},
		//     {
		//         limit: 100,
		//         sort: {
		//             _id: -1
		//         }
		//     }
		// ).fetch();
		gunYerlesdirme();
	});

	function filterJob(date, status) {
		let data = WorkData.find({
			workDate: date,
			status
		}).fetch();

		data.filter(job => {
			return job.workDate === date && job.status === status;
		});

		return data;
	}

	$('.dayData').click(function() {
		$('#modal1').modal();
	});
});

// label modal box selector
// function labelModalbox (id){
//     document
// }

// kalendardaki eventler
Template.kalendar.events({
	'click .delete-duymesi': function() {
		if (!Session.get('addingJob') && confirm('Are you sure to delete this event?')) {
			Meteor.call('isiSilmek', this._id);
		}
	},
	'click .dayData': function(event) {
		event.preventDefault();
		Template.instance().secilenTarix2.set(event.target.id);

		setTimeout(colorIndigator, 900);
	},
	'click .modalContent_labels': function(event) {
		let name = event.target.getAttribute('data-label');
		let color = event.target.getAttribute('data-color');

		let obj = {
			_id: Session.get('labelJobId'),
			label: {
				name,
				color
			}
		};

		Meteor.call('updateWork', obj, err => {
			if (err) {
				swal({
					title: 'Error!',
					text: 'Cant update label in this job',
					icon: 'error',
					button: 'OK'
				});
			} else {
				document.getElementById('labelModal').classList.add('hide');
				Session.set('labelJobId', '');
				swal({
					title: 'Success!',
					text: 'Label succsessfully added to the job',
					icon: 'success',
					button: 'OK'
				});
			}
		});
	},
	'click .modalClose': function() {
		document.getElementById('labelModal').classList.add('hide');
		Session.set('labelJobId', '');
	},
	'click .label_main': function() {
		document.getElementById('labelModal').classList.remove('hide');
		Session.set('labelJobId', this._id);
	},
	'click .add-schedule-button': function(event) {
		event.preventDefault();
		$('#add-schedule-page').show();
		$('#kalendar').hide();
		Session.set('is', '');

		$(document).ready(function() {
			$('select').material_select();
		});
	},
	'click .add-moreschedule-button': function(event) {
		event.preventDefault();
		$('#add-schedule-page').show();
		$('#edit-schedule-page').hide();
		Session.set('is', '');

		$(document).ready(function() {
			$('select').material_select();
		});

		ReactDOM.render(<QuoteMainPage />, document.getElementById('pre_quote'));

		Session.set('job_', {
			takenBy: Meteor.userId(),
			sourceOfLeads: 'call',
			quoteDate: new Date()
		});
		jobNumberCreator();

		document.getElementById('add-schedule-page').scrollIntoView({ behavior: 'smooth' });
		Session.set('addingJob', true);
	},
	'click .baqla': function(event) {
		event.preventDefault();
		colorIndigator();
		$('#add-schedule-page').hide();
		$('#edit-schedule-page').hide();
		Session.set('secilmisIsciler', '');
		Session.set('is', '');
		Session.set('addingJob', false);
		Session.set('job_', {});

		ReactDOM.unmountComponentAtNode(document.getElementById('edit_calendar_quote'));

		let btns = document.getElementsByClassName('btn');
		for (let i = 0; i < btns.length; i++) {
			btns[i].classList.remove('disabled');
		}
	},
	'click .edit-duymesi': function(event) {
		event.preventDefault();
		$('#edit-schedule-page').hide();

		$('#edit-schedule-page').show();
		let job = WorkData.findOne({ _id: this._id });
		Session.set('job_', job);
		ReactDOM.unmountComponentAtNode(document.getElementById('pre_quote'));
		ReactDOM.render(<EditCalendarQuote />, document.getElementById('edit_calendar_quote'));

		document.getElementById('edit-schedule-page').scrollIntoView({ behavior: 'smooth' });
	},
	'click #testucun': function() {
		function yenidenIsled() {
			$('input[name*="workers"]').autocomplete({
				data: usersBazaObject,
				limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
				onAutocomplete: function(/*val*/) {
					// Callback function when value is autcompleted.
				},
				minLength: 1 // The minimum length of the input for the autocomplete to start. Default: 1.
			});
		}

		setTimeout(yenidenIsled, 100);
	},
	'click .elave-et': function() {
		let say = 1;
		$('.elave-et').text('remove_circle');
		$('.elave-et').addClass('sil');
		$('.elave-et').removeClass('elave-et');
		$('.iscileriElaveEt').append(
			'<div class="input-field valideyn col s12 m12 l12"><i id="hu" class="material-icons isare elave-et">add_circle</i><input name="workers.' +
				say +
				'.id" class="xx" type="text" placeholder="Add employee"></div>'
		);
		usersAutocomplete();
		say++;
	},
	'click .sil': function(e) {
		$(e.target)
			.parent()
			.remove();
	}
});

Template.registerHelper('isBosdur', function(workMustBeginTime) {
	return workMustBeginTime === '' || workMustBeginTime === undefined;
});

// Bazaya melumat daxil olduqdan sonra cixan mesaj
WorkData.after.insert(function(user, doc) {
	modalMessage('Work Schedule added to calendar succesfully!');
	let isciler = $('input[name*="workers"]');
	let i;
	for (i = 0; i < isciler.length; i++) {
		let userValue = isciler[i].value;
		let baslanqicIndex = userValue.indexOf('id:');
		let correctIndex = Number(baslanqicIndex) + 4;
		let istifadeciId = userValue.substr(correctIndex, userValue.length);
		Meteor.users.update({ _id: istifadeciId }, { $push: { isler: { is: doc._id, payed: 0 } } });
	}
});
