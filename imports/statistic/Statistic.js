/*global moment*/
/* ------------------------------ NPM PACKAGES ------------------------------ */
import randomcolor from 'randomcolor';
import React, { useContext, useEffect } from 'react';
/* --------------------------------- HELPERS -------------------------------- */
import companies from '../helpers/companyInfos.json';
/* ------------------------------- COMPONENTS ------------------------------- */
import './chart.styl';
import ChartComp from './ChartComp';
import ChartMenu from './ChartMenu';
import StatisticContext from './StatisticContext';

companies = companies.companies;

function Statistic() {
	const { status, setStatus, dateRange, employee, company, data, setData } = useContext(
		StatisticContext
	);

	/* ------------- ON dateRange, status, employee, company UPDATE ------------- */

	useEffect(() => {
		// find which month cover the date range
		const firstMonth = moment(dateRange[0], 'MM/DD/YYYY');
		const secondMonth = moment(dateRange[1], 'MM/DD/YYYY');
		let monthList = [];

		// check are months same
		if (firstMonth.month() === secondMonth.month()) {
			monthList.push(firstMonth.toISOString()); // push month name to the monthList
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
				setData(res);
			}
		);
	}, [dateRange, status, employee, company]);

	/* ----------------------------- SORTING RESULTS ---------------------------- */

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

	/* ----------------------------- CHART RENDERING ---------------------------- */

	const renderCharts = () => {
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

	/* --------------------------------- RENDER --------------------------------- */

	return (
		<div>
			<div className="statistic">
				<div className="col s12 m12 l12">
					<ChartMenu />
				</div>
				{data && Object.keys(data).length > 0 ? renderCharts() : null}
			</div>
		</div>
	);
}

export default Statistic;
