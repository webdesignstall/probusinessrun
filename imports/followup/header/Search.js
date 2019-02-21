import React, { Component } from 'react';
import './search.css';
import { Meteor } from 'meteor/meteor';
import WorkData from '../../../common/collections_2';
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
    }

    workData() {
        return WorkData.find().fetch();
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            Meteor.subscribe('workSchema');
            this.setState({
                works: this.workData()
            });
        });
    }

    componentWillUnMount() {
        this.x.stop();
    }

    search(e) {
        let regEx = /^[a-zA-Z0-9 \b]+$/;

        if (e.target.value === '' || regEx.test(e.target.value)) {
            let value = e.target.value;
            this.setState({
                searchWords: value
            }, () => {
                let arrayOfWords = this.state.searchWords.split(' ');
                let indexOfEmpty = arrayOfWords.indexOf('');
                indexOfEmpty > -1 ? arrayOfWords.splice(indexOfEmpty, 1) : null;
                let result = new Set();
                arrayOfWords.map((word) => {
                    this.state.works.map((work) => {
                        (work.clientFirstName.toLowerCase().search(word.toLowerCase())) > -1 ? result.add(work) : null;
                        (work.clientLastName.toLowerCase().search(word.toLowerCase())) > -1 ? result.add(work) : null;
                        (work.jobNumber.toLowerCase().search(word.toLowerCase())) > -1 ? result.add(work) : null;
                    });
                });
                Session.set('searchResult', Array.from(result));
            });
        }
    }

    render() {
        return (
            <div className="sag followup-search">
                <i className="material-icons">
                    search
                </i>
                <input
                    onChange={(e) => this.search(e)}
                    type="text"
                    placeholder="type for searching..."
                    value={this.state.searchWords} />
            </div>
        );
    }
}
