import React, { Component } from 'react';
import './search.css';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

export default class Search extends TrackerReact(Component) {
    constructor(props) {
        super(props);

        this.state = {
            searchWords: '',
            result: new Set(),
            works: []
        };

        this.search = this.search.bind(this);
        this.search_ = this.search_.bind(this);
        this.interval = this.interval.bind(this);
    }

    componentDidMount() {
        this.timeOut = null;
        this.x = Tracker.autorun(() => {
            this.setState({
                searchWords: Session.get('searchWords')
            });
        });
    }

    componentWillUnMount() {
        this.x.stop();
    }

    search(e) {
        Session.set('loading', false);
        let value = e.target.value;
        this.setState({
            searchWords: value
        });
    }

    search_() {
        Session.set('loading', true);
        Session.set('searchWords', this.state.searchWords);
    }

    interval() {
        clearTimeout(this.timeOut);
        this.timeOut = setTimeout(this.search_, 500);
    }

    render() {
        return (
            <div className="sag followup-search">
                <i className="material-icons">search</i>
                <input
                    onChange={e => this.search(e)}
                    onKeyUp={this.interval}
                    type="text"
                    placeholder="type for searching..."
                    value={this.state.searchWords}
                />
            </div>
        );
    }
}
