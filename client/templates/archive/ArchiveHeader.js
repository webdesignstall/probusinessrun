import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

// imports components
import ArchiveSearch from './ArchiveSearch';
import Button from '../quote/Button';
import NewCardHolders from './NewCardHolders';

export default class ArchiveHeader extends TrackerReact(Component) {
    constructor(props) {
        super(props);

        this.state = {
            cardHolders: false
        };

        this.toggleNewCardHolder = this.toggleNewCardHolder.bind(this);
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            let cardHolders = Session.get('newCardHolderList');

            this.setState({
                cardHolders
            });
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    toggleNewCardHolder() {
        let cardHoldersDisplay = Session.get('newCardHolderList');

        Session.set('newCardHolderList', !cardHoldersDisplay);
    }

    render() {
        return (
            <div className="archive-header row ">
                <div className="col s3 m3 l3">
                    <Button func={this.toggleNewCardHolder} text="New Card Holders" />
                    {this.state.cardHolders ? <NewCardHolders /> : ''}
                </div>
                <div className="col s5 m5 l5">
                    <ArchiveSearch updateJobLit={this.props.updateJobLit} />
                    {/* display range component */}
                </div>
            </div>
        );
    }
}
