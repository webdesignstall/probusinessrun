import React, { Component } from 'react';
import Search from './Search';
import { Session } from 'meteor/session';
import Filter from './Filter';
import Sorting from './Sorting';
import RateFilter from './RateFilter';

export default class Header extends Component {
	render() {
		return (
			<div
				className="followup--header"
				style={{
					padding: '15px 10px',
					border: '1px solid #d2d2d2',
					borderRadius: '10px',
					marginTop: '10px',
					height: '52px'
				}}
			>
				<Filter />
				<RateFilter />
				<Sorting />
				{Session.get('ExtendedJobInformation') !== '' ? '' : <Search />}
			</div>
		);
	}
}
