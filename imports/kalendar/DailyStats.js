import React, { Component } from 'react';
import WorkData from '../../common/collections_2';
import { Meteor } from 'meteor/meteor';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import MorningJobs from './MorningJobs';
import AfternoonJobs from './AfternoonJobs';

export default class DailyStats extends TrackerReact(Component) {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    workDataList() {
        return WorkData.find({ 'workDate': this.props.date, 'quote': false }).fetch();
    }

    morningJobs() {
        let jobs = 0;
        let employees = 0;

        this.workDataList().map((work) => {
            Date.parse('1 Aug 2018 ' + work.workMustBeginTime[0]) < Date.parse('1 Aug 2018 01:00 pm')
                ? (
                    employees += work.numberOfWorkers,
                    jobs++
                )
                : null;

        });

        return {
            jobs,
            employees
        };
    }

    afterNoonJobs() {
        let jobs = 0;
        let employees = 0;

        this.workDataList().map((work) => {
            Date.parse('1 Aug 2018 ' + work.workMustBeginTime[0]) > Date.parse('1 Aug 2018 12:45 pm')
                ? (
                    employees += work.numberOfWorkers,
                    jobs++
                )
                : null;
        });

        return {
            jobs,
            employees
        };
    }

    render() {
        return (
            <div className="dailystat--main" >
                <MorningJobs jobsNumber={this.morningJobs().jobs} employeeNumber={this.morningJobs().employees} />
                <AfternoonJobs jobsNumber={this.afterNoonJobs().jobs} employeeNumber={this.afterNoonJobs().employees} />
            </div>
        );
    }
}
