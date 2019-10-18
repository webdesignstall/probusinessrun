import React, { Component } from 'react';
import companies from '../helpers/companyInfos.json';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

companies = companies.companies;

export default class CompanySelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            company: 'all'
        };
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            let company = Session.get('company');

            this.setState({
                company
            });
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    renderCompaniesList() {
        return companies.map((company, index) => {
            return <option key={'companyList' + index}>{company.name}</option>;
        });
    }

    companyChanger(e) {
        Session.set('company', e.target.value);
    }

    render() {
        return (
            <select
                onChange={e => this.companyChanger(e)}
                value={this.state.company}
                className="browser-default statistic__company_selector">
                <option value="all">All Companies</option>
                {this.renderCompaniesList()}
            </select>
        );
    }
}
