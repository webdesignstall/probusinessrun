import React, { Component } from 'react';

import CustomerContactInfo from './CustomerContactInfo';
import AdditionalContact from './AdditionalContact';
import WorkDate from './WorkDate';
import ArrivalWindow from './ArrivalWindow';
import TakenBy from './TakenBy';
import SourceOfLeads from './SourceOfLeads';
import Addresses from './Addresses';

export default class QuoteMainPage extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <CustomerContactInfo />
                </div>
                <div className="row">
                    <AdditionalContact />
                </div>
                <div className="row">
                    <WorkDate />
                    <ArrivalWindow />
                    <TakenBy />
                    <SourceOfLeads />
                </div>
                <div className="row">
                    <Addresses />
                </div>
            </div>
        );
    }
}
