import React, { Component } from 'react';
import Header from './header/Header';
import List from './list/List';
import { Session } from 'meteor/session';
import WorkData from '../../common/collections_2';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import LoadingOverlay from 'react-loading-overlay';
import RingLoader from 'react-spinners/RingLoader';
import ListInnerDisplay from './list/ListInnerDisplay';
import { MainProvider } from './Context';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import MainContext from './Context';

export default class FollowUpMain extends TrackerReact(Component) {
	static contextType = MainContext;

	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			dataReady: true,
			workDataInProgress: [],
			status: 'inProgress'
		};

		this.workDataInProgress = this.workDataInProgress.bind(this);
	}

	workDataInProgress() {
		return (
			WorkData.find({ status: 'inProgress' }, { limit: 30, sort: { _id: -1 } }).fetch() || []
		);
	}

	// UNSAFE_componentWillMount() {
	//     Session.set('loading', true);
	// }

	componentDidMount() {
		let { status, setStatus } = this.context;

		this.x = Tracker.autorun(() => {
			// Session.set('loading', true);
			Session.set('_', '');
			// let status = Session.get('status');

			this.setState({
				dataReady: false,
				status
			});

			Meteor.subscribe(
				'workSchema',
				{ status },
				{
					onReady: () => {
						this.buildComponent();
					}
				}
			);
		});
	}

	buildComponent() {
		this.setState(
			{
				dataReady: true
			},
			() => {
				let data = this.workDataInProgress();

				this.setState(
					{
						workDataInProgress: data
					},
					() => {
						Session.set('_', '_');
					}
				);

				let progressJobs = data;
				let sess = Session.get('_');
				let date = new Date().getTime();
				this.setState({
					loading: true
				});
				progressJobs.map(job => {
					let jobDateTime = new Date(job.workDate).getTime();
					if (jobDateTime + 86400000 < date) {
						job.status = 'lost';
						let finalNote_ = {
							reason: 'Time Expired',
							other: false
						};
						job.finalNote = finalNote_;

						job.ip = Session.get('ip');

						Meteor.call('updateWork', job, err => {
							err
								? console.error(
										'Error while trying to make lost some jobs. ' + err.reason
								  )
								: null;
						});
					}
				});
				this.setState(
					{
						loading: false
					},
					() => {
						Session.set('loading', false);
					}
				);
			}
		);
	}

	componentDidUpdate(prevProps, prevState) {}

	componentWillUnmount() {
		return this.x.stop();
	}

	render() {
		return (
			<LoadingOverlay
				text="Loading..."
				className="loader"
				active={Session.get('loading')}
				spinner={<RingLoader color={'#6DD4B8'} />}
			>
				<div className="followup-header">
					<Header />
					{/* <div
                        style={{
                            display: Session.get('ExtendedJobInformation') === '' ? 'block' : 'none'
                        }}
                    >
                        <List />
                    </div> */}
					{Session.get('ExtendedJobInformation') !== '' ? (
						<div
							key={Session.get('job_')._id + 'followUpList'}
							className="collection-item"
							style={{
								border: '1px solid #e0e0e0',
								borderRadius: '5px',
								marginTop: '10px',
								padding: '20px',
								backgroundColor: 'white'
							}}
						>
							<ListInnerDisplay
								loading={this.startStopLoading}
								job={Session.get('job_')}
							/>
						</div>
					) : (
						<List />
					)}
				</div>
			</LoadingOverlay>
		);
	}
}
