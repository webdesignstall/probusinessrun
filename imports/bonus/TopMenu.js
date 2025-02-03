import React, { Component } from 'react';
import Button from '../../client/templates/quote/Button';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

export default class TopMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 'dash',
            lastMonth: false
        };

        this.clickHandler = this.clickHandler.bind(this);
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            let lastMonth = Session.get('lastMont');

            this.setState({
                lastMonth
            });
        });
    }

    componentWillUnmount() {
        this.x.stop();
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
                {this.state.active === 'dash' ? (
                    <Button
                        func={() => {
                            let isLastMont = Session.get('lastMont');
                            Session.set('lastMont', !isLastMont);
                        }}
                        text={this.state.lastMonth ? 'Current Month' : 'Last Month'}
                    />
                ) : (
                    ''
                )}
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
