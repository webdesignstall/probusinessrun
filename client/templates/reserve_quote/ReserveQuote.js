import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import WorkData from './../../../common/collections_2';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import LoadingOverlay from 'react-loading-overlay';
import BarLoader from 'react-spinners/BarLoader';

import Payment from '../../../imports/payment/Payment';
// import ConfirmationDisplay from './ConfirmationDisplay';

/*global $ Bert*/

let jobIs = {};

export default class ReserveQuote extends TrackerReact(Component) {
    constructor(props) {
        super(props);
        this.state = {
            jobNumber: '',
            is: {},
            id: '',
            selected: 0,
            movingSizeCorrectNaming: {
                items: 'Items',
                studio: 'Studio',
                '1_bedroom': '1 Bedroom',
                '2_bedroom_small': '2 Bedroom (small size, few items)',
                '2_bedroom_avg': '2 Bedroom (avg. size, avg. items)',
                '2_bedroom_large': '2 Bedroom (large size, many items)',
                '3_bedroom_avg': '3 Bedroom (avg. size, avg. items)',
                '3_bedroom_large': '3 Bedroom (large size, many items)',
                '4_bedrooom_avg': '4 Bedroom (avg. size, avg. items)',
                '4_bedroom_large': '4 Bedroom (large size, many items)',
                commercial_avg: 'Commercial (avg. size, avg. items)',
                commercial_large: 'Commercial (large size, many items)'
            }
        };

        this.checked = this.checked.bind(this);
        this.jobNumber = this.jobNumber.bind(this);
        this.renderAdditionalContacts = this.renderAdditionalContacts.bind(
            this
        );
    }

