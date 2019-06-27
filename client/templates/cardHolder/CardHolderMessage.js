import React, { Component } from 'react';
import { Session } from 'meteor/session';

class CardHolderMessage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            job: null,
            messages: {
                fmlt: (flatRate, laborTime, jobNumber) =>
                    `Amount to Charge: $${flatRate} up to ${laborTime} hours, after 3 hours $ 109.00 per hour charge plus if any additional charge for listed moving services with the job number: ${jobNumber}`,
                fnomlt: (flatRate, jobNumber) =>
                    `Amount to Charge: $${flatRate} flat charge plus if any additional charge for listed moving services with the job number: ${jobNumber}`,
                hmlt: (rate, laborTime, jobNumber) =>
                    `Amount to Charge:  $${rate} per hour with ${laborTime} hours minimum charge plus if any a. dditional charge for listed moving services with the job number: ${jobNumber}`,
                hnomlt: (rate, jobNumber) =>
                    `Amount to Charge:  $${rate} per hour charge plus if any additional charge for listed moving services with the job number: ${jobNumber}`
            }
        };

        this.renderMessage = this.renderMessage.bind(this);
    }

    componentDidMount() {
        this.setState({
            job: Session.get('job')
        });
    }

    renderMessage(job) {
        let laborTime = job.laborTime || null;
        let flatRate =
            (job.flatRate &&
                job.flatRate[0] &&
                job.flatRate[0].isTrue &&
                job.flatRate[0].cardAmount) ||
            null;
        let jobNumber = job.jobNumber;
        let rate = job.hourlyRatesCard || null;

        if (flatRate && laborTime) return this.state.messages.fmlt(flatRate, laborTime, jobNumber);
        if (flatRate && !laborTime) return this.state.messages.fnomlt(flatRate, jobNumber);
        if (rate && laborTime) return this.state.messages.hmlt(rate, laborTime, jobNumber);
        if (rate && !laborTime) return this.state.messages.hnomlt(rate, jobNumber);
    }

    render() {
        return (
            <div className="col s12 m6 l6 offset-m3 offset-l3">
                <p>{this.state.job && this.renderMessage(this.state.job)}</p>
                <p>
                    I authorize {this.state.job && this.state.job.companyInfo.name} to charge the
                    amount listed above to the credit card provided herein on my behalf. I agree to
                    pay for this purchase in accordance with the issuing bank cardholder agreement.
                    I understand this move is scheduled for{' '}
                    {this.state.job && this.state.job.clientFirstName}{' '}
                    {this.state.job && this.state.job.clientLastName} and I agree to pay behalf of{' '}
                    {this.state.job && this.state.job.clientFirstName}{' '}
                    {this.state.job && this.state.job.clientLastName}.
                </p>
            </div>
        );
    }
}

export default CardHolderMessage;
