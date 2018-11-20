import React from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import WorkData from './../../../common/collections_2';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

/*global paypal*/

let jobIs = {};

class ReserveQuote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is: [],
            selected: 0,
        };

        this.checked = this.checked.bind(this);
        this.jobNumber = this.jobNumber.bind(this);
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            Meteor.subscribe('workSchema');
            const tapilasiIs = WorkData.find({ jobNumber: Session.get('jobNumber') }).fetch();
            this.setState({
                is: tapilasiIs
            });
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    checked() {
        const secilmislerinSayi = document.querySelectorAll('.secilib:checked').length;
        this.setState({
            selected: secilmislerinSayi
        }, () => {
            if (this.state.selected === 7) {
                $('.note').hide();
                $('.paypal-button').show();
            } else {
                $('.note').show();
                $('.paypal-button').hide();
            }
        });
    }

    jobNumber(event) {
        // this.setState({
        //     jobNumber: event.target.value
        // });
        Session.set('jobNumber', event.target.value);
    }

    axtarisinNeticesi() {
        return (
            this.state.is.map((job) => {
                jobIs = job;
                return (
                    <div key="buIs">
                        <p>_</p>
                        <p>Hello {job.clientFirstName}!</p>
                        <p>Thank you for confirming your move with chat Movers Los Angeles!</p>
                        <p>Please review your Moving Confirmation below to ensure accuracy:</p>
                        <table>
                            <tbody>
                                {/* job number */}
                                <tr>
                                    <td>
                                        Your Job Number:
                                    </td>
                                    <td>
                                        {job.jobNumber}
                                    </td>
                                </tr>
                                {/* moving date */}
                                <tr>
                                    <td>
                                        Moving Date:
                                    </td>
                                    <td>
                                        {job.workDate}
                                    </td>
                                </tr>
                                {/* arrival window */}
                                <tr>
                                    <td>
                                        Arrival Window:
                                    </td>
                                    <td>
                                        {job.workMustBeginTime}
                                    </td>
                                </tr>
                                {/* # of movers */}
                                <tr>
                                    <td>
                                        # of movers:
                                    </td>
                                    <td>
                                        {job.numberOfWorkers} movers
                                    </td>
                                </tr>
                                {/* hourly rates cash*/}
                                <tr>
                                    <td>
                                        Hourly Rates cash:
                                    </td>
                                    <td>
                                        ${job.hourlyRatesCash} per hour
                                    </td>
                                </tr>
                                {/* hourly rates card*/}
                                <tr>
                                    <td>
                                        Hourly Rates card:
                                    </td>
                                    <td>
                                        ${job.hourlyRatesCard} per hour
                                    </td>
                                </tr>
                                {/* labor time */}
                                <tr>
                                    <td>
                                        Minimum Labor Time:
                                    </td>
                                    <td>
                                        {job.laborTime} hours
                                    </td>
                                </tr>
                                {/* gas fee */}
                                <tr>
                                    <td>
                                        Gas Fee (one time):
                                    </td>
                                    <td>
                                        $ {!isNaN(job.gasFee) ? job.gasFee : 'waived'}
                                    </td>
                                </tr>
                                {/* double drive time */}
                                <tr>
                                    <td>
                                        Double Drive Time
                                    </td>
                                    <td>
                                        {job.doubleDrive == 'false' ? 'waived' : job.doubleDrive} <a href="http://cheapmoversanaheim.com/ProBusinessRun/6.pdf" download="http://cheapmoversanaheim.com/ProBusinessRun/6.pdf" target="_blank">click to learn more</a>
                                    </td>
                                </tr>
                                {/* moving from */}
                                <tr>
                                    <td>
                                        Moving From:
                                    </td>
                                    <td>
                                        {job.addresses[0]}
                                    </td>
                                </tr>
                                {/* moving to */}
                                <tr>
                                    <td>
                                        Moving To:
                                    </td>
                                    <td>
                                        {job.addresses[1]}
                                    </td>
                                </tr>
                                {/* moving size */}
                                <tr>
                                    <td>
                                        Moving Size:
                                    </td>
                                    <td>
                                        {job.movingSize}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="sola-cekme">
                            <p>
                                {/* finish the on clikc pdf download */}
                                <input className="secilib" onChange={() => this.checked()} type="checkbox" /> I have read, understand and agree to the contents of the <i><a href="http://cheapmoversanaheim.com/ProBusinessRun/1.pdf" download="http://cheapmoversanaheim.com/ProBusinessRun/1.pdf" target="_blank">&quot;What&apos;s Included&quot; Section.</a></i>
                            </p>
                            <p>
                                <input className="secilib" onChange={() => this.checked()} type="checkbox" /> I have read, understand and agree to the contents of the <i><a href="http://cheapmoversanaheim.com/ProBusinessRun/5.pdf" download="http://cheapmoversanaheim.com/ProBusinessRun/5.pdf" target="_blank">&quot;What&apos;s Not Included&quot; Section.</a></i>
                            </p>
                            <p>
                                <input className="secilib" onChange={() => this.checked()} type="checkbox" /> I have read, understand and agree to the contents of the <i><a href="http://cheapmoversanaheim.com/ProBusinessRun/4.pdf" download="http://cheapmoversanaheim.com/ProBusinessRun/4.pdf" target="_blank">&quot;For Your Information&quot; Section.</a></i>
                            </p>
                            <p>
                                <input className="secilib" onChange={() => this.checked()} type="checkbox" /> I have recieved a copy of the <i><a href="http://cheapmoversanaheim.com/ProBusinessRun/2.pdf" download="http://cheapmoversanaheim.com/ProBusinessRun/2.pdf" target="_blank">CPUC &quot;Important Information About Your Move&quot; booklet.</a></i>
                            </p>
                            <p>
                                <input className="secilib" onChange={() => this.checked()} type="checkbox" /> I have recieved a copy of the <i><a href="http://cheapmoversanaheim.com/ProBusinessRun/3.pdf" download="http://cheapmoversanaheim.com/ProBusinessRun/3.pdf" target="_blank">CPUC Hazardous Material List</a></i> and I agree not to pack any of the<br />
                                items listed for transportation by Cheap Movers Los Angeles.
                            </p>
                            <p>
                                <input className="secilib" onChange={() => this.checked()} type="checkbox" /> I understand and agree that I will have <i><a href="#" onClick={() => this.mesaj('cashOrCard')}>Cash or Card Payment</a></i> ready on the day of my move.
                            </p>
                            <p>
                                <input className="secilib" onChange={() => this.checked()} type="checkbox" /> Yes! I have read the information above and wish to pay my Moving Deposit to book this move.<br />
                                I understand that this Deposit in non-refundable and non-transferrable if I reschedule or cancel this move.
                            </p>
                            <p>
                                **If you have any questions, please contact us soon as possible by phone, text, or e-mail 24/7**
                            </p>
                        </div>
                        {/* <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                            <input type="hidden" name="cmd" value="_s-xclick" />
                            <input type="hidden" name="hosted_button_id" value="4YHWGVJJ7YLES" />
                            <table>
                                <tr>
                                    <td>
                                        <input type="hidden" name="on0" value="In Order To Secure Moving Date" />In Order To Secure Moving Date
                                    </td>
                                </tr>
                                <tr>
                                    <td><input type="text" name="os0"/></td>
                                </tr>
                            </table>
                            <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_paynowCC_LG.gif" name="submit" alt="PayPal - The safer, easier way to pay online!" />
                            <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" />
                        </form> */}
                    </div>
                );
            })
        );
    }

    render() {
        return (
            <div className="jobMain">
                <div>
                    <div id="enter-number" className="enter-code">
                        <h6>Please call customer service to get custom code in order to confirm your move. <span>213-262-9440</span></h6>
                        <input id="code" key="jobNumber" type="text" placeholder="Enter code here please." autoComplete="off" onChange={this.jobNumber} />
                        <button id="isi-tap" className="btn waves-effect waves-light" type="submit" name="action"><i className="material-icons right">send</i></button>
                    </div>
                </div>
                <div className="clear"></div>
                <div id='axtarisin-neticesi'>
                    {this.axtarisinNeticesi()}
                    <div className="note"><h4>Please check all the boxes for next step</h4></div>
                    <div id="paypal-button"></div>
                </div>
            </div>
        );
    }
}

