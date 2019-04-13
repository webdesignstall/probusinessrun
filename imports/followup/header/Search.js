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
            works: [],
        };

        this.search = this.search.bind(this);
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            this.setState({
                searchWords: Session.get('searchWords'),
            });
        });
    }

    componentWillUnMount() {
        this.x.stop();
    }

    search(e) {
        Session.set('loading', true);
        let regEx = /[^? / : ; #,]/;
        let value = e.target.value;

        regEx.test(value)
            ? this.setState(
                {
                    searchWords: value,
                },
                () => {
                    Session.set('searchWords', value);
                },
            )
            : Session.set('loading', false);
    }

    render() {
        return (
            <div className="sag followup-search">
                <i className="material-icons">search</i>
                <input
                    onChange={e => this.search(e)}
                    type="text"
                    placeholder="type for searching..."
                    value={this.state.searchWords}
                />
            </div>
        );
    }
}
