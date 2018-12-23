import React from 'react';
import { Session } from 'meteor/session';

export default class CompanySelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            companies: [
                {
                    name: 'Cheap Movers Los Angeles',
                    email: 'info@cheapmoverslosangeles.com',
                    smtp: 'mail.cheapmoverslosangeles.com',
                    password: 'FXLAC3267724!',
                    key: 101
                },
                {
                    name: 'Moving Company Los Angeles',
                    email: 'info@movingcompanylosangeles.com',
                    smtp: 'mail.movingcompanylosangeles.com',
                    password: 'FXLAC3267724!',
                    key: 102
                },
                {
                    name: 'Burbank Moving and Storage Company',
                    email: 'info@burbankmovingandstoragecompany.com',
                    smtp: 'mail.burbankmovingandstoragecompany.com',
                    password: 'FXLAC3267724!',
                    key: 103
                },
                {
                    name: 'Orange County Moving Company',
                    email: 'info@ocmovingandstorage.com',
                    smtp: 'mail.ocmovingandstorage.com',
                    password: 'FXLAC3267724!',
                    key: 104
                },
                {
                    name: 'Cheap Movers Irvine',
                    email: 'info@cheapmoversinirvine.com',
                    smtp: 'mail.cheapmoversinirvine.com',
                    password: 'FXLAC3267724!',
                    key: 105
                },
                {
                    name: 'Cheap Movers Costa Mesa',
                    email: 'info@cheapmoverscostamesa.com',
                    smtp: 'mail.cheapmoverscostamesa.com',
                    password: 'FXLAC3267724!',
                    key: 106
                },
                {
                    name: 'Cheap Movers Anaheim',
                    email: 'info@cheapmoversanaheim.com',
                    smtp: 'mail.cheapmoversanaheim.com',
                    password: 'FXLAC3267724',
                    key: 107
                },
                {
                    name: 'Best Cheap Movers OC',
                    email: 'info@bestcheapmoversorangecounty.com',
                    smtp: 'mail.bestcheapmoversorangecounty.com',
                    password: 'FXLAC3267724!',
                    key: 108
                },
                {
                    name: 'Cheap Movers Riverside',
                    email: 'info@cheapmoversriverside.com',
                    smtp: 'mail.cheapmoversriverside.com',
                    password: 'FXLAC3267724!',
                    key: 109
                },
                {
                    name: 'House Movers Riverside',
                    email: 'info@housemoversriverside.com',
                    smtp: 'mail.housemoversriverside.com',
                    password: 'FXLAC3267724!',
                    key: 110
                },
                {
                    name: 'Sprint Mover',
                    email: 'info@sprintmover.com',
                    smtp: 'mail.sprintmover.com',
                    password: 'FXLAC3267724!',
                    key: 111
                },
                {
                    name: 'Rapid Office Movers',
                    email: 'info@rapidofficemovers.com',
                    smtp: 'mail.rapidofficemovers.com',
                    password: 'FXLAC3267724!',
                    key: 112
                }
            ]
        };

        this.renderCompanies = this.renderCompanies.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    renderCompanies() {
        return (this.state.companies.map((company) => {
            return (<option key={company.key} value={company.name}>{company.name}</option>);
        }));
    }

    onChange() {
        console.log('secildi');
        let secilmisIs = this.state.companies.find((companies) => {
            return companies.name === this.companyName.value;
        });
        Session.set('companyInfo', secilmisIs);
    }

    render() {
        return (
            <select defaultValue="select-company" ref={company => this.companyName = company} name="select-company" id="select-company" className="browser-default" onChange={this.onChange}>
                <option value="select-company" disabled>Select the Company</option>
                {this.renderCompanies()}
            </select>
        );
    }
}
