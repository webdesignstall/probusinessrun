import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import WorkData from '../../../common/collections_2';

export default class NewAppointment extends Component {
    createNewAppointment() {
        let job = WorkData.findOne({ _id: Session.get('is') });

        job.jobNumber = Math.random()
            .toString(36)
            .substr(2, 5);
        job.quoteDate = new Date();
        job.status = 'inProgress';
        delete job._id;

        Meteor.call('quotaniBazayaElaveEt', job, (err, doc) => {
            if (err) {
                swal({
                    title: 'Error! Can\'t create new appointment',
                    text: err.reason,
                    icon: 'error',
                    button: 'OK',
                });
            } else {
                swal({
                    title: 'Success!',
                    text: 'New appointment created successfully. Please edit and save!',
                    icon: 'success',
                    button: 'OK',
                });
                Session.set('is', doc);
                document.getElementById('jobStatus_followup').value = 'inProgress';
            }
        });
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
                    }}>
                    New Appointment
                </a>
            </React.Fragment>
        );
    }
}
