import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const MainContext = React.createContext();

function MainProvider({ children }) {
	// Context state
	const [searchWord, setSearchWord] = useState('');
	const [status, setStatus] = useState('inProgress');
	const [additionalInfo, setAdditionalInfo] = useState([]);
	const [jobList, setJobList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [displayExtendedJobInformation, setDisplayExtendedInformation] = useState(false);
	const [rate, setRate] = useState(0);
	const [showLimit, setShowLimit] = useState(30);
	const [sorting, setSorting] = useState('default');

	useEffect(() => {
		console.log('setDisplayExtendedInformation changed');
	}, [setDisplayExtendedInformation]);

	// Provide Context to children components
	return (
		<MainContext.Provider
			value={{
				status,
				setStatus,
				searchWord,
				setSearchWord,
				additionalInfo,
				setAdditionalInfo,
				jobList,
				setJobList,
				rate,
				setRate,
				showLimit,
				setShowLimit,
				loading,
				setLoading,
				sorting,
				setSorting,
				displayExtendedJobInformation,
				setDisplayExtendedInformation
			}}
		>
			{children}
		</MainContext.Provider>
	);
}

MainProvider.propTypes = {
	children: PropTypes.any
};

export default MainContext;

export { MainProvider };
