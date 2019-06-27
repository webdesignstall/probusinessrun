import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Session } from 'meteor/session';
import LoadingOverlay from 'react-loading-overlay';
import BounceLoader from 'react-spinners/BounceLoader';

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
            typedLastNamee: '',
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
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
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

    render() {
        return (
            <LoadingOverlay
                text="Loading..."
                className="loader"
                active={Session.get('loading')}
                spinner={<BounceLoader color={'#6DD4B8'} />}
            >
                <div className="cardHolder">
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
                    <CardHolderSign change={this.changeState} />
                    <CardHolderUpload change={this.changeState} />
                    <div className="col s12 m6 l6 offset-m3 offset-l3 cardholder_check">
                        <p>
                            <input type="checkbox" /> <span className="red_star">*</span> I
                            understand that checking this box constitutes a legal signature
                            confirming that I acknowledge and agree to the above Terms of
                            Acceptance.
                        </p>
                    </div>
                    <div className="col s12 m6 l6 offset-m3 offset-l3">
                        <button className="btn" type="submit">
                            Submit The Form
                        </button>
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
