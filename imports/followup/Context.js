import React, { useState } from 'react';
import PropTypes from 'prop-types';

const MainContext = React.createContext();

function MainProvider({ children }) {
	// Context state
	const [searchWord, setSearchWord] = useState('');
	const [status, setStatus] = useState('inProgress');
	const [additionalInfo, setAdditionalInfo] = useState('');
	// state = {
	//     searchWord: '',
	//     status: 'inProgress'
	// };

	// Method to update searchWord state
	// const setSearchWord = searchWord => {
	//     this.setState(prevState => ({ searchWord }));
	// };

	// // Method to update status state
	// const setStatus = status => {
	//     this.setState(prevState => ({ status }));
	// };

	return (
		// const { children } = this.props;
		// const { searchWord, status } = this.state;
		// const { setSearchWord, setStatus } = this;
		<MainContext.Provider
			value={{
				searchWord,
				status,
				setSearchWord,
				setStatus,
				additionalInfo,
				setAdditionalInfo
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