Template.reserveQuote.events({
    'click #isi-tap': function () {
        $('#axtarisin-neticesi').show();
    }
});

Template.reserveQuote.onRendered(function () {
    ReactDOM.render(<ReserveQuote />, document.getElementById('reserve-quote'));

    paypal.Button.render({

        env: 'production', // Or 'sandbox'

        style: {
            label: 'pay',
            size: 'medium', // small | medium | large | responsive
            shape: 'rect',   // pill | rect
            color: 'blue'   // gold | blue | silver | black
        },

        client: {
            sandbox: 'ASree96P5IIPryoEkaURjZl_uCCGHLcso9ZNy6U_4vLFUnFc5qhU7hIP7KsLIfZoepVvPhxtdwvTsao5',
            production: 'AeKzmDv5m4KcyrlQI7Y9qiyjYr5jyUYVKd1FsKrXF9Nce7qmfekBC35JIAFbV2am3TdVKhszmcOdFJhK'
        },

        commit: true, // Show a 'Pay Now' button

        payment: function (data, actions) {
            return actions.payment.create({
                payment: {
                    transactions: [
                        {
                            amount: { total: '0.01', currency: 'USD' }
                        }
                    ]
                }
            });
        },

        onAuthorize: function (data, actions) {
            return actions.payment.execute().then(function (payment) {
                $('#son-mesaj').show();
                Meteor.call('confirmationGonder', jobIs);
                // The payment is complete!
                // You can now show a confirmation message to the customer
            });
        }

    }, '#paypal-button');

    $('.paypal-button').hide();

});