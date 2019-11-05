import React, { Component } from 'react';
import Button from '../../client/templates/quote/Button';
import { Session } from 'meteor/session';

export default class TopMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 'dash'
        };

        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(active) {
        this.setState(
            {
                active
            },
            () => {
                Session.set('bonusMenu', active);
            }
        );
    }

    render() {
        return (
            <div className="row">
                <Button
                    func={() => this.clickHandler('dash')}
                    color={this.state.active === 'dash' ? 'teal white-text' : 'white black-text'}
                    text="Dashboard"
                />
                <Button
                    func={() => this.clickHandler('settings')}
                    color={
                        this.state.active === 'settings' ? 'teal white-text' : 'white black-text'
                    }
                    text="Settings"
                />
            </div>
        );
    }
}
