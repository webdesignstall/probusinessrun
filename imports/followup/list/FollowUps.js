import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import React, { Component } from 'react';
import WorkData from '../../../common/collections_2';
/*global moment*/
import './follow-ups.css';
import SendEmailFollowUp from './SendEmailFollowUp';

export default class FollowUps extends TrackerReact(Component) {
	constructor(props) {
		super(props);
		// let job = this.workData()[0];

		this.state = {
			followUp: [{ note: '' }],
			followUpOriginal: [{ note: '' }]
		};

		this.onChangeHandler = this.onChangeHandler.bind(this);
		this.updateFollowUp = this.updateFollowUp.bind(this);
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		let list = nextProps.followUpList || [];
		let job = this.props.job;
		job && job.followUp && job.followUp.length > 0 && list.length <= job.followUp.length
			? list.push({ note: '' })
			: list.length > 0
			? null
			: (list = [{ note: '' }]);

		this.setState({
			followUp: list,
			followUpOriginal:
				job && job.followUp && job.followUp.length > 0 ? job.followUp : [{ note: '' }]
		});
	}

	componentDidMount() {
		this.x = Tracker.autorun(() => {
			let job = this.props.job;
			this.setState({
				followUpOriginal:
					job && job.followUp && job.followUp.length > 0 ? job.followUp : [{ note: '' }]
			});
		});
	}

	componentWillUnmount() {
		this.x.stop();
	}

	workData() {
		return WorkData.find({ _id: this.state.job._id }).fetch();
	}

	onChangeHandler(e, index) {
		let followUp = this.state.followUp;
		followUp[index].note = e.target.value;
		this.setState(
			{
				followUp
			},
			err => {
				if (err) {
					console.error(err);
				} else {
					let followUp = this.state.followUp;
					let job = Session.get('job_');
					followUp[index].date = new Date();
					job.followUp = followUp;
					Session.set('job_', job);
				}
			}
		);
	}

	updateFollowUp(index) {
		let followUp = this.state.followUp;
		followUp[index].note = 'Follow up email was sent \n' + followUp[index].note;
		this.setState(
			{
				followUp
			},
			err => {
				if (err) {
					console.error(err);
				} else {
					let followUp = this.state.followUp;
					let job = Session.get('job_');
					followUp[index].date = new Date();
					job.followUp = followUp;
					Session.set('job_', job);
				}
			}
		);
	}

	renderList() {
		return this.state.followUp.map((note, index) => {
			return (
				<React.Fragment key={'followup_note_fragment' + index}>
					<div key={'followup_note' + index} className="col s12 m6 l6">
						<label className="active" htmlFor="followup_note_list_item">
							Follow Up #{index + 1}:{' '}
							<span style={{ color: '#4F4F4F', marginRight: '10px' }}>
								{note.date
									? moment(note.date).format('MM/DD/YYYY hh:mm a')
									: 'Date information is not aviable'}
							</span>
							{this.state.followUpOriginal &&
							index === this.state.followUpOriginal.length ? (
								<SendEmailFollowUp
									job={this.state.job || {}}
									id={index}
									update={this.updateFollowUp}
								/>
							) : this.state.followUp.length === 1 ? (
								<SendEmailFollowUp
									job={this.state.job || {}}
									id={index}
									update={this.updateFollowUp}
								/>
							) : (
								true
							)}
						</label>
						<textarea
							onChange={e => this.onChangeHandler(e, index)}
							disabled={
								this.state.followUpOriginal &&
								index === this.state.followUpOriginal.length
									? false
									: this.state.followUp.length === 1
									? false
									: true
							}
							style={{
								borderRadius: '5px',
								height: '130px',
								maxHeight: '130px',
								borderColor: '#9E9E9E',
								padding: '10px'
							}}
							value={note.note}
							id={'followup_note_list_item' + index}
						/>
					</div>
				</React.Fragment>
			);
		});
	}

	render() {
		return <React.Fragment>{this.renderList()}</React.Fragment>;
	}
}
