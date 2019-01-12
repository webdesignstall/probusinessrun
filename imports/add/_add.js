import React, { Component } from 'react';
import Header from './components/header/Header';
import FlipMove from 'react-flip-move';


export default class App extends Component {
    render() {
        return (
            <div className="card__">
                <FlipMove>
                    <Header />
                </FlipMove>
            </div>
        );
    }
}
