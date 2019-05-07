import React, { Component } from 'react';
import { Session } from 'meteor/session';

export default class AdditionalInfoTemplates extends Component {
    constructor(props) {
        super(props);

        this.state = {
            templates: [
                'We can finance your move, if you have difficulties to pay. Ask more from your sales rep.',
                'If you hire 3 movers, hourly rate will be $129 cash or $139 card per hour'
            ]
        };
    }

    valueChange(template) {
        let arr = Session.get('additionalInfo');
        arr.push(template);
        Session.set('additionalInfo', arr);
    }

    renderList() {
        return this.state.templates.map((template, index) => {
            return (
                <React.Fragment key={index + 'additionalInfoTemplates'}>
                    <ul onClick={() => this.valueChange(template)}>
                        <p>✓ {template}</p>
                    </ul>
                </React.Fragment>
            );
        });
    }

    render() {
        return (
            <div className="col s6 m6 l6 additional_info_template">
                {this.renderList()}
            </div>
        );
    }
}
