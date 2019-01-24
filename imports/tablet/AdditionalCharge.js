import React, { Component } from 'react';
import Signature from './Signature';

export default class AdditionalCharge extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clicked: false
        };

        this.setClick = this.setClick.bind(this);
    }

    setClick() {
        this.setState((prevState) => {
            return {
                clicked: !prevState.clicked
            };
        });
    }

    displayAdditionalCharge() {
        return (
            <div>
                <hr />
                <p style={{ textAlign: 'left' }}>Reason:</p>
                <textarea name="additionalCharge" id="additional-charge" style={{ display: 'inline-block', maxWidth: '60%', minWidth: '60%', padding: '10px', marginRight: '10px' }}></textarea>
                <div style={{ display: 'inline-block', maxWidth: '35%', minWidth: '35%', padding: '10px' }}>
                    <input type="number" id="additional-cahrge--amount" />
                    <label htmlFor="additional-cahrge--amount" className="active">Charge Amount</label>
                </div>
                <hr />
                <Signature />
            </div>
        );
    }

    render() {
        return (
            <div className="card__">
                <div onClick={this.setClick} >Additional Charge</div>
                {this.state.clicked ? this.displayAdditionalCharge() : ''}
            </div>
        );
    }
}
