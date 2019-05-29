import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';
import React, { Component } from 'react';
import WorkData from '../../../common/collections_2';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class RenderEmployees extends TrackerReact(Component) {
    constructor(props) {
        super(props);
        this.state = {
            isciler: [],
            secilmisIsciler: []
        };

        this.renderWorkers = this.renderWorkers.bind(this);
        this.check = this.check.bind(this);
        this.employeeClick = this.employeeClick.bind(this);
    }

    check(id) {
        let arr = Session.get('secilmisIsciler');
        this.vez = false;
        arr.map(yoxIs => {
            if (yoxIs.id === id) {
                this.vez = true;
            }
        });

        return this.vez;
    }

    componentWillMount() {
        this.x = Tracker.autorun(() => {
            // Meteor.subscribe('workSchema');
            // Meteor.subscribe('tabletData');
            // Meteor.subscribe('usersData');
            const isciler = Meteor.users
                .find({ 'profile.rank': 'mover' })
                .fetch();
            const is = WorkData.findOne(Session.get('is'));
            if (
                is.workers !== undefined ||
                is.workers !== null ||
                is.workers !== '' ||
                is.workers !== []
            ) {
                Session.set('secilmisIsciler', is.workers);
            }

            this.setState({
                isciler
            });
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    workData() {
        return WorkData.find({ _id: Session.get('is') }).fetch();
    }

    employeeClick(id) {
        let arr = Session.get('secilmisIsciler');
        let maxWorkers = this.workData()[0].numberOfWorkers;
        let isId = arr.findIndex(function(element) {
            return element.id === id;
        });

        //if there is employee with this id
        if (isId > -1) {
            arr.splice(isId, 1);
            document.getElementById(id).classList.remove('green');
            document.getElementById(id).classList.add('iscilerin-adlari');
        } else {
            if (arr.length < maxWorkers) {
                document
                    .getElementById(id)
                    .classList.remove('iscilerin-adlari');
                document.getElementById(id).classList.add('green');
                arr.push({ id: id });
            }
        }

        Session.set('secilmisIsciler', arr);
    }

    renderWorkers() {
        return this.state.isciler.map(isci => {
            return (
                <a
                    id={isci._id}
                    key={isci._id}
                    className={this.check(isci._id) ? 'green' : ''}
                    onClick={() => this.employeeClick(isci._id)}>
                    {isci.profile.firstName} {isci.profile.lastName}
                </a>
            );
        });
    }

    render() {
        return <div>{this.renderWorkers()}</div>;
    }
}
