import React, { useContext } from 'react';
import MainContext from './Context';
// components
import Header from './header/Header';
import DataFilter from './list/DataFilter';
import List from './list/List';
import ListInnerDisplay from './list/ListInnerDisplay';

function FollowUpMain() {
	const { displayExtendedJobInformation } = useContext(MainContext);

	return (
		<div style={{ position: 'relative' }}>
			<DataFilter />
			<Header />
			{displayExtendedJobInformation ? (
				<ListInnerDisplay job={displayExtendedJobInformation} />
			) : (
				<List />
			)}
		</div>
	);
}

export default FollowUpMain;
