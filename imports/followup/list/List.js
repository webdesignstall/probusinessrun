import React, { Component } from 'react';
import WorkData from '../../../common/collections_2';
import { Tracker } from 'meteor/tracker';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Session } from 'meteor/session';
import ListInnerDisplay from './ListInnerDisplay';
import { Meteor } from 'meteor/meteor';

export default class List extends TrackerReact(Component) {
    constructor(props) {
        super(props);

        this.state = {
            jobs: [],
            loading: false,
            searchWords: '',
            jobsBase: [],
            showLimit: 30
        };

        this.renderList = this.renderList.bind(this);
        this.startStopLoading = this.startStopLoading.bind(this);
        this.workData = this.workData.bind(this);
        this.increaseLimit = this.increaseLimit.bind(this);
    }

    workData(status) {
        let obj = status !== '' && typeof status === 'string' ? { status: status } : {};
        this.setState({
            loading: true
        });
        let res = WorkData.find({ obj });
        this.setState({ jobsBase: res, loading: false });
        // Meteor.call('findJobEx', obj, (err, res) => {
        //     if (err) {
        //         this.setState({ jobsBase: [] });
        //     } else {
        //     }
        // });
    }

    filterJobs(jobs, status) {
        let list = [];

        jobs.map(job => {
            if (job.status === status) list.push(job);
        });

        return list;
    }

    componentDidMount() {
        this.workData();
        this.x = Tracker.autorun(() => {
            // Meteor.subscribe('workSchema');
            this.setState({
                loading: true
            });

            let regEx = /^[a-zA-Z0-9 /\b]+$/;
            let searchWord = Session.get('searchWords');

            if (searchWord || (regEx.test(searchWord) && (Session.get('update') || !Session.get('update')))) {
                let value = searchWord;
                // this.workData();
                this.setState(
                    {
                        searchWords: value
                    },
                    err => {
                        if (err) {
                            console.error(err);
                        } else {
                            let arrayOfWords = this.state.searchWords.split(' ');
                            let indexOfEmpty = arrayOfWords.indexOf('');
                            indexOfEmpty > -1 ? arrayOfWords.splice(indexOfEmpty, 1) : null;
                            let result = new Set();
                            let sort = Session.get('sort');

                            arrayOfWords.map(word => {
                                this.state.jobsBase.map(work => {
                                    work.clientFirstName && work.clientFirstName.toLowerCase().search(word.toLowerCase()) > -1
                                        ? result.add(work)
                                        : null;
                                    work.clientLastName && work.clientLastName.toLowerCase().search(word.toLowerCase()) > -1
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
                            arrayOfWords.length > 0 ? null : (resultConverted = this.state.jobs);
                            resultConverted.length > 0 ? null : (resultConverted = [{}]);
                            arrayOfWords.length > 0 ? Session.set('isSearch', true) : Session.set('isSearch', false);
                            this.setState(
                                {
                                    jobs: resultConverted
                                },
                                () => {
                                    Session.set('loading', false);
                                }
                            );
                        }
                    }
                );
            } else {
                // this.workData(Session.get('status'));
                let status = Session.get('status');
                let result = this.filterJobs(this.state.jobsBase, status);
                console.log(result);
                let sort_ = Session.get('sort');

                result.sort((a, b) => {
                    if (sort_ === 'default') {
                        return (
                            new Date(b.statusChange || '1 november 1989').getTime() -
                            new Date(a.statusChange || '1 november 1989').getTime()
                        );
                    }

                    if (sort_ === 'az') {
                        return (
                            new Date(a.workDate || '1 november 1989').getTime() -
                            new Date(b.workDate || '1 november 1989').getTime()
                        );
                    }

                    if (sort_ === 'za') {
                        return (
                            new Date(b.workDate || '1 november 1989').getTime() -
                            new Date(a.workDate || '1 november 1989').getTime()
                        );
                    }

                    if (sort_ === 'lc') {
                        return (
                            new Date(b.lastChange || '1 november 1989').getTime() -
                            new Date(a.lastChange || '1 november 1989').getTime()
                        );
                    }
                });

                this.setState(
                    {
                        jobs: result
                    },
                    () => {
                        Session.set('loading', false);
                    }
                );
            }
        });
    }

    startStopLoading() {
        this.setState(prevState => {
            return {
                loading: !prevState.loading
            };
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    renderList() {
        let jobs = this.state.jobs.length > 0 ? this.state.jobs : this.filterJobs(this.state.jobsBase, Session.get('status'));
        let newJobs = [];

        if (jobs.length > this.state.showLimit) {
            newJobs = jobs.slice(0, this.state.showLimit + 1);
        } else {
            newJobs = jobs;
        }

        return newJobs.map(job => {
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
    increaseLimit() {
        this.setState(prevState => {
            let limit = prevState.showLimit + 10;

            return {
                showLimit: limit
            };
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="collection">{this.renderList()}</div>
                <div className={this.state.jobs.length > 30 ? 'showMore' : 'hide'} onClick={this.increaseLimit}>
                    show more
                </div>
            </React.Fragment>
        );
    }
}
