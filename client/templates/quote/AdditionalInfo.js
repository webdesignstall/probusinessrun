import React, { Component } from 'react';
import AdditionalInfoTemplates from './AdditionalInfoTemplates';
import AdditionalInfoValue from './AdditionalInfoValue';

export default class AdditionalInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        };

        this.changeValue = this.changeValue.bind(this);
    }

    changeValue(value) {
        this.setState(prevState => {
            return {
                value:
                    prevState.value === ''
                        ? prevState.value + '✓ ' + value
                        : prevState.value + '\n✓ ' + value
            };
        });
    }

    render() {
        return (
            <div className="row additional_info">
                <div className="additional_info_header">Additional Info</div>
                <AdditionalInfoValue value={this.state.value} />
                <AdditionalInfoTemplates valueChange={this.changeValue} />
            </div>
        );
    }
}
