/*global moment*/
// npm packages
import React, { useContext, useEffect } from 'react';
// helpers
import companies from '../helpers/companyInfos.json';
// components
import './chart.styl';
import ChartMenu from './ChartMenu';
import StatisticContext from './StatisticContext';

companies = companies.companies;

function Statistic() {
	const { status, setStatus, dateRange, employee, company } = useContext(StatisticContext);

	useEffect(() => {
		console.log(`🚀 ~ file: Statistic.js ~ line 21 ~ Meteor.call ~ employee`, employee);
		console.log(`🚀 ~ file: Statistic.js ~ line 21 ~ Meteor.call ~ status`, status);
		console.log(`🚀 ~ file: Statistic.js ~ line 21 ~ Meteor.call ~ company`, company);
		console.log(`🚀 ~ file: Statistic.js ~ line 21 ~ Meteor.call ~ dateRange`, dateRange);
		// get data based on data range status company and employee
		Meteor.call('statisticDataFetch', dateRange, company, status, employee, (err, res) => {
			console.log(res);
		});
	}, [dateRange, status, employee, company]);

	return (
		<div>
			<div className="statistic">
				<div className="col s12 m12 l12">
					<ChartMenu />
				</div>
				{/* <div className="row">
					<div className="col s12 m6 l6 center-align">
						<ChartComp
							title="Locations"
							labels={locations.labels}
							colors={locations.colors}
							data={locations.data}
							label="Locations"
						/>
					</div>
					<div className="col s12 m6 l6 center-align">
						<ChartComp
							title="Employees"
							labels={employees.labels}
							colors={employees.colors}
							data={employees.data}
							label="Locations"
						/>
					</div>
				</div>
				<div className="row">
					<div className="col s12 m6 l6 center-align">
						<ChartComp
							title="Status"
							labels={status.labels}
							colors={status.colors}
							data={status.data}
							label="Locations"
						/>
					</div>
					<div className="col s12 m6 l6 center-align">
						<ChartComp
							title="Date"
							labels={date.labels}
							colors={date.colors}
							data={date.data}
							label="Locations"
						/>
					</div>
				</div> */}
			</div>
		</div>
	);
}

export default Statistic;
