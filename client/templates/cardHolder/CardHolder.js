import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Session } from 'meteor/session';
import LoadingOverlay from 'react-loading-overlay';
import BounceLoader from 'react-spinners/BounceLoader';
import swal from 'sweetalert';
import htmlToImage from 'html-to-image';

import CardInfo from './CardInfo';
import CardHolderMessage from './CardHolderMessage';
import CardHolderSign from './CardHolderSign';
import CardHolderUpload from './CardHolderUpload';
import CardHolderFooter from './CardHolderFooter';

import './cardholder.styl';

class CardHolder extends TrackerReact(Component) {
    constructor(props) {
        super(props);

        this.state = {
            typedFirstName: '',
            typedDate: '',
            nameOnCard: '',
            billingAddress: '',
            creditCardType: 'visa',
            creditCardNumber: '',
            expirationDate: '',
            cardId: '',
            cardFront: '',
            cardBack: '',
            cardHolderId: '',
            agreement: false
        };

        this.changeState = this.changeState.bind(this);
        this.checkAll = this.checkAll.bind(this);
        this.agreementClick = this.agreementClick.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            Session.set('displayFiles', false);
            let job = Session.get('job');
            this.setState(
                {
                    job
                },
                () => {
                    Session.set('loading', false);
                }
            );
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    changeState(what, value) {
        this.setState({
            [what]: value
        });
    }

    agreementClick() {
        this.setState(prevState => {
            return {
                agreement: !prevState.agreement
            };
        });
    }

    checkAll() {
        let checkList = this.state;
        let count = 0;
        for (let key in checkList) {
            key !== 'job' && checkList[key] && checkList[key] !== '' && count++;
        }
        return count === 12;
    }

    submit() {
        Session.set('loading', true);
        let doc = { ...this.state };
        let job = this.state.job;
        let randomNumber = Math.random() * (123 - 1) + 1;
        let name = job._id + '_cardHolder' + randomNumber + '.pdf';

        // display uploaded files and hife icons
        Session.set('displayFiles', true);

        // delete unnecessary informations from document
        delete doc.job;
        delete doc.cardFront;
        delete doc.cardBack;
        delete doc.cardHolderId;

        doc = Object.assign(job.cardHolderInfo, doc);
        job.cardHolderInfo = doc;
        job.cardHolderpdf = 'https://s3-us-west-1.amazonaws.com/probusinessrun.finished.jobs.pdf/' + name;

        Meteor.call('updateWork', job, (err, result) => {
            if (err) {
                swal({
                    title: 'Error!',
                    text: 'Error while saving information. Please contact customer service',
                    icon: 'error',
                    button: 'OK'
                });
                console.error(err);
            } else {
                console.info(result);
                let htmlOfCanvas = document.querySelector('#cardHolderContent');

                htmlToImage
                    .toPng(htmlOfCanvas)
                    .then(function(dataUrl) {
                        Meteor.call('cardHolderPDF', dataUrl, Session.get('tabletIsId'), name, (err, res) => {
                            Session.set('loading', false);
                            if (err) {
                                swal({
                                    title: 'Error!',
                                    text: 'Error while saving information. Please contact customer service',
                                    icon: 'error',
                                    button: 'OK'
                                });
                            } else {
                                swal({
                                    title: 'Success!',
                                    text: 'Information saved successfully!',
                                    icon: 'success',
                                    button: 'OK'
                                }).then(() => window.location.reload());
                            }
                        });
                    })
                    .catch(function(error) {
                        Session.set('loading', false);
                        console.error('oops, something went wrong!', error);
                    });
            }
        });
    }

    render() {
        return (
            <LoadingOverlay
                text="Loading..."
                className="loader"
                active={Session.get('loading')}
                spinner={<BounceLoader color={'#6DD4B8'} />}
            >
                <div id="cardHolderContent" className="cardHolder">
                    {/* Header */}
                    <div className="col s12 m12 l12">
                        <h1>Authorization for Credit Card Use</h1>
                        <h2>
                            FILL THIS FORM, IN ORDER WE CAN PROCESS YOUR MOVE <br />
                            All information will remain confidential.
                        </h2>
                    </div>
                    <CardInfo change={this.changeState} state={this.state} />
                    <CardHolderMessage />
                    <CardHolderSign change={this.changeState} obj={this.state} />
                    <CardHolderUpload change={this.changeState} />
                    <div className="col s12 m6 l6 offset-m3 offset-l3 cardholder_check">
                        <p>
                            <input
                                id="agreementCheck"
                                className="hide"
                                checked={this.state.agreement}
                                type="checkbox"
                                onChange={this.agreementClick}
                            />
                            <label htmlFor="agreementCheck">
                                <a href="#" className="agreementClick_"></a>
                            </label>
                            <span className="red_star">*</span> I understand that checking this box constitutes a legal signature
                            confirming that I acknowledge and agree to the above Terms of Acceptance.
                        </p>
                    </div>
                    <div className="col s12 m6 l6 offset-m3 offset-l3">
                        <button className={this.checkAll() ? 'btn' : 'btn disabled'} type="submit" onClick={this.submit}>
                            Submit The Form
                        </button>
                        <p className="buttonAlert">
                            Please fill all information, upload files and check agreement box for activate submit button
                        </p>
                    </div>
                    <CardHolderFooter />
                </div>
            </LoadingOverlay>
        );
    }
}

Template.cardHolder.onRendered(() => {
    Session.set('loading', true);
    !Meteor.userId() && document.getElementById('container-man').classList.remove('container-man');
    ReactDOM.render(<CardHolder />, document.getElementById('cardHolder'));
});

Template.cardHolder.onDestroyed(() => {
    document.getElementById('container-man').classList.add('container-man');
    ReactDOM.unmountComponentAtNode('cardHolder');
});
