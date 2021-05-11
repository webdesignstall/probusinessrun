/*global moment*/
// npm packages
import randomcolor from 'randomcolor';
import React, { useContext, useEffect } from 'react';
// helpers
import companies from '../helpers/companyInfos.json';
// components
import './chart.styl';
import ChartComp from './ChartComp';
import ChartMenu from './ChartMenu';
import StatisticContext from './StatisticContext';

companies = companies.companies;

function Statistic() {
	const { status, setStatus, dateRange, employee, company, data, setData } = useContext(
		StatisticContext
	);

	useEffect(() => {
		console.log('Statistic use effect');
		// find wich month cover the daterange
		const firstMonth = moment(dateRange[0]);
		const secondMonth = moment(dateRange[1]);
		let monthList = [];

		// check are months same
		if (firstMonth.month() === secondMonth.month()) {
			monthList.push(firstMonth.toISOString()); // push month name to the monthlist
		} else {
			let startMonth = moment(firstMonth);

			while (startMonth.month() <= secondMonth.month()) {
				monthList.push(startMonth.toISOString());
				startMonth = startMonth.add(1, 'month');
			}
		}

		// get data based on data range status company and employee
		Meteor.call(
			'statisticDataFetch',
			Meteor.userId(),
			dateRange,
			company,
			status,
			employee,
			monthList,
			(err, res) => {
				console.log(`🚀 ~ file: Statistic.js ~ line 49 ~ useEffect ~ res`, res);
				setData(res);
			}
		);
	}, [dateRange, status, employee, company]);

	useEffect(() => {}, [data]);

	const sortResult = data => {
		let sortable = [];
		for (let item in data) {
			// filter 0 value keys
			if (data[item] > 0) {
				sortable.push([item, data[item]]);
			}
		}

		sortable.sort(function(a, b) {
			return b[1] - a[1];
		});

		return sortable; // return sorted array version
	};

	const renderCahrts = () => {
		const locationsLabel = companies.map((locationInfo, index) => {
			return locationInfo.name;
		});
		let companyData = { ...data.companiesResult };
		let locationsList = [];
		let locationsData = [];
		let sortedCompanyResult = sortResult(companyData);
		let employeeList = [];
		let employeeData = [];
		let sortedEmployeeResult = sortResult(data.employeeResults);
		let statusList = [];
		let statusData = [];
		let sortedStatusResult = sortResult(data.statusResult);
		let monthList = [];
		let monthData = [];
		let sortedMonthResult = sortResult(data.monthResult);

		// parse company results
		sortedCompanyResult.map((result, index) => {
			locationsList.push(result[0]);
			locationsData.push(result[1]);
		});

		// parse employee results
		sortedEmployeeResult.map((result, index) => {
			employeeList.push(result[0]);
			employeeData.push(result[1]);
		});

		// parse status results
		sortedStatusResult.map((result, index) => {
			statusList.push(result[0]);
			statusData.push(result[1]);
		});

		// parse month results
		sortedMonthResult.map((result, index) => {
			monthList.push(moment(result[0]).format('MMMM YYYY'));
			monthData.push(result[1]);
		});

		return (
			<>
				<div className="row" style={{ height: '600px' }}>
					<div className="col s12 m4 l4 center-align" style={{ height: '600px' }}>
						<ChartComp
							title="Locations"
							labels={locationsList}
							backgroundColor={randomcolor({
								hue: 'random',
								count: locationsData.length,
								luminosity: 'light'
							})}
							data={locationsData}
							label="Locations"
						/>
					</div>
					<div className="col s12 m4 l4 center-align" style={{ height: '600px' }}>
						<ChartComp
							title="Employees"
							labels={employeeList}
							backgroundColor={randomcolor({
								hue: 'random',
								count: employeeData.length,
								luminosity: 'light'
							})}
							data={employeeData}
							label="Employees"
						/>
					</div>
					<div className="col s12 m4 l4 center-align" style={{ height: '600px' }}>
						<ChartComp
							title="Status"
							labels={statusList}
							backgroundColor={randomcolor({
								hue: 'random',
								count: statusData.length,
								luminosity: 'light'
							})}
							data={statusData}
							label="Status"
						/>
					</div>
				</div>
				<p></p>
				<div className="row" style={{ height: '600px' }}>
					<div
						className="col s12 m4 l4 center-align"
						style={{ height: '600px', marginTop: '30px' }}
					>
						<ChartComp
							title="Months"
							labels={monthList}
							backgroundColor={randomcolor({
								hue: 'random',
								count: monthData.length,
								luminosity: 'light'
							})}
							data={monthData}
							label="Months"
						/>
					</div>
				</div>
			</>
		);
	};

	return (
		<div>
			<div className="statistic">
				<div className="col s12 m12 l12">
					<ChartMenu />
				</div>
				{data && Object.keys(data).length > 0 ? renderCahrts() : null}
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
							label="Employees"
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
							label="Status"
						/>
					</div>
					<div className="col s12 m6 l6 center-align">
						<ChartComp
							title="Date"
							labels={date.labels}
							colors={date.colors}
							data={date.data}
							label="Date"
						/>
					</div>
				</div> */}
			</div>
		</div>
	);
}

export default Statistic;
