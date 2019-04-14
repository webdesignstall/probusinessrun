import React, { Component } from 'react';
import WorkData from '../../../common/collections_2';
import { Tracker } from 'meteor/tracker';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Session } from 'meteor/session';
import ListInnerDisplay from './ListInnerDisplay';
import LoadingOverlay from 'react-loading-overlay';
import RingLoader from 'react-spinners/RingLoader';
import { Meteor } from 'meteor/meteor';

export default class List extends TrackerReact(Component) {
    constructor(props) {
        super(props);

        this.state = {
            jobs: [],
            loading: false,
            searchWords: '',
        };

        this.renderList = this.renderList.bind(this);
        this.startStopLoading = this.startStopLoading.bind(this);
    }

    workData(status) {
        return WorkData.find(status !== '' && typeof status === 'string' ? { status: status } : {}).fetch();
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            Meteor.subscribe('workSchema');

            this.setState({
                loading: true,
            });

            let regEx = /^[a-zA-Z0-9 /\b]+$/;

            if (Session.get('searchWords') !== '' || regEx.test(Session.get('searchWords'))) {
                let value = Session.get('searchWords');
                this.setState(
                    {
                        searchWords: value,
                    },
                    err => {
                        if (err) {
                            console.log(err);
                        } else {
                            let arrayOfWords = this.state.searchWords.split(' ');
                            let indexOfEmpty = arrayOfWords.indexOf('');
                            indexOfEmpty > -1 ? arrayOfWords.splice(indexOfEmpty, 1) : null;
                            let result = new Set();
                            let sort = Session.get('sort');

                            arrayOfWords.map(word => {
                                this.workData().map(work => {
                                    work.clientFirstName &&
                                    work.clientFirstName.toLowerCase().search(word.toLowerCase()) > -1
                                        ? result.add(work)
                                        : null;
                                    work.clientLastName &&
                                    work.clientLastName.toLowerCase().search(word.toLowerCase()) > -1
                                        ? result.add(work)
                                        : null;
                                    work.jobNumber && work.jobNumber.toLowerCase().search(word.toLowerCase()) > -1
                                        ? result.add(work)
                                        : null;
                                    work.phoneNumber &&
                                    work.phoneNumber
                                        .toString()
                                        .toLowerCase()
                                        .search(word.toLowerCase()) > -1
                                        ? result.add(work)
                                        : null;
                                });
                            });
                            let resultConverted = Array.from(result);
                            arrayOfWords.length > 0 ? null : (resultConverted = this.workData());

                            resultConverted.length > 0 ? null : (resultConverted = [{}]);
                            arrayOfWords.length > 0 ? Session.set('isSearch', true) : Session.set('isSearch', false);
                            this.setState(
                                {
                                    jobs: resultConverted,
                                },
                                () => {
                                    Session.set('loading', false);
                                },
                            );
                        }
                    },
                );
            } else {
                let result = this.workData(Session.get('status'));

                result.sort((a, b) => {
                    if (Session.get('sort') === 'default') {
                        return (
                            new Date(b.statusChange || '1 november 1989').getTime() -
                            new Date(a.statusChange || '1 november 1989').getTime()
                        );
                    }

                    if (Session.get('sort') === 'az') {
                        return (
                            new Date(a.workDate || '1 november 1989').getTime() -
                            new Date(b.workDate || '1 november 1989').getTime()
                        );
                    }

                    if (Session.get('sort') === 'za') {
                        return (
                            new Date(b.workDate || '1 november 1989').getTime() -
                            new Date(a.workDate || '1 november 1989').getTime()
                        );
                    }

                    if (Session.get('sort') === 'lc') {
                        return (
                            new Date(b.lastChange || '1 november 1989').getTime() -
                            new Date(a.lastChange || '1 november 1989').getTime()
                        );
                    }
                });

                this.setState(
                    {
                        jobs: result,
                    },
                    () => {
                        Session.set('loading', false);
                    },
                );
            }
        });
    }

    startStopLoading() {
        this.setState(prevState => {
            return {
                loading: !prevState.loading,
            };
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    renderList() {
        return this.state.jobs.map(job => {
            return Session.get('is') === job._id ? (
                <div key={job._id + 'followUpList'} className="collection-item">
                    <ListInnerDisplay loading={this.startStopLoading} job={job} />
                </div>
            ) : Session.get('is') === '' ? (
                <div key={job._id + 'followUpList'} className="collection-item">
                    <ListInnerDisplay loading={this.startStopLoading} job={job} />
                </div>
            ) : null;
        });
    }

    render() {
        return <div className="collection">{this.renderList()}</div>;
    }
}
