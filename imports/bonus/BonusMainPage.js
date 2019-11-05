import React, { Component } from 'react';
import TopMenu from './TopMenu';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import './bonus.styl';
import BonusDash from './BonusDash';
import BonusSettings_ from './BonusSettings';

export default class BonusMainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMenu: 'dash'
        };
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            let selectedMenu = Session.get('bonusMenu');

            this.setState({
                selectedMenu
            });
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    render() {
        return (
            <React.Fragment>
                <TopMenu />
                {this.state.selectedMenu === 'dash' && <BonusDash />}
                {this.state.selectedMenu === 'settings' && <BonusSettings_ />}
            </React.Fragment>
        );
    }
}
