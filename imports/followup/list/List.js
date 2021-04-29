// import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Session } from 'meteor/session';
import React, { useContext } from 'react';
import MainContext from '../Context';
import ListInnerDisplay from './ListInnerDisplay';

const List = () => {
	const { jobList, showLimit, setShowLimit } = useContext(MainContext);

	const renderList = () => {
		return jobList.map(jobMap => {
			if (Session.get('is') === jobMap._id || Session.get('is') === '') {
				return (
					<div key={jobMap._id + 'followUpList'} className="collection-item">
						<ListInnerDisplay job={jobMap} />
					</div>
				);
			}
		});
	};

	const increaseLimit = () => {
		setShowLimit(showLimit + 10);
	};

	return (
		<>
			<div className="collection">{renderList()}</div>
			<div className={jobList.length > 29 ? 'showMore' : 'hide'} onClick={increaseLimit}>
				show more
			</div>
		</>
	);
};

export default List;
