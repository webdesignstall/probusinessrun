import React from 'react';
import { Session } from 'meteor/session';

let companies = require('../../../imports/helpers/companyInfos.json');

export default class CompanySelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            companies: []
        };

        this.renderCompanies = this.renderCompanies.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.setState({
            companies: companies.companies
        });
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
