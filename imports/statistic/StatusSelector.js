import React, { useContext } from 'react';
import StatisticContext from './StatisticContext';

export default StatusSelector = () => {
	const { status, setStatus } = useContext(StatisticContext);

	const changeStatus = e => {
		const value = e.target.value;

		setStatus(value);
	};

	return (
		<select
			onChange={e => changeStatus(e)}
			className="browser-default statistic__status_selector"
			value={status}
		>
			<option value="all">All Status</option>
			<option value="won">Won</option>
			<option value="lost">Lost</option>
			<option value="inProgress">In Progress</option>
			<option value="cancelled">Cancelled</option>
		</select>
	);
};
