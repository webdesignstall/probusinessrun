import React from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

let companies = require('../../../imports/helpers/companyInfos.json');

export default class CompanySelector extends React.Component {
    constructor(props) {
        super(props);
        // noinspection JSValidateTypes
        this.state = {
            companies: [],
            companiesObj: {},
            value: 'select-company'
        };

        this.renderCompanies = this.renderCompanies.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        let objectOfCompanies = {};

        companies.companies.map(company => {
            objectOfCompanies[company.name] = company;
        });

        this.setState({
            companiesObj: objectOfCompanies
        });

        this.x = Tracker.autorun(() => {
            let job = Session.get('job_');
            this.setState({
                companies: companies.companies,
                value: job.companyInfo && job.companyInfo.name ? job.companyInfo.name : 'select-company'
            });
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    renderCompanies() {
        return this.state.companies.map(company => {
            return (
                <option key={company.key} value={company.name}>
                    {company.name}
                </option>
            );
        });
    }

    onChange(e) {
        let job = Session.get('job_');
        let value = e.target.value;
        this.setState(
            {
                value
            },
            () => {
                job.companyInfo = this.state.companiesObj[value];
                Session.set('job_', job);
            }
        );
    }

    render() {
        return (
            <React.Fragment>
                <label htmlFor="select-company">Company</label>
                <select
                    value={this.state.value}
                    name="select-company"
                    id="select-company"
                    data-x="ff"
                    className="browser-default"
                    onChange={e => this.onChange(e)}>
                    <option value="select-company" disabled>
                        Select the Company
                    </option>
                    {this.renderCompanies()}
                </select>
            </React.Fragment>
        );
    }
}
