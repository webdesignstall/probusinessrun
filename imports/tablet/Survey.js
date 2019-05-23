import React, { Component } from 'react';
import { Tracker } from 'meteor/tracker';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Session } from 'meteor/session';

import WorkData from '../../common/collections_2';
import './survey.styl';
import surveys from './surveys.json';

export default class Survey extends TrackerReact(Component) {
    constructor(props) {
        super(props);
        this.state = {
            surveys,
            status: 'start',
            doc: {
                _id: '',
                cardHolderInfo: {
                    firstName: '',
                    lastName: '',
                    email: ''
                }
            }
        };

        this.changeStatus = this.changeStatus.bind(this);
        this.changeInput = this.changeInput.bind(this);
    }

    static workData() {
        return WorkData.find({ _id: '' }).fetch();
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            Survey.workData();
            let _id = Session.get('tabletIsId');
            this.setState(prevState => {
                console.log(prevState);
                let doc = prevState.doc;
                console.log(doc);
                doc._id = _id;
                console.log(doc._id);
                return { doc };
            });
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    changeStatus(status) {
        if (typeof status === 'string') {
            this.setState({
                status
            });
        } else {
            this.setState(
                {
                    status: 'start'
                },
                () => {
                    Object.keys(status).map(action => {
                        Meteor.call(action, this.state.doc);
                    });
                    this.props.finishSurvey();
                }
            );
        }
    }

    changeInput(what, e) {
        let text = e.target.value;
        this.setState(prevState => {
            let doc = prevState.doc;
            doc.cardHolderInfo[what] = text;
            return {
                doc
            };
        });
    }

    inputs_() {
        return Object.keys(this.state.surveys[this.state.status].inputs).map(
            (key, index) => {
                return (
                    <React.Fragment key={index + 'surveyButtons'}>
                        <input
                            className="col s12 m12 l12"
                            autoComplete="none"
                            id={index + 'surveyButtons'}
                            type="text"
                            onChange={e => this.changeInput(key, e)}
                            value={this.state.doc.cardHolderInfo[key]}
                            placeholder={
                                this.state.surveys[this.state.status].inputs[
                                    key
                                ]
                            }
                        />
                    </React.Fragment>
                );
            }
        );
    }

    buttons_() {
        return Object.keys(this.state.surveys[this.state.status].buttons).map(
            (key, index) => {
                return (
                    <button
                        onClick={() =>
                            this.changeStatus(
                                this.state.surveys[this.state.status].buttons[
                                    key
                                ]
                            )
                        }
                        className="btn"
                        key={index + 'surveyButtons'}>
                        {key}
                    </button>
                );
            }
        );
    }

    render() {
        return (
            <div className="survey">
                {/*survey messages*/}
                <div className="surveyMessage">
                    {this.state.surveys[this.state.status].survey}
                </div>
                {/*survey inputs*/}
                <div className="row">
                    {this.state.surveys[this.state.status].inputs
                        ? this.inputs_()
                        : ''}
                </div>
                {/*survey buttons*/}
                <div className="row">
                    {this.state.surveys[this.state.status].buttons
                        ? this.buttons_()
                        : ''}
                </div>
            </div>
        );
    }
}
