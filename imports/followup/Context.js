import React, { Component } from 'react';

const MainContext = React.createContext();

class MainProvider extends Component {
    // Context state
    state = {
        searchWord: '',
        status: 'inProgress'
    };

    // Method to update searchWord state
    setSearchWord = searchWord => {
        this.setState(prevState => ({ searchWord }));
    };

    // Method to update status state
    setStatus = status => {
        this.setState(prevState => ({ status }));
    };

    render() {
        const { children } = this.props;
        const { searchWord, status } = this.state;
        const { setSearchWord, setStatus } = this;

        return (
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
}

export default MainContext;

export { MainProvider };
