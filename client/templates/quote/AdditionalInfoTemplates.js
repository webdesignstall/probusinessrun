import React, { Component } from 'react';

export default class AdditionalInfoTemplates extends Component {
    constructor(props) {
        super(props);

        this.state = {
            templates: [
                [
                    'We can finance your move, if you have difficulties to pay. Ask more from your sales rep.',
                    'If you hire 3 movers, hourly rate will be $129 cash or $139 card per hour',
                ],
            ],
        };
    }

    setTemplate() {}

    render() {
        return (
            <div className="col s6 m6 l6 additional_info_template">
                <ul onClick={this.setTemplate}>
                    <li>We can finance your move, if you have difficulties to pay. Ask more from your sales rep.</li>
                    <li>If you hire 3 movers, hourly rate will be $129 cash or $139 card per hour</li>
                </ul>
            </div>
        );
    }
}
