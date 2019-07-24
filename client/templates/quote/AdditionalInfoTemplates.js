import React, { Component } from 'react';
import { Session } from 'meteor/session';

export default class AdditionalInfoTemplates extends Component {
    constructor(props) {
        super(props);

        this.state = {
            templates: [
                'We have PRICE BEAT guaranteed. If you find any cheaper rate than us, go ahead and forward their official quote to us, then we will beat their price and send you updated quote. Terms and conditions applies.',
                'We can finance your move if you have difficulties to pay. Ask more from your sales representative.',
                'For any additional mover rate will be $30 more per hour.',
                'For 2 movers rate will be $30 less per hour.'
            ]
        };
    }

    valueChange(template) {
        let arr = Session.get('additionalInfo');
        arr.push(template);
        console.log(arr);
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
        return <div className="col s6 m6 l6 additional_info_template">{this.renderList()}</div>;
    }
}
