import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';
import PropTypes from 'prop-types';
import swal from 'sweetalert';

export default class CustomerPriority extends Component {
	constructor(props) {
		super(props);
		// noinspection JSValidateTypes
		this.state = {
			id: '',
			jobId: '',
			star: ['', '', ''],
			rate: 0,
			rateClicked: 0,
			color: ['#F3E598', '#F2DD73', '#F8D552'],
			clicked: false,
			animation: ''
		};

		this.renderStars = this.renderStars.bind(this);
		this.onMouseLeave_ = this.onMouseLeave_.bind(this);
		this.onClick_ = this.onClick_.bind(this);
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.setState({
			id: nextProps.id,
			rate: nextProps.rate,
			rateClicked: nextProps.rate
		});
	}

	componentDidMount() {
		this.x = Tracker.autorun(() => {
			let job = Session.get('job_');
			// eslint-disable-next-line react/prop-types
			if (this.props.id || (job.customerRate && !isNaN(job.customerRate))) {
				this.setState({
					id: this.props.id,
					rate: this.props.rate || job.customerRate,
					// eslint-disable-next-line react/prop-types
					rateClicked: this.props.rate || job.customerRate || 0
				});
			} else {
				this.setState({
					star: ['', '', ''],
					rate: 0,
					rateClicked: 0,
					clicked: false,
					animation: ''
				});
			}
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
				let job = Session.get('job_');
				job.customerRate = this.state.rateClicked;
				Session.set('job_', job);
				if (this.state.id) {
					Meteor.call('rate', this.state.id, this.state.rateClicked, err => {
						if (err) {
							console.error(err);
						} else {
							swal({
								title: 'Success!',
								text: 'Job Rate Changed Successfully',
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
						color: this.state.color[
							this.state.rate === 0 ? this.state.rateClicked - 1 : this.state.rate - 1
						]
					}}
					onMouseEnter={() => this.mouseEnter_(index)}
					onClick={this.onClick_}
					onMouseLeave={this.onMouseLeave_}
					key={index + 'rank'}
					className={
						index < this.state.rate
							? 'material-icons animated pulse'
							: 'material-icons grey-text'
					}
				>
					star
				</i>
			);
		});
	}

	render() {
		return (
			<div className={this.props.id ? 'customer-rate-main' : ''}>
				<label className={this.props.id ? 'hide' : 'active'} htmlFor="quote-job-number">
					Customer Priority
				</label>
				<div
					className={
						!this.state.id || this.state.id === ''
							? 'customer-rate'
							: 'customer-rate-follow'
					}
				>
					{this.renderStars()}
				</div>
			</div>
		);
	}
}

CustomerPriority.proptypes = {
	rate: PropTypes.number,
	id: PropTypes.string
};
