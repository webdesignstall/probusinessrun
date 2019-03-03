import React, { Component } from 'react';
import Header from './header/Header';
import List from './list/List';
import Reactotron from '../helpers/ReactotronConfig';

export default class FollowUpMain extends Component {
    render() {
        return (
            <div className="followup-header">
                <Header />
                <List />
            </div>
        );
    }
}
