import React, { Component } from 'react';
import { Session } from 'meteor/session';
import Button from '../quote/Button';
import { Tracker } from 'meteor/tracker';

import NewCardHolderListRender from './NewCardHolderListRender';

export default class NewCardHolders extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newCardHolderList: false
        };

        this.closeNewCardHolder = this.closeNewCardHolder.bind(this);
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            let newCardHolder = Session.get('newCardHolderList');

            this.setState({
                newCardHolderList: newCardHolder
            });
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    closeNewCardHolder() {
        let value = this.state.newCardHolderList;
        value = !value;
        Session.set('newCardHolderList', value);
    }

    render() {
        return (
            <div className="newCardHolderComponent row">
                <div className="row newCardHolderComponent_header_main">
                    <div className="col s10 l10 m10 newCardHolders_header">New Card Holders List</div>
                    <div className="col s2 l2 m2">
                        <Button func={this.closeNewCardHolder} text="close x" color="red" />
                    </div>
                    <div className="clear"></div>
                    <hr />
                </div>
                <NewCardHolderListRender />
            </div>
        );
    }
}