    workData(id) {
        return WorkData.find({
            jobNumber: id
        }).fetch();
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            Meteor.subscribe('workSchema');
            // const tapilasiIs = this.workData(Session.get('jobNumber'));
            // let id = Session.get('job')._id;
            // this.setState({
            //     is: tapilasiIs,
            //     id
            // });
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    checked() {
        const secilmislerinSayi = document.querySelectorAll('.secilib:checked')
            .length;
        this.setState(
            {
                selected: secilmislerinSayi
            },
            () => {
                if (this.state.selected === 7) {
                    $('.note').hide();
                    $('#payPal').show();
                } else {
                    $('.note').show();
                    $('#payPal').hide();
                }
            }
        );
    }

    jobNumber(event) {
        console.log(event.target.value);
        let jobNumber = event.target.value;
        let isJob = WorkData.find({ jobNumber }).fetch()[0];
        isJob
            ? this.setState(
                {
                    is: isJob,
                    id: isJob._id
                },
                () => {
                    $('#axtarisin-neticesi').show(),
                    document
                        .getElementById('enter-number')
                        .classList.add('hide'),
                    Session.set('jobNumber', jobNumber);
                }
            )
            : null;
    }

    addressesRender(addressler) {
        return addressler.map((address, index) => {
            return (
                <tr key={index + 'key'}>
                    <td>Address#{index + 1}:</td>
                    <td>{address}</td>
                </tr>
            );
        });
    }

    submit() {
        let jobNumber = document.getElementById('code').value;
        let isJob = WorkData.findOne({ jobNumber });
        isJob && isJob.length > 0
            ? ($('#axtarisin-neticesi').show(),
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
            <React.Fragment>
                <td>Small Item Packing:</td>
                <td>
                    {job.smallItemPacking < 0 ? (
                        <div>
                            Yes,{' '}
                            <a
                                href="http://www.moverslegion.com/wp-content/uploads/2018/12/small-item-pricing.pdf"
                                download="http://www.moverslegion.com/wp-content/uploads/2018/12/small-item-pricing.pdf"
                                target="_blank"
                                rel="noopener noreferrer">
                                learn more
                            </a>
                        </div>
                    ) : (
                        '$' + job.smallItemPacking
                    )}
                </td>
            </React.Fragment>
        );
    }

    renderAdditionalContacts(addContacts) {
        return addContacts
            ? addContacts.map((value, index) => {
                return (
                    <React.Fragment key={index + 'addContact'}>
                        <tr>
                            <td>Additional Contact name:</td>
                            <td>
                                {value.firstName} {value.lastName}
                            </td>
                        </tr>
                        <tr>
                            <td>Contact Main Number:</td>
                            <td>{value.phoneNumber}</td>
                        </tr>
                        {value.additionalPhoneNumber !== null &&
                          value.additionalPhoneNumber !== undefined &&
                          value.additionalPhoneNumber !== '' ? (
                                <tr>
                                    <td>Contact Secondary Number:</td>
                                    <td>{value.additionalPhoneNumber}</td>
                                </tr>
                            ) : (
                                ''
                            )}
                    </React.Fragment>
                );
            })
            : null;
    }
    renderTrucks(truck) {
        let x = Array(truck.qty).fill(1);
        return x.map((x, index) => {
            return (
                <tr key={index + 'trucksListConfirmation'}>
                    <td>Truck Size:</td>
                    <td>{truck.size}</td>
                </tr>
            );
        });
    }

    trucksRender(job) {
        return job.trucksTemp.map((truck, index) => {
            return (
                <React.Fragment key={index + 'trucksRenderConfirm'}>
                    {this.renderTrucks(truck)}
                </React.Fragment>
            );
        });
    }

    numberOfTrucks(job) {
        let totalTrucks = 0;
        job.trucksTemp && job.trucksTemp.length > 0
            ? job.trucksTemp
                .map(truck => {
                    totalTrucks += Number(truck.qty);
                })
                .join('')
            : '';

        return job.trucksTemp && job.trucksTemp.length > 0 ? (
            <tr>
                <td>Number of trucks:</td>
                <td>{totalTrucks} fully equipped</td>
            </tr>
        ) : (
            ''
        );
    }

    arrivalWindowRender() {
        let job = Session.get('job');
        return (
            <tr>
                <td>Arrival Window:</td>
                <td>
                    {job.workMustBeginTime[0] === '04:00 am' &&
                    job.workMustBeginTime[0] === '04:00 am'
                        ? 'Morning & Afternoon'
                        : `${job.workMustBeginTime[0]} - ${
                            job.workMustBeginTime[1]
                        }`}
                </td>
            </tr>
        );
    }

    additionalInfo(job) {
        return job.additionalInfo.map((addInfo, index) => {
            return <div key={index + 'addInfoConfirm'}>✓ {addInfo}</div>;
        });
    }

    axtarisinNeticesi() {
        Session.set('job', this.state.is);

        let job = this.state.is;
        return (
            <div key={(job && job._id) || 123243423}>
                <p>
                    Hello {job.clientFirstName}!<br />
                    Thank you for confirming your move with{' '}
                    {job.companyInfo && job.companyInfo.name}!<br />
                    Please review your Moving Confirmation below to ensure
                    accuracy:
                </p>
                <table style={{ width: '100%' }}>
                    <tbody>
                        <tr>
                            <td>Customer Name:</td>
                            <td>
                                {job.clientFirstName} {job.clientLastName}
                            </td>
                        </tr>
                        <tr>
                            <td>Customer Main Number:</td>
                            <td>{job.phoneNumber}</td>
                        </tr>
                        <tr
                            className={
                                job.phoneAdditional === '' ||
                                job.phoneAdditional === undefined ||
                                job.phoneAdditional === null
                                    ? 'hide'
                                    : ''
                            }>
                            <td>Customer Secondary Number:</td>
                            <td>{job.phoneAdditional}</td>
                        </tr>
                        {this.renderAdditionalContacts(
                            job.additionalContacts || null
                        )}
                        <tr>
                            <td>Your Job Number:</td>
                            <td>{job.jobNumber}</td>
                        </tr>
                        <tr>
                            <td>Moving Date:</td>
                            <td>{job.workDate}</td>
                        </tr>
                        {this.arrivalWindowRender()}
                        {(() => this.addressesRender(job.addresses))()}
                        <tr>
                            <td>Moving Size:</td>
                            <td>
                                {
                                    this.state.movingSizeCorrectNaming[
                                        job.movingSize
                                    ]
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Number of Movers:</td>
                            <td>{job.numberOfWorkers} men crew</td>
                        </tr>
                        {this.numberOfTrucks(job)}
                        {this.trucksRender(job)}
                        {job.laborTime ? (
                            <tr>
                                <td>Minimum Labor Time:</td>
                                <td>{job.laborTime} hours</td>
                            </tr>
                        ) : (
                            ''
                        )}
                        {/* cash rate flat */}
                        {job.flatRate && job.flatRate[0].isTrue ? (
                            <tr>
                                {job.laborTime > 0 ? (
                                    <td>
                                        Flat Rate{' '}
                                        {job.laborTime
                                            ? 'Up to ' +
                                              job.laborTime +
                                              ' hours'
                                            : ''}
                                    </td>
                                ) : (
                                    <td>Flat Rate</td>
                                )}
                                <td>
                                    cash ${job.flatRate[0].cashAmount}, card $
                                    {job.flatRate[0].cardAmount}
                                </td>
                            </tr>
                        ) : (
                            ''
                        )}
                        {job.flatRate &&
                        job.laborTime &&
                        job.flatRate[0].isTrue &&
                        job.laborTime > 0 ? (
                                <tr>
                                    {job.laborTime > 0 ? (
                                        <td>
                                        Hourly Rate After {job.laborTime} hours
                                        </td>
                                    ) : (
                                        <td>Hourly Rate</td>
                                    )}
                                    <td>
                                    cash ${job.hourlyRatesCash}/hr, card $
                                        {job.hourlyRatesCard}/hr
                                    </td>
                                </tr>
                            ) : (
                                ''
                            )}
                        {/* hourly rates cash*/}
                        {job.hourlyRatesCash &&
                        job.hourlyRatesCash > 0 &&
                        !job.flatRate[0].isTrue ? (
                                <tr>
                                    <td>Cash Discount Rate p/hour:</td>
                                    <td>${job.hourlyRatesCash}</td>
                                </tr>
                            ) : (
                                ''
                            )}
                        {/* hourly rates card*/}
                        {job.hourlyRatesCard &&
                        job.hourlyRatesCard > 0 &&
                        !job.flatRate[0].isTrue ? (
                                <tr>
                                    <td>Card Regular Rate p/hour:</td>
                                    <td>${job.hourlyRatesCard}</td>
                                </tr>
                            ) : (
                                ''
                            )}
                        {/* Travel Fee */}
                        {!isNaN(Number(job.gasFee)) &&
                        Number(job.gasFee) > 0 ? (
                                <tr>
                                    <td>Travel Fee (one time):</td>
                                    <td>${job.gasFee}</td>
                                </tr>
                            ) : (
                                ''
                            )}
                        {/* double drive time */}
                        {job.doubleDrive === 'yes' ? (
                            <tr>
                                <td>Double Drive Time:</td>
                                <td>
                                    Yes,{' '}
                                    <a
                                        href="http://www.moverslegion.com/wp-content/uploads/2019/02/DDT.pdf"
                                        download="http://www.moverslegion.com/wp-content/uploads/2019/02/DDT.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        learn more
                                    </a>
                                </td>
                            </tr>
                        ) : (
                            ''
                        )}
                        {/* small item packing */}
                        {job.smallItemPacking < 0 || job.smallItemPacking > 0
                            ? this.renderSmallitemPacking(job)
                            : ''}
                        {/* Extra Large Item Handling */}
                        {job.largeItemFee && job.largeItemFee > 0 ? (
                            <tr>
                                <td>Extra Large Item Handling:</td>
                                <td>${job.largeItemFee}</td>
                            </tr>
                        ) : (
                            ''
                        )}
                        {job.deposit && job.deposit > 0 ? (
                            <tr>
                                <td style={{ width: '49%' }}>
                                    Deposit required to lock the spot:
                                </td>
                                <td style={{ width: '49%' }}>
                                    +${job.deposit} (to be applied as a credit
                                    toward this move’s bill)
                                </td>
                            </tr>
                        ) : (
                            ''
                        )}
                    </tbody>
                </table>
                <div className="sola-cekme">
                    <p>
                        {job.additionalInfo &&
                        Array.isArray(job.additionalInfo) &&
                        job.additionalInfo.length > 0 ? (
                                <div>
                                Additional Info <br />
                                    {this.additionalInfo(jobIs)}
                                </div>
                            ) : null}
                    </p>
                    <p>
                        {/* finish the on clikc pdf download */}
                        <input
                            className="secilib"
                            onChange={() => this.checked()}
                            type="checkbox"
                        />{' '}
                        I have read, understand and agree to the contents of the{' '}
                        <i>
                            <a
                                href="http://www.moverslegion.com/wp-content/uploads/2019/01/included.pdf"
                                download="http://www.moverslegion.com/wp-content/uploads/2019/01/included.pdf"
                                target="_blank"
                                rel="noopener noreferrer">
                                &quot;What&apos;s Included&quot; Section.
                            </a>
                        </i>
                    </p>
                    <p>
                        <input
                            className="secilib"
                            onChange={() => this.checked()}
                            type="checkbox"
                        />{' '}
                        I have read, understand and agree to the contents of the{' '}
                        <i>
                            <a
                                href="http://www.moverslegion.com/wp-content/uploads/2019/01/not-included.pdf"
                                download="http://www.moverslegion.com/wp-content/uploads/2019/01/not-included.pdf"
                                target="_blank"
                                rel="noopener noreferrer">
                                &quot;What&apos;s Not Included&quot; Section.
                            </a>
                        </i>
                    </p>
                    <p>
                        <input
                            className="secilib"
                            onChange={() => this.checked()}
                            type="checkbox"
                        />{' '}
                        I have read, understand and agree to the contents of the{' '}
                        <i>
                            <a
                                href="http://www.moverslegion.com/wp-content/uploads/2018/12/for-you-1.pdf"
                                download="http://www.moverslegion.com/wp-content/uploads/2018/12/for-you-1.pdf"
                                target="_blank"
                                rel="noopener noreferrer">
                                &quot;For Your Information&quot; Section.
                            </a>
                        </i>
                    </p>
                    <p>
                        <input
                            className="secilib"
                            onChange={() => this.checked()}
                            type="checkbox"
                        />{' '}
                        I have recieved a copy of the{' '}
                        <i>
                            <a
                                href="http://www.moverslegion.com/wp-content/uploads/2018/12/important.pdf"
                                download="http://www.moverslegion.com/wp-content/uploads/2018/12/important.pdf"
                                target="_blank"
                                rel="noopener noreferrer">
                                CPUC &quot;Important Information About Your
                                Move&quot; booklet.
                            </a>
                        </i>
                    </p>
                    <p>
                        <input
                            className="secilib"
                            onChange={() => this.checked()}
                            type="checkbox"
                        />{' '}
                        I have recieved a copy of the{' '}
                        <i>
                            <a
                                href="http://www.moverslegion.com/wp-content/uploads/2018/12/Hazard.pdf"
                                download="http://www.moverslegion.com/wp-content/uploads/2018/12/Hazard.pdf"
                                target="_blank"
                                rel="noopener noreferrer">
                                CPUC Hazardous Material List
                            </a>
                        </i>{' '}
                        and I agree not to pack any of the
                        <br />
                        items listed for transportation by the moving company.
                    </p>
                    <p>
                        <input
                            className="secilib"
                            onChange={() => this.checked()}
                            type="checkbox"
                        />{' '}
                        I understand and agree that I will have Cash or Card
                        Payment ready on the day of my move.
                    </p>
                    <p>
                        <input
                            className="secilib"
                            onChange={() => this.checked()}
                            type="checkbox"
                        />{' '}
                        Yes! I have read the information below and wish to pay
                        my Moving Deposit to book this move.
                        <br />I understand that this Deposit is non-refundable
                        and non-transferrable if I reschedule or cancel this
                        move.
                    </p>
                    <p>
                        **If you have any questions, please contact us as soon
                        as possible by phone, text, or e-mail 24/7**
                    </p>
                    <div style={{ textAlign: 'center' }}>
                        Phone Number: {job.companyInfo.phoneNumber} <br />
                        Email:{' '}
                        <a href={'mailto:' + job.companyInfo.email}>
                            {job.companyInfo.email}
                        </a>
                        <br />
                        Web:{' '}
                        <a href={job.companyInfo.url}>{job.companyInfo.url}</a>
                        <br />
                    </div>
                </div>
            </div>
        );
    }

    compare() {
        let is = this.state.is;
        if (is) {
            return is.quoteExpirationDate
                ? is.quoteExpirationDate.getTime() < new Date()
                    ? true
                    : is.status === 'won' ||
                      is.status === 'lost' ||
                      is.status === 'cancelled'
                : true;
        } else {
            return false;
        }
    }

    render() {
        return (
            <LoadingOverlay
                text="Loading..."
                className="loader"
                active={Session.get('loading')}
                spinner={<BarLoader color={'#6DD4B8'} />}>
                <div id="jobInfoMain" className="jobMain">
                    <div className="job-number-enter">
                        <div id="enter-number" className="enter-code">
                            <h6>
                                By entering your job number below you will be
                                able to confirm your moving details
                            </h6>
                            <input
                                id="code"
                                key="jobNumber"
                                type="text"
                                placeholder="Enter code here please."
                                autoComplete="off"
                                onChange={e => this.jobNumber(e)}
                            />
                            <button
                                id="isi-tap"
                                className="btn waves-effect waves-light"
                                type="submit"
                                name="action"
                                onClick={this.submit}>
                                <i className="material-icons right">send</i>
                            </button>
                        </div>
                    </div>
                    <div className="clear" />
                    <div id="axtarisin-neticesi">
                        <div className={this.compare() ? 'coverDark' : 'hide'}>
                            <div className="enter-code">
                                <h6>
                                    Your offer has expired. Please contact
                                    customer service in order to access to your
                                    confirmation page.{' '}
                                    <span>(844) 404-8404</span>
                                    <br />
                                    Your job number is:{' '}
                                    <span>
                                        {(this.state.is &&
                                            this.state.is.jobNumber) ||
                                            ''}
                                    </span>
                                </h6>
                            </div>
                        </div>
                        {this.state.id !== '' ? this.axtarisinNeticesi() : ''}
                        <div className="note">
                            <h4>Please check all the boxes for next step</h4>
                        </div>
                        <div
                            id="payPal"
                            style={{ display: 'none', margin: '20px 0' }}>
                            {this.state.id !== '' &&
                                this.state.id !== undefined && (
                                <Payment id={this.state.id} />
                            )}
                            {/* <div id="paypal-button" /> */}
                        </div>
                    </div>
                </div>
            </LoadingOverlay>
        );
    }
}

Template.reserveQuote.onRendered(function() {
    ReactDOM.render(<ReserveQuote />, document.getElementById('reserve-quote'));
    // try {
    //     paypal.Button.render(
    //         {
    //             env: 'production', // Or 'sandbox'
    //             style: {
    //                 label: 'pay',
    //                 size: 'medium', // small | medium | large | responsive
    //                 shape: 'rect', // pill | rect
    //                 color: 'blue' // gold | blue | silver | black
    //             },
    //             client: {
    //                 sandbox:
    //                     'ASree96P5IIPryoEkaURjZl_uCCGHLcso9ZNy6U_4vLFUnFc5qhU7hIP7KsLIfZoepVvPhxtdwvTsao5',
    //                 production:
    //                     'AeKzmDv5m4KcyrlQI7Y9qiyjYr5jyUYVKd1FsKrXF9Nce7qmfekBC35JIAFbV2am3TdVKhszmcOdFJhK'
    //             },
    //             commit: true, // Show a 'Pay Now' button
    //             payment: function(data, actions) {
    //                 return actions.payment.create({
    //                     payment: {
    //                         transactions: [
    //                             {
    //                                 amount: {
    //                                     total: Session.get('job').deposit,
    //                                     currency: 'USD'
    //                                 }
    //                             }
    //                         ]
    //                     }
    //                 });
    //             },
    //             onAuthorize: function(data, actions) {
    //                 return actions.payment
    //                     .execute()
    //                     .then(function(payment) {
    //                         document
    //                             .getElementById('jobInfoMain')
    //                             .classList.add('hide');
    //                         document
    //                             .getElementById('son-mesaj')
    //                             .classList.remove('hide');
    //                         Meteor.call('confirmationGonder', jobIs);
    //                         ReactDOM.render(
    //                             <ConfirmationDisplay />,
    //                             document.getElementById('son-mesaj')
    //                         );
    //                         let job = Session.get('job');
    //                         job.quote = false;
    //                         job.confirmed = true;
    //                         job.isFollowUp = true;
    //                         job.status = 'won';
    //                         Meteor.call('updateWork', job);
    //                         // The payment is complete!
    //                         // You can now show a confirmation message to the customer
    //                     })
    //                     .catch(err => {
    //                         err ? console.log(err) : null;
    //                     });
    //             }
    //         },
    //         '#paypal-button'
    //     );
    //     $('.paypal-button').hide();
    //     $('#payPal').hide();
    // } catch (err) {
    //     console.log(err);
    // }
});
