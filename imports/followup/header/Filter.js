import React, { useState, useEffect, useContext } from 'react';
import './filter.css';
// import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Session } from 'meteor/session';

import MainContext from '../Context';

const Filter = () => {
	// static contextType = MainContext;

	const [clicked, setClicked] = useState('inProgress');
	const { status, setStatus } = useContext(MainContext);

	// constructor(props) {
	//     super(props);

	//     this.state = {
	//         clicked: 'inProgress'
	//     };

	//     filter = filter.bind(this);
	// }

	useEffect(() => {
		// let { status, setStatus } = MainContext;
		// this.status = status;
		// this.setStatus = setStatus;
		// this.setState({
		//     clicked: status
		// });

		clicked === status ? null : setClicked(status);
	}, []);

	// componentDidMount() {
	//     let { status, setStatus } = this.context;
	//     this.status = status;
	//     this.setStatus = setStatus;
	//     this.setState({
	//         clicked: status
	//     });
	// }
	useEffect(() => {
		// clicked === status ? null : setStatus(clicked);
		if (clicked !== status) {
			setStatus(clicked);
			Session.set('status', clicked);
			if (clicked !== '') {
				Session.set('searchWords', '');
				Session.set('is', '');
				Session.set('ExtendedJobInformation', '');
			}
		}
	}, [clicked]);

	const filter = statusNew => {
		clicked === statusNew ? setClicked('') : setClicked(statusNew);

		// this.setState(
		// 	prevState => {
		// 		return prevState.clicked === status ? { clicked: '' } : { clicked: status };
		// 	},
		// 	() => {
		// 		this.setStatus(status);
		// 		Session.set('status', status);
		// 		Session.set('searchWords', '');
		// 		Session.set('is', '');
		// 		Session.set('ExtendedJobInformation', '');
		// 		// Session.set('dataReady', false);
		// 	}
		// );
	};

	return (
		<div className="filter--main">
			<ul className="filter--list">
				<li
					className={clicked === '' || clicked === 'inProgress' ? 'sari_' : 'hide'}
					onClick={() => filter('inProgress')}
				>
					IN PROGRESS
				</li>
				<li
					className={clicked === '' || clicked === 'lost' ? 'qirmizi_' : 'hide'}
					onClick={() => filter('lost')}
				>
					LOST
				</li>
				<li
					className={clicked === '' || clicked === 'won' ? 'yasil_' : 'hide'}
					onClick={() => filter('won')}
				>
					WON
				</li>
				<li
					className={clicked === '' || clicked === 'cancelled' ? 'boz_' : 'hide'}
					onClick={() => filter('cancelled')}
				>
					CANCELLED
				</li>
			</ul>
		</div>
	);
};

export default Filter;
