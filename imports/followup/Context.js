import React, { useState } from 'react';

const MainContext = React.createContext();

function MainProvider({ children }) {
	// Context state
	const [searchWord, setSearchWord] = useState('');
	const [status, setStatus] = useState('inProgress');
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
				setStatus
			}}
		>
			{children}
		</MainContext.Provider>
	);
}

export default MainContext;

export { MainProvider };
