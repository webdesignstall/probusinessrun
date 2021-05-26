import PropTypes from 'prop-types';
import React from 'react';
import { Pie } from 'react-chartjs-2';

export default ChartComp = ({ title, label, labels, data, backgroundColor }) => {
	const listOfData = () => {
		let percentageData = [];
		let percentCalculate = () => {
			let total = 0;
			data.map(data => {
				total += data;
			});
			data.map(data => {
				percentageData.push(((data / total) * 100).toFixed(1));
			});
		};

		percentCalculate();

		return labels.map((label, index) => {
			return (
				<React.Fragment key={'chart_list' + index}>
					<div className="chart_list_render">
						<span className="order" style={{ background: backgroundColor[index] }}>
							{index + 1}
						</span>
						<span className="chart_list_label">{label}</span>{' '}
						<div className="statisticInfo">
							<span className="chart_list_value value">{data[index]}</span>{' '}
							<span className="chart_list_value percent">
								{percentageData[index]}%
							</span>
						</div>
					</div>
					<br />
				</React.Fragment>
			);
		});
	};

	return (
		<div className="statistic__graph_list" style={{ height: '600px' }}>
			<div className="chart">
				<Pie
					data={{
						labels,
						datasets: [
							{
								label,
								data,
								backgroundColor,
								hoverOffset: 10
							}
						]
					}}
					height={300}
					width={300}
					options={{
						plugins: {
							legend: {
								display: false
							},
							title: {
								display: true
							}
						},
						responsive: false
					}}
				/>
			</div>

			<div className="result_header">
				Results for <span style={{ color: '#284157', fontWeight: '600' }}>{label}</span>
			</div>
			<div className="result-list">{listOfData()}</div>
		</div>
	);
};

ChartComp.propTypes = {
	data: PropTypes.array,
	title: PropTypes.string,
	labels: PropTypes.array,
	label: PropTypes.string,
	colors: PropTypes.array
};
