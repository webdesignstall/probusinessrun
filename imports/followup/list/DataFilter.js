import { Meteor } from 'meteor/meteor';
import { useContext, useEffect, useState } from 'react';
import MainContext from '../Context';

function DataFilter() {
	const [param, setParam] = useState(null); // query parameters
	const [searchWordsArray, setSearchWordsArray] = useState([]); // query parameters
	const {
		jobList,
		setJobList,
		status,
		rate,
		showLimit,
		searchWord,
		setLoading,
		sorting,
		displayExtendedJobInformation,
		setDisplayExtendedInformation
	} = useContext(MainContext);

	const [aggr, setAggr] = useState({ limit: showLimit, sort: { _id: -1 } }); // query aggregation

	// data subscriber
	const initializer = () => {
		if (typeof status === 'string' && status.length > 0) {
			let newParam = { status };
			let newAggr = { limit: showLimit, sort: { _id: -1 } };

			!!rate && (newParam.customerRate = rate);

			setParam(newParam);
			setAggr(newAggr);
		} // if rate 0 don't add as a query
	};

	// data fetch function
	const fetchJobs = () => {
		if (param) {
			Meteor.call('getQueryData', param, aggr, (error, result) => {
				result.map(job => {
					if (
						job.status === 'inProgress' &&
						job.workDateConverted.setHours(23, 0, 0) < new Date()
					) {
						//update status to lost if job expired
						Meteor.call('updateExpiredJobStatus', job._id);
					}
				});
				if (param.status === 'inProgress') {
					let newRes = result.filter(
						job => job.workDateConverted.setHours(23, 0, 0) >= new Date()
					);
					setJobList(newRes);
				} else {
					setJobList(result);
				}
			});
			//fetch inProgress jobs
			// if (param) {
			// 	Meteor.call('getQueryData', param, aggr, (error, result) => setJobList(result));
			// }
		}
	};

	// fetch data on change of parameters
	useEffect(() => {
		fetchJobs();
	}, [param, aggr, displayExtendedJobInformation]);

	// initially set subscription on component mount
	useEffect(() => {
		initializer();
	}, []);

	// set subscribtion on change of status rate and showlimit
	useEffect(() => {
		initializer();
	}, [status, rate, showLimit]);

	// set words array on search input change
	useEffect(() => {
		// if (searchWord.length > 0) {
		setSearchWordsArray(wordsCleanUp());
		// }
	}, [searchWord]);

	// fetch data on searchword
	useEffect(() => {
		if (searchWordsArray && searchWordsArray.length > 0) {
			Meteor.call('searchByWords', searchWordsArray, aggr, (error, result) => {
				setJobList(result);
				setLoading(false);
			});
		} else {
			fetchJobs();
		}
	}, [searchWordsArray]);

	/* ------------------------------ WORDS CLEANUP ----------------------------- */
	// clean up words from extra characters and returns array of words
	const wordsCleanUp = () => {
		let arrayOfWords = searchWord.split(' ');
		let indexOfEmpty = arrayOfWords.indexOf('');
		indexOfEmpty > -1 ? arrayOfWords.splice(indexOfEmpty, 1) : null;
		let indexOfSpace = arrayOfWords.indexOf(' ');
		indexOfSpace > -1 ? arrayOfWords.splice(indexOfSpace, 1) : null;

		return arrayOfWords.map(function(word) {
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
			word = word.replace('*', '');
			word = word.replace('^', '');
			word = word.replace('%', '');
			word = word.replace('&', '');
			word = word.replace('$', '');
			word = word.replace('#', '');
			word = word.replace('@', '');
			word = word.replace('!', '');
			word = word.replace('?', '');
			return new RegExp(word, 'gi');
		});
	};

	/* ------------------------------ DATA SORTING ------------------------------ */

	const sortingData = () => {
		let jobListData = [...jobList];
		jobListData.sort((a, b) => {
			if (sorting === 'default') {
				return (
					moment(b.statusChange || '1 november 1989') -
					moment(a.statusChange || '1 november 1989')
				);
			}

			if (sorting === 'az') {
				return (
					moment(a.workDate || '1 november 1989') -
					moment(b.workDate || '1 november 1989')
				);
			}

			if (sorting === 'za') {
				return (
					moment(b.workDate || '1 november 1989') -
					moment(a.workDate || '1 november 1989')
				);
			}

			if (sorting === 'lc') {
				return (
					moment(b.lastChange || '1 november 1989') -
					moment(a.lastChange || '1 november 1989')
				);
			}
		});

		setJobList(jobListData);
	};

	// on change of sorting type sort data
	useEffect(() => {
		sortingData();
	}, [sorting]);

	return null;
}

export default DataFilter;
