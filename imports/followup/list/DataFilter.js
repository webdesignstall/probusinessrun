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
			Meteor.call('getQueryData', param, aggr, (error, result) => setJobList(result));
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

	// sorting data
	const sortingData = () => {
		let jobListData = [...jobList];
		jobListData.sort((a, b) => {
			if (sorting === 'default') {
				return (
					new Date(b.statusChange || '1 november 1989').getTime() -
					new Date(a.statusChange || '1 november 1989').getTime()
				);
			}

			if (sorting === 'az') {
				return (
					new Date(a.workDate || '1 november 1989').getTime() -
					new Date(b.workDate || '1 november 1989').getTime()
				);
			}

			if (sorting === 'za') {
				return (
					new Date(b.workDate || '1 november 1989').getTime() -
					new Date(a.workDate || '1 november 1989').getTime()
				);
			}

			if (sorting === 'lc') {
				return (
					new Date(b.lastChange || '1 november 1989').getTime() -
					new Date(a.lastChange || '1 november 1989').getTime()
				);
			}
		});

		setJobList(jobListData);
	};

	// on change of sorting type sort data
	useEffect(() => {
		sortingData();
	}, [sorting]);

	// const subscSearchWords = () => {
	// 	dataSub && dataSub.stop(); // stop subscription for gettin new one
	// 	Meteor.subscribe('searchFollowUp', arrayOfWords);
	// };

	// const fetchConvertedWord = reg => {
	// 	return WorkData.find(
	// 		{
	// 			$or: [
	// 				{
	// 					clientFirstName: {
	// 						$in: reg
	// 					}
	// 				},
	// 				{
	// 					clientLastName: {
	// 						$in: reg
	// 					}
	// 				},
	// 				{
	// 					jobNumber: {
	// 						$in: reg
	// 					}
	// 				},
	// 				{
	// 					phoneNumber: {
	// 						$in: reg
	// 					}
	// 				}
	// 			]
	// 		},
	// 		{ limit: showLimit, sort: { _id: -1 } }
	// 	).fetch();
	// };

	// // on change of search word set new data
	// useEffect(() => {
	// 	if (shouldRenderSet) {
	// 		if (!(searchWord.length > 0)) {
	// 			setLoading(false);
	// 			subscriber(fetchJobs);
	// 		} else {
	// 			// subscribe to new data
	// 			subscSearchWords();

	// 			let reg = wordsCleanUp(); // clean up words from problematic characters
	// 			let resultConverted = fetchConvertedWord(reg); // find data matchin specific fields

	// 			if (Array.isArray(resultConverted) && resultConverted.length > 0) {
	// 				setJobList(resultConverted);
	// 				setLoading(false);
	// 			} else {
	// 				console.log(
	// 					`🚀 ~ file: DataFilter.js ~ line 98 ~ useEffect ~ resultConverted`,
	// 					resultConverted
	// 				);
	// 				subscriber(fetchJobs);
	// 				setLoading(false);
	// 			}

	// 			// arrayOfWords.length > 0
	// 			// 	? Session.set('isSearch', true)
	// 			// 	: Session.set('isSearch', false);
	// 			shouldRenderSet = false; // prevent from re calculating
	// 		}
	// 	}
	// }, [searchWord]);

	// // subscribe on param change
	// useEffect(() => {
	// 	subscriber(); // subscribe to specific data
	// }, [param]);

	// component did mount

	return null;
}

export default DataFilter;
