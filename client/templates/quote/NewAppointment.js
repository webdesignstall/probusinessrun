import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import WorkData from '../../../common/collections_2';

/*global swal*/

export default class NewAppointment extends Component {
    createNewAppointment() {
        function jobNumber_() {
            let jobNumber = Math.round(Math.random() * (999999 - 1) + 1);
            jobNumber = jobNumber.toString();
            let howManyZero = 6 - jobNumber.length;
            if (howManyZero > 0) {
                for (let i = 0; i < howManyZero; i++) {
                    jobNumber = '0' + jobNumber;
                }
            }
            let result = WorkData.find({ jobNumber }).fetch();
            result && result.length > 0 ? jobNumber_() : null;
            return jobNumber;
        }

        if (confirm('Are you sure to create new Appointment')) {
            let job = WorkData.findOne({ _id: Session.get('is') });

            job.jobNumber = jobNumber_();
            job.quoteDate = new Date();
            job.status = 'inProgress';
            delete job._id;

            Meteor.call('quotaniBazayaElaveEt', job, (err, doc) => {
                if (err) {
                    swal({
                        title: 'Error! Can\'t create new appointment',
                        text: err.reason,
                        icon: 'error',
                        button: 'OK'
                    });
                } else {
                    swal({
                        title: 'Success!',
                        text:
                            'New appointment created successfully. Please edit and save!',
                        icon: 'success',
                        button: 'OK'
                    });
                    Session.set('is', doc);
                    Session.set('ExtendedJobInformation', doc);
                    Session.set('update', !Session.get('update'));
                    Session.set('loading', false);
                    Session.set('status', 'inProgress');
                    document.getElementById('jobStatus_followup') &&
                        (document.getElementById('jobStatus_followup').value =
                            'inProgress');
                }
            });
        }
    }

    render() {
        return (
            <React.Fragment>
                <a
                    onClick={this.createNewAppointment}
                    id="new_appointment"
                    className="waves-effect waves-light btn"
                    style={{
                        backgroundColor: '#2ecc71',
                        color: 'black',
                        fontWeight: '500'
                    }}>
                    <i
                        className="material-icons left"
                        style={{ color: 'white' }}>
                        note_add
                    </i>
                    New Appointment
                </a>
            </React.Fragment>
        );
    }
}
