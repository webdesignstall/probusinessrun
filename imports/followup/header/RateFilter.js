import { Session } from 'meteor/session';
import React, { useContext } from 'react';
import MainContext from '../Context';
import './rateFilter.styl';

const RateFilter = () => {
	const { rate, setRate } = useContext(MainContext);

	const changeHandler = e => {
		let rate_ = Number(e.target.value);
		Session.set('customerRate_', rate);
		setRate(rate_);
	};

	return (
		<div className="rate_filter">
			<select
				onChange={e => changeHandler(e)}
				className="browser-default"
				name="customer_rate_filter"
				id="custoer_rate_filter"
				value={rate}
			>
				<option value="0">Customer Priority (default)</option>
				<option value="2">⭐⭐</option>
				<option value="3">⭐⭐⭐</option>
			</select>
		</div>
	);
};

export default RateFilter;
