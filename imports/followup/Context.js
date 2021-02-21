// import React from 'react';

// const MainContext = React.createContext({ search: '' });

// export const MainProvider = MainContext.Provider;
// export const MainConsumer = MainContext.Consumer;

// export default MainContext;

import React, { Component } from 'react';

const MainContext = React.createContext();

class MainProvider extends Component {
    // Context state
    state = {
        searchWord: ''
    };

    // Method to update state
    setSearchWord = searchWord => {
        this.setState(prevState => ({ searchWord }));
    };

    render() {
        const { children } = this.props;
        const { searchWord } = this.state;
        const { setSearchWord } = this;

        return (
            <MainContext.Provider
                value={{
                    searchWord,
                    setSearchWord
                }}
            >
                {children}
            </MainContext.Provider>
        );
    }
}

export default MainContext;

export { MainProvider };
