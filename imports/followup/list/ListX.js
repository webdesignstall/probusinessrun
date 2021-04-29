import { Meteor } from 'meteor/meteor';
// import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Session } from 'meteor/session';
import React, { useContext, useEffect, useState } from 'react';
import WorkData from '../../../common/collections_2';
import MainContext from '../Context';
import ListInnerDisplay from './ListInnerDisplay';

const List = () => {
	const [jobs, setJobs] = useState([]);
	const [loading, setLoading] = useState(false);
	// const [searchWord, setSearchWord] = useState('')
	const [searchWords, setSearchWords] = useState('');
	const [jobsBase, setJobsBase] = useState([]);
	// const [showLimit, setShowLimit] = useState(30);
	// const [status, setStatus] = useState('inProgress')
	const [rate, setRate] = useState(0);
	const [dataSubscribe, setDataSubscribe] = useState(null);

	const { searchWord, setSearchWord, status, setStatus, showLimit, setShowLimit } = useContext(
		MainContext
	);

	// regular expression for filter
	const regEx = /^[a-zA-Z0-9 \b]+$/;

	useEffect(() => {
		// let searchWord = Session.get('searchWord');
		let rate = Session.get('customerRate_');
		setRate(rate);

		setDataSubscribe(
			Meteor.subscribe(
				'workSchema',
				{ status },
				{ limit: showLimit, sort: { _id: -1 } },
				() => workDataFetcher()
			)
		);

		// buildComponent();
	}, []);

	useEffect(() => {
		() => buildComponent();
	}, [dataSubscribe]);

	const workDataFetcher = () => {
		let obj = status !== '' && typeof status === 'string' ? { status } : {};

		if (rate && rate > 1) {
			obj = { customerRate: Number(rate) };
		}

		let jobsFetched = WorkData.find(obj, {
			limit: showLimit,
			sort: {
				_id: -1
			}
		}).fetch();
		// let jobsFetched = WorkData.find(obj, {
		// 	limit: showLimit,
		// 	sort: {
		// 		_id: -1
		// 	}
		// }).fetch();
		console.log(`🚀 ~ file: List.js ~ line 52 ~ workDataFetcher ~ jobsFetched`, jobsFetched);

		setLoading(true);

		jobsFetched.sort((a, b) => {
			return (
				new Date(b.statusChange || '1 november 1989').getTime() -
				new Date(a.statusChange || '1 november 1989').getTime()
			);
		});

		setJobs(jobsFetched);
		setJobsBase(jobsFetched);
		setLoading(false);
		Session.set('isSearch', false);
	};

	const subscriber = () => {
		console.log('subscriber runned');
		console.log(`🚀 ~ file: List.js ~ line 91 ~ subscriber ~ status`, status);
		dataSubscribe && dataSubscribe.stop();
		const queryObj = { status, rate };
		const queryFilter = { limit: showLimit, sort: { _id: -1 } };
		setDataSubscribe(
			Meteor.subscribe('workSchema', queryObj, queryFilter, () => buildComponent())
		);
	};

	useEffect(() => {
		console.log('Status or Rate changed');
		if (dataSubscribe) {
			subscriber();
		}
	}, [status, rate]);

	useEffect(() => {
		if (dataSubscribe) {
			buildComponent();
		}
	}, [searchWord]);

	const buildComponent = () => {
		console.log('building component');
		// let { searchWord, setSearchWord, status, setStatus } = this.context;
		// let status = status;

		// let rate = Session.get('customerRate_');
		setLoading(true);

		// let searchWord = Session.get('searchWords');
		// let searchWord = searchWord;

		// if there is no word stop loading processes
		if (!(searchWord.length > 0)) {
			Session.set('loading', false), Session.set('searching', false);
		}

		if (
			(searchWord && searchWord.length > 0) ||
			(regEx.test(searchWord) && (Session.get('update') || !Session.get('update')))
		) {
			// workDataFetcher();

			// convert words into array
			let arrayOfWords = searchWords.split(' ');
			let indexOfEmpty = arrayOfWords.indexOf('');
			indexOfEmpty > -1 ? arrayOfWords.splice(indexOfEmpty, 1) : null;
			let indexOfSpace = arrayOfWords.indexOf(' ');
			indexOfSpace > -1 ? arrayOfWords.splice(indexOfSpace, 1) : null;
			let result = new Set();
			let sort = Session.get('sort');

			// stop subscription for gettin new one
			dataSubscribe && dataSubscribe.stop();
			// subscribe to new data
			Meteor.subscribe('searchFollowUp', arrayOfWords, () =>
				console.log('searchFollowUp subscribed')
			);

			// clean up words from problematic characters
			let reg = arrayOfWords.map(function(word) {
				word = word.replace('/', '');
				word = word.replace('(', '');
				word = word.replace(')', '');
				word = word.replace('\\', '');
				word = word.replace(':', '');
				word = word.replace(';', '');
				word = word.replace('`', '');
				word = word.replace('[', '');
				word = word.replace('.', '');
				word = word.replace(',', '');
				word = word.replace('"', '');
				word = word.replace(']', '');
				word = word.replace('?', '');
				return new RegExp(word, 'gi');
			});

			// find data matchin specific fields
			let resultConverted = WorkData.find(
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
				{ limit: 100, sort: { _id: -1 } }
			).fetch();

			!(arrayOfWords.length > 0) && (resultConverted = jobs);
			!(resultConverted.length > 0) && (resultConverted = [{}]);

			// arrayOfWords.length > 0
			// 	? Session.set('isSearch', true)
			// 	: Session.set('isSearch', false);
			setJobs(resultConverted);
		} else {
			let sort_ = Session.get('sort');
			let baza = [...jobsBase];

			baza.sort((a, b) => {
				if (sort_ === 'default') {
					return (
						new Date(b.statusChange || '1 november 1989').getTime() -
						new Date(a.statusChange || '1 november 1989').getTime()
					);
				}

				if (sort_ === 'az') {
					return (
						new Date(a.workDate || '1 november 1989').getTime() -
						new Date(b.workDate || '1 november 1989').getTime()
					);
				}

				if (sort_ === 'za') {
					return (
						new Date(b.workDate || '1 november 1989').getTime() -
						new Date(a.workDate || '1 november 1989').getTime()
					);
				}

				if (sort_ === 'lc') {
					return (
						new Date(b.lastChange || '1 november 1989').getTime() -
						new Date(a.lastChange || '1 november 1989').getTime()
					);
				}
			});

			setJobs(baza);
			Session.set('loading', false);
			Session.set('isSearch', false);
		}
	};

	const startStopLoading = () => {
		setLoading(!loading);
	};

	const renderList = () => {
		let jobs_ = [...jobs];
		let newJobs = [];

		if (jobs_.length > showLimit) {
			newJobs = jobs_.slice(0, showLimit + 1);
		} else {
			newJobs = jobs_;
		}

		return newJobs.map(jobMap => {
			return Session.get('is') === jobMap._id ? (
				<div key={jobMap._id + 'followUpList'} className="collection-item">
					<ListInnerDisplay loading={startStopLoading} job={jobMap} />
				</div>
			) : Session.get('is') === '' ? (
				<div key={jobMap._id + 'followUpList'} className="collection-item">
					<ListInnerDisplay loading={startStopLoading} job={jobMap} />
				</div>
			) : null;
		});
	};

	const increaseLimit = () => {
		setShowLimit(showLimit + 10);
	};

	return (
		<>
			<div className="collection">{renderList()}</div>
			<div className={jobs.length > 30 ? 'showMore' : 'hide'} onClick={increaseLimit}>
				show more
			</div>
		</>
	);
};

export default List;
