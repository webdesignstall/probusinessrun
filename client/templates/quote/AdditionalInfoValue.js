import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

export default class AdditionalInfoValue extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: []
		};
	}

	componentDidMount() {
		this.x = Tracker.autorun(() => {
			let job = Session.get('job_');
			this.setState({
				value: job.additionalInfo || []
			});
		});
	}

	componentWillUnmount() {
		this.x.stop();
	}

	setSession(value) {
		let job = Session.get('job_');
		job.additionalInfo = value;

		Session.set('job_', job);
	}

	delete(index) {
		let job = Session.get('job_');
		job.additionalInfo ? null : [];
		let arr = job.additionalInfo;
		arr.splice(index, 1);

		Session.set('job_', job);
	}

	renderList() {
		return (
			<ul>
				{this.state.value.map((info, index) => {
					return (
						<li
							key={index + 'addInfoVal'}
							style={{
								listStyleType: 'circle',
								cursor: 'pointer'
							}}
							onClick={() => this.delete(index)}
						>
							✓ {info}
						</li>
					);
				})}
			</ul>
		);
	}

	render() {
		return (
			<div
				style={{
					maxWidth: '50%',
					minWidth: '50%',
					minHeight: '100px',
					maxHeight: '100px',
					border: 'none',
					padding: '10px',
					outline: 'none',
					float: 'left',
					overflow: 'auto'
				}}
			>
				{this.renderList()}
			</div>
		);
	}
}
