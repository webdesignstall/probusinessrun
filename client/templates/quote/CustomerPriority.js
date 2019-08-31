import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WorkData from '../../../common/collections_2';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

export default class CustomerPriority extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            star: ['', '', ''],
            rate: 0,
            rateClicked: 0,
            color: ['#E15141', '#F5C344', '#4994EB'],
            clicked: false,
            animation: ''
        };

        this.renderStars = this.renderStars.bind(this);
        this.onMouseLeave_ = this.onMouseLeave_.bind(this);
        this.onClick_ = this.onClick_.bind(this);
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            Session.set('customerRate', 0);
            let reset = Session.get('reset');
            if (reset) {
                Session.set('customerRate', 0);
                this.setState({
                    id: '',
                    star: ['', '', ''],
                    rate: 0,
                    rateClicked: 0,
                    clicked: false,
                    animation: ''
                });
            }
            let count = 0;
            this.setState(
                {
                    id: this.props.id || ''
                },
                () => {
                    if (this.state.id) {
                        count = WorkData.find({ _id: this.state.id }).fetch()[0].customerRate || 0;
                    }
                    this.setState({
                        rate: count,
                        rateClicked: count
                    });
                }
            );
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    mouseEnter_(index) {
        this.setState({
            rate: index + 1
        });
    }

    onMouseLeave_() {
        if (!this.state.clicked && this.state.rateClicked === 0) {
            this.setState({
                rate: 0
            });
        } else {
            this.setState({
                rate: this.state.rateClicked,
                clicked: false
            });
        }
    }

    onClick_() {
        this.setState(
            {
                rateClicked: this.state.rate,
                clicked: true
            },
            () => {
                Session.set('customerRate', this.state.rateClicked);
                if (this.state.id) {
                    let job = WorkData.find(this.state.id).fetch()[0];
                    Meteor.call('rate', this.state.id, this.state.rateClicked, job.customerRate || 0, err => {
                        if (err) {
                            console.error(err);
                        } else {
                            swal({
                                title: 'Success!',
                                text: `Job #${job.jobNumber} Rate Changed Successfully`,
                                icon: 'success',
                                button: 'OK'
                            });
                        }
                    });
                }
            }
        );
    }

    renderStars() {
        return this.state.star.map((star, index) => {
            return (
                <i
                    style={{
                        color: this.state.color[this.state.rate === 0 ? this.state.rateClicked - 1 : this.state.rate - 1]
                    }}
                    onMouseEnter={() => this.mouseEnter_(index)}
                    onClick={this.onClick_}
                    onMouseLeave={this.onMouseLeave_}
                    key={index + 'rank'}
                    className={index < this.state.rate ? 'material-icons animated pulse' : 'material-icons grey-text'}>
                    star
                </i>
            );
        });
    }
    render() {
        return (
            <div className={this.state.id !== '' ? 'customer-rate-main' : ''}>
                <label className={this.state.id === '' ? 'active' : 'hide'} htmlFor="quote-job-number">
                    Customer Priority
                </label>
                <div className={this.state.id === '' ? 'customer-rate' : 'customer-rate-follow'}>{this.renderStars()}</div>
            </div>
        );
    }
}

CustomerPriority.proptypes = {
    rate: PropTypes.number,
    id: PropTypes.string
};
