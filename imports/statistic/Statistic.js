import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';
import LoadingOverlay from 'react-loading-overlay';
import BounceLoader from 'react-spinners/BounceLoader';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';

/*global moment*/

import './chart.styl';
import ChartComp from './ChartComp';
import ChartMenu from './ChartMenu';
import WorkData from '../../common/collections_2';
import companies from '../helpers/companyInfos.json';

companies = companies.companies;

export default class Statistic extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            locations: {
                labels: [],
                data: [],
                colors: []
            },
            employees: {
                labels: [],
                data: [],
                colors: []
            },
            status: {
                labels: ['Won', 'In Progress', 'Lost', 'Cancelled'],
                data: [],
                colors: []
            },
            date: {
                labels: [],
                data: [],
                colors: []
            },
            employeesList: [],
            provided: {
                startDate: new Date(),
                endDate: new Date(),
                company: 'all',
                status: 'won',
                takenBy: 'all'
            }
        };

        this.setData = this.setData.bind(this);
        this.dateRangeJobs = this.dateRangeJobs.bind(this);
    }

    UNSAFE_componentWillMount() {
        Session.set('loading', true);
    }

    componentDidMount() {
        Meteor.call('officeEmployees', (error, result) => {
            if (error) {
                Session.set('loading', false);
                console.log(error);
                swal({
                    title: 'Error!',
                    text: 'Can\'t get data from server. Please resfresh the page or contact system administration',
                    icon: 'error',
                    button: 'OK'
                });
            } else {
                Session.set('employeesList', result);
                Session.set('loading', false);
            }
        });
        this.x = Tracker.autorun(() => {
            let startDate = Session.get('startDate');
            let endDate = Session.get('endDate');
            let company = Session.get('company');
            let status = Session.get('status');
            let takenBy = Session.get('takenBy');
            let employeesList = Session.get('employeesList');
            let loading = Session.get('loading');

            this.setState(
                prevState => {
                    let provided = prevState.provided;
                    provided.startDate = startDate;
                    provided.endDate = endDate;
                    provided.company = company;
                    provided.status = status;
                    provided.takenBy = takenBy;

                    return { employeesList, provided, loading };
                },
                () => {
                    this.calculateData();
                }
            );
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    setData(jobs) {
        let locations = { labels: [], data: [], colors: [] };
        let employees = { labels: [], data: [], colors: [] };
        let status = { labels: [], data: [], colors: [] };

        function randomColor() {
            return '#' + (0x1000000 + Math.random() * 0x999fff).toString(16).substr(1, 6);
        }

        if (Session.get('company') === 'all') {
            companies.map((company, index) => {
                locations.labels.push(company.name);
                locations.data.push(0);
                locations.colors.push(randomColor());
                jobs.map(job => {
                    if (job.companyInfo.name === company.name) {
                        locations.data[index] = locations.data[index] + 1;
                    }
                    if (Session.get('takenBy') === 'all') {
                        job.takenBy;
                    }
                });
            });
        } else {
            locations.labels = [Session.get('company')];
            locations.data.push(jobs.length);
            locations.colors.push(randomColor());
        }

        if (this.state.provided.takenBy === 'all') {
            this.state.employeesList &&
                this.state.employeesList.map((employee, index) => {
                    let empIndex = index;
                    employees.labels.push(employee.profile.firstName + ' ' + employee.profile.lastName);
                    employees.data.push(0);
                    employees.colors.push(randomColor());

                    jobs.map(job => {
                        if (job.takenBy === employee._id) {
                            employees.data[empIndex]++;
                        }
                    });
                });
        } else {
            this.state.employeesList &&
                this.state.employeesList.map(employee => {
                    if (employee._id === this.state.provided.takenBy) {
                        employees.labels.push(employee.profile.firstName + ' ' + employee.profile.lastName);
                        employees.data.push(0);
                        employees.colors.push(randomColor());

                        jobs.map(job => {
                            if (job.takenBy === employee._id) {
                                employees.data[0]++;
                            }
                        });
                    }
                });
        }

        if (this.state.provided.status === 'all') {
            let listOfStatus = ['Won', 'In Progress', 'Lost', 'Cancelled'];

            listOfStatus.map(status_ => {
                status.labels.push(status_);
                status.data.push(0);
                status.colors.push(randomColor());
            });

            jobs.map(job => {
                if (job.status === 'won') {
                    status.data[0]++;
                } else if (job.status === 'inProgress') {
                    status.data[1]++;
                } else if (job.status === 'lost') {
                    status.data[2]++;
                } else if (job.status === 'cancelled') {
                    status.data[3]++;
                }
            });
        } else {
            status.labels.push(this.state.provided.status);
            status.colors.push(randomColor());
            status.data.push(0);
            jobs.map(job => {
                if (job.status === this.state.provided.status) {
                    status.data[0]++;
                }
            });
        }

        this.dateRangeJobs(jobs, randomColor);

        this.setState({
            locations,
            employees,
            status
        });
    }

    dateRangeJobs(jobs, randomColor) {
        let date = { labels: [], data: [], colors: [] };
        const { startDate, endDate } = this.state.provided;
        let dateStart = moment(startDate);
        let dateEnd = moment(endDate);
        let timeValues = [];

        while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
            timeValues.push(dateStart.format('MM/DD/YYYY'));
            dateStart.add(1, 'month');
        }

        timeValues.map((dateUnformatted, index) => {
            let index_ = index;
            date.labels.push(moment(dateUnformatted).format('MMMM YYYY'));
            date.data.push(0);
            date.colors.push(randomColor());
            let month = moment(dateUnformatted).format('MM');
            let year = moment(dateUnformatted).format('YYYY');
            let monthBegin = `${month}/01/${year}`;
            let nextMonth = moment(dateUnformatted)
                .add(1, 'M')
                .format('MM');
            let monthEnd = `${nextMonth}/01/${year}`;

            jobs.map(job => {
                if (
                    new Date(job.workDate).getTime() < new Date(monthEnd).getTime() &&
                    new Date(job.workDate).getTime() >= new Date(monthBegin).getTime()
                ) {
                    date.data[index_]++;
                }
            });
        });

        this.setState({ date });
    }

    calculateData() {
        let state_ = this.state.provided;
        let obj = {};

        for (let key in state_) {
            if (state_[key] !== undefined && state_[key] !== 'all' && key !== 'startDate' && key !== 'endDate') {
                if (key === 'company') {
                    obj['companyInfo.name'] = state_['company'];
                } else {
                    obj[key] = state_[key];
                }
            }
        }

        let jobs = WorkData.find(obj).fetch();

        let filteredJobs = jobs.filter(job => {
            let date = job.workDate;

            if (
                new Date(date).getTime() >= new Date(this.state.provided.startDate).getTime() &&
                new Date(date).getTime() <= new Date(this.state.provided.endDate).getTime()
            ) {
                return job;
            }
        });

        this.setData(filteredJobs);
    }

    render() {
        const { locations, employees, status, date } = this.state;

        return (
            <LoadingOverlay
                text="Loading..."
                className="loader"
                active={this.state.loading}
                spinner={<BounceLoader color={'#6DD4B8'} />}>
                <div className="statistic">
                    <div className="col s12 m12 l12">
                        <ChartMenu />
                    </div>
                    <div className="row">
                        <div className="col s12 m6 l6 center-align">
                            <ChartComp
                                title="Locations"
                                labels={locations.labels}
                                colors={locations.colors}
                                data={locations.data}
                                label="Locations"
                            />
                        </div>
                        <div className="col s12 m6 l6 center-align">
                            <ChartComp
                                title="Employees"
                                labels={employees.labels}
                                colors={employees.colors}
                                data={employees.data}
                                label="Locations"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12 m6 l6 center-align">
                            <ChartComp
                                title="Status"
                                labels={status.labels}
                                colors={status.colors}
                                data={status.data}
                                label="Locations"
                            />
                        </div>
                        <div className="col s12 m6 l6 center-align">
                            <ChartComp
                                title="Date"
                                labels={date.labels}
                                colors={date.colors}
                                data={date.data}
                                label="Locations"
                            />
                        </div>
                    </div>
                </div>
            </LoadingOverlay>
        );
    }
}

Template.statistic.onRendered(() => {
    Session.set('status', 'won');
    let newDate = moment(new Date()).startOf('month')._d;
    Session.set('startDate', moment(newDate).format('MM/DD/YYYY'));
    Session.set('endDate', moment(new Date()).format('MM/DD/YYYY'));
    Session.set('company', 'all');
    Session.set('takenBy', 'all');
    ReactDOM.render(<Statistic />, document.getElementById('statistic_app'));
});

Template.statistic.onDestroyed(() => {
    Session.set('status', 'inProgress');
    ReactDOM.unmountComponentAtNode(document.getElementById('statistic_app'));
});
