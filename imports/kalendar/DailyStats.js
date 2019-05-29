import React, { Component } from 'react';
import WorkData from '../../common/collections_2';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import MorningJobs from './MorningJobs';
import AfternoonJobs from './AfternoonJobs';

export default class DailyStats extends TrackerReact(Component) {
    constructor(props) {
        super(props);

        this.state = {
            totalDaily: 0
        };

        this.totalJobs = 0;
    }

    componentDidMount() {
        this.jobsAfterNoon = 0;
        this.jobsMorning = 0;
    }

    // workDataList() {
    //     // console.log('query');
    //     return WorkData.find({
    //         workDate: this.props.date,
    //         status: 'won'
    //     }).fetch();
    // }

    morningJobs() {
        let jobs = 0;
        let employees = 0;

        this.props.workDataList &&
            this.props.workDataList.map(work => {
                Date.parse('1 Aug 2018 ' + work.workMustBeginTime[0]) <
                Date.parse('1 Aug 2018 01:00 pm')
                    ? ((employees += work.numberOfWorkers), jobs++)
                    : null;
            });

        this.jobsMorning = jobs;

        return {
            jobs,
            employees
        };
    }

    afterNoonJobs() {
        let jobs = 0;
        let employees = 0;

        this.props.workDataList &&
            this.props.workDataList.map(work => {
                Date.parse('1 Aug 2018 ' + work.workMustBeginTime[0]) >
                Date.parse('1 Aug 2018 12:45 pm')
                    ? ((employees += work.numberOfWorkers), jobs++)
                    : null;
            });

        this.jobsAfterNoon = jobs;

        return {
            jobs,
            employees
        };
    }

    render() {
        return (
            <div className="dailystat--main">
                <MorningJobs
                    jobsNumber={this.morningJobs().jobs}
                    employeeNumber={this.morningJobs().employees}
                />
                <AfternoonJobs
                    jobsNumber={this.afterNoonJobs().jobs}
                    employeeNumber={this.afterNoonJobs().employees}
                />
                <span className="free">
                    {this.jobsMorning + this.jobsAfterNoon}
                </span>
            </div>
        );
    }
}
