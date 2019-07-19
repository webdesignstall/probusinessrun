import React, { Component } from 'react';
import AdditionalInfoTemplates from './AdditionalInfoTemplates';
import AdditionalInfoValue from './AdditionalInfoValue';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import WorkData from '../../../common/collections_2';

export default class AdditionalInfo extends Component {
    componentDidMount() {
        this.x = Tracker.autorun(() => {
            let reset = Session.get('reset');

            if (reset) {
                Session.set('additionalInfo', []);
            }

            if (Session.get('is') !== '') {
                let is = WorkData.findOne({ _id: Session.get('is') }).additionalInfo;

                is && is !== '' && Array.isArray(is) && Session.set('additionalInfo', is);
            }
        });
    }

    componentWillUnmount() {
        this.x.stop();
        Session.set('additionalInfo', []);
    }

    render() {
        return (
            <div className="row additional_info">
                <div className="additional_info_header">Additional Info</div>
                <AdditionalInfoValue />
                <AdditionalInfoTemplates />
            </div>
        );
    }
}
