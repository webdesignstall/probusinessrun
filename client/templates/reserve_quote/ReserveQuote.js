import React from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import WorkData from './../../../common/collections_2';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import ConfirmationDisplay from './ConfirmationDisplay';

// load companies info json
const baza = require('./companies.json');

/*global paypal, $, Bert*/

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

            console.log(baza['Cheap Movers Costa Mesa'].email);
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
        let isJob = WorkData.findOne({ jobNumber: event.target.value });
        isJob
            ? (
                $('#axtarisin-neticesi').show(),
                document.getElementById('enter-number').classList.add('hide'),
                Session.set('jobNumber', event.target.value))
            : null;
    }

    addressesRender(addressler) {
        return (addressler.map((address, index) => {
            return (
                <tr key={index + 'key'}>
                    <td>
                        Address#{index + 1}:
                    </td>
                    <td>
                        {address}
                    </td>
                </tr>
            );
        }))
    }

    submit() {
        let isJob = WorkData.findOne({ jobNumber: event.target.value });
        isJob
            ? (
                $('#axtarisin-neticesi').show(),
                document.getElementById('enter-number').classList.add('hide'),
                Session.set('jobNumber', event.target.value))
            : Bert.alert({
                title: 'Uncorrect job number',
                message: 'Please enter correct job number',
                type: 'danger'
            });
    }

    renderSmallitemPacking(job) {
        return (
            <tr>
                <td>Small Item Packing:</td>
                <td>
                    {
                        job.smallItemPacking < 0
                            ?
                            <div>
                                Yes, <a href="http://www.moverslegion.com/wp-content/uploads/2018/12/small-item-pricing.pdf" download="http://www.moverslegion.com/wp-content/uploads/2018/12/small-item-pricing.pdf" target="_blank" rel="noopener noreferrer">learn more</a>
                            </div>
                            : '$' + job.smallItemPacking
                    }
                </td>
            </tr>
        );
    }

    axtarisinNeticesi() {
        return (
            this.state.is.map((job, index) => {
                jobIs = job;
                Session.set('job', job);
                return (
                    <div key={index}>
                        <p>
                            Hello {job.clientFirstName}!<br />
                            Thank you for confirming your move with chat Movers Los Angeles!<br />
                            Please review your Moving Confirmation below to ensure accuracy:
                        </p>
                        <table>
                            <tbody>
                                {/* job number */}
                                <tr>
                                    <td>Your Job Number:</td>
                                    <td>{job.jobNumber}</td>
                                </tr>
                                {/* moving date */}
                                <tr>
                                    <td>Moving Date:</td>
                                    <td>{job.workDate}</td>
                                </tr>
                                {/* arrival window */}
                                <tr>
                                    <td>Arrival Window:</td>
                                    <td>{job.workMustBeginTime}</td>
                                </tr>
                                {/* addresses */}
                                {(() => this.addressesRender(job.addresses))()}
                                {/* moving size */}
                                <tr>
                                    <td>Moving Size:</td>
                                    <td>{job.movingSize}</td>
                                </tr>
                                {/* # of movers */}
                                <tr>
                                    <td>Number of Movers:</td>
                                    <td>{job.numberOfWorkers} movers</td>
                                </tr>
                                {/* labor time */}
                                {
                                    job.laborTime
                                        ?
                                        (<tr>
                                            <td>Minimum Labor Time:</td>
                                            <td>{job.laborTime} hours</td>
                                        </tr>
                                        )
                                        : ''
                                }
                                {/* cash rate flat */}
                                {
                                    job.flatRate && job.flatRate[0].isTrue
                                        ?
                                        (<tr>
                                            <td>Cash Discount Flat Rate:</td>
                                            <td>${job.flatRate[0].cashAmount}</td>
                                        </tr>)
                                        : ''
                                }
                                {
                                    job.flatRate && job.flatRate[0].isTrue
                                        ?
                                        (<tr>
                                            <td>Card Flat Rate:</td>
                                            <td>${job.flatRate[0].cardAmount}</td>
                                        </tr>
                                        )
                                        : ''
                                }
                                {/* hourly rates cash*/}
                                {
                                    job.hourlyRatesCash && job.hourlyRatesCash > 0
                                        ?
                                        (<tr>
                                            <td>Cash Discount Rate p/hour:</td>
                                            <td>${job.hourlyRatesCash}</td>
                                        </tr>
                                        )
                                        : ''
                                }

                                {/* hourly rates card*/}
                                {
                                    job.hourlyRatesCard && job.hourlyRatesCard > 0
                                        ?
                                        (
                                            <tr>
                                                <td>Card Regular Rate p/hour:</td>
                                                <td>${job.hourlyRatesCard}</td>
                                            </tr>
                                        )
                                        : ''
                                }
                                {/* gas fee */}
                                {
                                    !isNaN(Number(job.gasFee)) && Number(job.gasFee) > 0
                                        ? (
                                            <tr>
                                                <td>Gas Fee (one time):</td>
                                                <td>${job.gasFee}</td>
                                            </tr>
                                        )
                                        : ''
                                }
                                {/* double drive time */}
                                {
                                    job.doubleDrive === 'yes'
                                        ? (
                                            <tr>
                                                <td>Double Drive Time:</td>
                                                <td>Yes, <a href="http://www.moverslegion.com/wp-content/uploads/2018/12/DDT.pdf" download="http://www.moverslegion.com/wp-content/uploads/2018/12/DDT.pdf" target="_blank" rel="noopener noreferrer">learn more</a></td>
                                            </tr>
                                        )
                                        : ''
                                }
                                {/* small item packing */}
                                {
                                    job.smallItemPacking < 0 || job.smallItemPacking > 0
                                        ? this.renderSmallitemPacking(job)
                                        : ''
                                }
                                {/* Extra Large Item Handling */}
                                {
                                    job.largeItemFee && job.largeItemFee > 0
                                        ?
                                        <tr>
                                            <td>Extra Large Item Handling:</td>
                                            <td>${job.largeItemFee}</td>
                                        </tr>
                                        : ''
                                }
                            </tbody>
                        </table>
                        <div className="sola-cekme">
                            <p>
                                {/* finish the on clikc pdf download */}
                                <input className="secilib" onChange={() => this.checked()} type="checkbox" /> I have read, understand and agree to the contents of the <i><a href="http://www.moverslegion.com/wp-content/uploads/2018/12/included.pdf" download="http://www.moverslegion.com/wp-content/uploads/2018/12/included.pdf" target="_blank" rel="noopener noreferrer">&quot;What&apos;s Included&quot; Section.</a></i>
                            </p>
                            <p>
                                <input className="secilib" onChange={() => this.checked()} type="checkbox" /> I have read, understand and agree to the contents of the <i><a href="http://www.moverslegion.com/wp-content/uploads/2018/12/not-included.pdf" download="http://www.moverslegion.com/wp-content/uploads/2018/12/not-included.pdf" target="_blank" rel="noopener noreferrer">&quot;What&apos;s Not Included&quot; Section.</a></i>
                            </p>
                            <p>
                                <input className="secilib" onChange={() => this.checked()} type="checkbox" /> I have read, understand and agree to the contents of the <i><a href="http://www.moverslegion.com/wp-content/uploads/2018/12/for-you-1.pdf" download="http://www.moverslegion.com/wp-content/uploads/2018/12/for-you-1.pdf" target="_blank" rel="noopener noreferrer">&quot;For Your Information&quot; Section.</a></i>
                            </p>
                            <p>
                                <input className="secilib" onChange={() => this.checked()} type="checkbox" /> I have recieved a copy of the <i><a href="http://www.moverslegion.com/wp-content/uploads/2018/12/important.pdf" download="http://www.moverslegion.com/wp-content/uploads/2018/12/important.pdf" target="_blank" rel="noopener noreferrer">CPUC &quot;Important Information About Your Move&quot; booklet.</a></i>
                            </p>
                            <p>
                                <input className="secilib" onChange={() => this.checked()} type="checkbox" /> I have recieved a copy of the <i><a href="http://www.moverslegion.com/wp-content/uploads/2018/12/Hazard.pdf" download="http://www.moverslegion.com/wp-content/uploads/2018/12/Hazard.pdf" target="_blank" rel="noopener noreferrer">CPUC Hazardous Material List</a></i> and I agree not to pack any of the<br />
                                items listed for transportation by Cheap Movers Los Angeles.
                            </p>
                            <p>
                                <input className="secilib" onChange={() => this.checked()} type="checkbox" /> I understand and agree that I will have Cash or Card Payment ready on the day of my move.
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
            <div id="jobInfoMain" className="jobMain">
                <div className="job-number-enter">
                    <div id="enter-number" className="enter-code">
                        <h6>Please call customer service to get custom code in order to confirm your move. <span>213-262-9440</span></h6>
                        <input id="code" key="jobNumber" type="text" placeholder="Enter code here please." autoComplete="off" onChange={this.jobNumber} />
                        <button id="isi-tap" className="btn waves-effect waves-light" type="submit" name="action" onClick={this.submit}><i className="material-icons right">send</i></button>
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

Template.reserveQuote.onRendered(function () {
    ReactDOM.render(<ReserveQuote />, document.getElementById('reserve-quote'));
    try {
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
                                amount: { total: Session.get('job').deposit, currency: 'USD' }
                            }
                        ]
                    }
                });
            },

            onAuthorize: function (data, actions) {
                return actions.payment.execute().then(function (payment) {
                    document.getElementById('jobInfoMain').classList.add('hide');
                    document.getElementById('son-mesaj').classList.remove('hide');
                    Meteor.call('confirmationGonder', jobIs);
                    ReactDOM.render(<ConfirmationDisplay />, document.getElementById('son-mesaj'));
                    // The payment is complete!
                    // You can now show a confirmation message to the customer
                });
            }

        }, '#paypal-button');

        $('.paypal-button').hide();
    } catch (err) {
        console.log(err);
    }

});
