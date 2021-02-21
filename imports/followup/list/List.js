import React, { Component } from 'react';
import WorkData from '../../../common/collections_2';
import { Tracker } from 'meteor/tracker';
// import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Session } from 'meteor/session';
import ListInnerDisplay from './ListInnerDisplay';
import { Meteor } from 'meteor/meteor';

import MainContext from '../Context';

export default class List extends Component {
    static contextType = MainContext;

    constructor(props) {
        super(props);

        this.state = {
            jobs: [],
            loading: false,
            searchWord: '',
            searchWords: '',
            jobsBase: [],
            showLimit: 30
        };

        this.renderList = this.renderList.bind(this);
        this.startStopLoading = this.startStopLoading.bind(this);
        this.workData = this.workData.bind(this);
        this.increaseLimit = this.increaseLimit.bind(this);
        this.buildComponent = this.buildComponent.bind(this);
    }

    workData(status, rate) {
        let obj = status !== '' && typeof status === 'string' ? { status } : {};
        let jobs = WorkData.find(obj).fetch();

        if (rate && rate > 1) {
            obj = { customerRate: Number(rate) };
        }

        this.setState({
            loading: true
        });

        jobs.sort((a, b) => {
            return (
                new Date(b.statusChange || '1 november 1989').getTime() - new Date(a.statusChange || '1 november 1989').getTime()
            );
        });

        this.setState({ jobs, jobsBase: jobs, loading: false }, () => Session.set('isSearch', false));
    }

    componentDidUpdate() {
        let { searchWord, setSearchWord } = this.context;

        searchWord !== this.state.searchWord &&
            this.setState(
                {
                    searchWord
                },
                () => {
                    this.buildComponent();
                }
            );
    }

    buildComponent() {
        let { searchWord, setSearchWord } = this.context;
        let value = this.context;
        let status = Session.get('status');
        let rate = Session.get('customerRate_');
        this.workData(status, rate);
        this.setState({
            loading: true
        });
        console.log('List Updated');

        let regEx = /^[a-zA-Z0-9 \b]+$/;
        // let searchWord = Session.get('searchWords');
        // let searchWord = this.searchWord;
        searchWord.length > 0 ? '' : (Session.set('loading', false), Session.set('searching', false));

        if (searchWord || (regEx.test(searchWord) && (Session.get('update') || !Session.get('update')))) {
            // this.workData();
            this.setState(
                {
                    searchWords: searchWord
                },
                err => {
                    if (err) {
                        console.error(err);
                    } else {
                        // convert words into array
                        let arrayOfWords = this.state.searchWords.split(' ');
                        let indexOfEmpty = arrayOfWords.indexOf('');
                        indexOfEmpty > -1 ? arrayOfWords.splice(indexOfEmpty, 1) : null;
                        let indexOfSpace = arrayOfWords.indexOf(' ');
                        indexOfSpace > -1 ? arrayOfWords.splice(indexOfSpace, 1) : null;
                        let result = new Set();
                        let sort = Session.get('sort');

                        Meteor.subscribe('searchFollowUp', arrayOfWords);

                        let reg = arrayOfWords.map(function(word) {
                            word = word.replace('/', '');
                            word = word.replace('(', '');
                            word = word.replace(')', '');
                            word = word.replace('\\', '');
                            word = word.replace(':', '');
                            word = word.replace(';', '');
                            word = word.replace('`', '');
                            word = word.replace('[', '');
                            word = word.replace('.', '');
                            word = word.replace(',', '');
                            word = word.replace('"', '');
                            word = word.replace(']', '');
                            word = word.replace('?', '');
                            return new RegExp(word, 'gi');
                        });
                        console.log('TCL: List -> componentDidMount -> reg', reg);

                        let resultConverted = WorkData.find({
                            $or: [
                                {
                                    clientFirstName: {
                                        $in: reg
                                    }
                                },
                                {
                                    clientLastName: {
                                        $in: reg
                                    }
                                },
                                {
                                    jobNumber: {
                                        $in: reg
                                    }
                                },
                                {
                                    phoneNumber: {
                                        $in: reg
                                    }
                                }
                            ]
                        }).fetch();
                        arrayOfWords.length > 0 ? null : (resultConverted = this.state.jobs);
                        resultConverted.length > 0 ? null : (resultConverted = [{}]);
                        arrayOfWords.length > 0 ? Session.set('isSearch', true) : Session.set('isSearch', false);
                        this.setState(
                            {
                                jobs: resultConverted
                            },
                            () => {
                                Session.set('loading', false);
                                Session.set('isSearch', false);
                            }
                        );
                    }
                }
            );
        } else {
            let sort_ = Session.get('sort');
            let baza = this.state.jobsBase;

            baza.sort((a, b) => {
                if (sort_ === 'default') {
                    return (
                        new Date(b.statusChange || '1 november 1989').getTime() -
                        new Date(a.statusChange || '1 november 1989').getTime()
                    );
                }

                if (sort_ === 'az') {
                    return (
                        new Date(a.workDate || '1 november 1989').getTime() - new Date(b.workDate || '1 november 1989').getTime()
                    );
                }

                if (sort_ === 'za') {
                    return (
                        new Date(b.workDate || '1 november 1989').getTime() - new Date(a.workDate || '1 november 1989').getTime()
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
                prevState => {
                    return { jobs: prevState.jobsBase };
                },
                () => {
                    Session.set('loading', false);
                    Session.set('isSearch', false);
                }
            );
        }
    }

    componentDidMount() {
        this.x = Tracker.autorun(
            () => {
                this.buildComponent();
            },
            error => {
                console.error(error);
            }
        );
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
        let jobs = this.state.jobs;
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
        let { searchWord, setSearchWord } = this.context;

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
