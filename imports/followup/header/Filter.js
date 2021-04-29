import React, { useState, useEffect, useContext } from 'react';
import './filter.css';
// import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Session } from 'meteor/session';

import MainContext from '../Context';

const Filter = () => {
	// static contextType = MainContext;

	// const [status, setStatus] = useState('inProgress');
	const { status, setStatus } = useContext(MainContext);

	useEffect(() => {
		status === status ? null : setStatus(status);
	}, []);

	useEffect(() => {
		if (status !== status) {
			setStatus(status);
			Session.set('status', status);
			if (status !== '') {
				Session.set('searchWords', '');
				Session.set('is', '');
				Session.set('ExtendedJobInformation', '');
			}
		}
	}, [status]);

	const filter = statusNew => {
		status === statusNew ? setStatus('') : setStatus(statusNew);
	};

	return (
		<div className="filter--main">
			<ul className="filter--list">
				<li
					className={status === '' || status === 'inProgress' ? 'sari_' : 'hide'}
					onClick={() => filter('inProgress')}
				>
					IN PROGRESS
				</li>
				<li
					className={status === '' || status === 'lost' ? 'qirmizi_' : 'hide'}
					onClick={() => filter('lost')}
				>
					LOST
				</li>
				<li
					className={status === '' || status === 'won' ? 'yasil_' : 'hide'}
					onClick={() => filter('won')}
				>
					WON
				</li>
				<li
					className={status === '' || status === 'cancelled' ? 'boz_' : 'hide'}
					onClick={() => filter('cancelled')}
				>
					CANCELLED
				</li>
			</ul>
		</div>
	);
};

export default Filter;
