import React from 'react';
import { Session } from 'meteor/session';

let companies = require('../../../imports/helpers/companyInfos.json');

export default class CompanySelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            companies: [],
            value: 'select-company',
        };

        this.renderCompanies = this.renderCompanies.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.setState({
            companies: companies.companies,
            value: this.props.value || 'select-company',
        });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value || 'select-company',
        });
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

    onChange() {
        this.setState(
            {
                value: this.companyName.value,
            },
            () => {
                let secilmisIs = this.state.companies.find(companies => {
                    return companies.name === this.companyName.value;
                });
                Session.set('companyInfo', secilmisIs);
            },
        );
    }

    render() {
        return (
            <select
                value={this.state.value}
                ref={company => (this.companyName = company)}
                name="select-company"
                id="select-company"
                className="browser-default"
                onChange={this.onChange}>
                <option value="select-company" disabled>
                    Select the Company
                </option>
                {this.renderCompanies()}
            </select>
        );
    }
}
