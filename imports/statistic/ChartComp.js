// react
// chart.js
// import Chart from 'chart.js';
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
				height={200}
				width={200}
				options={{
					plugins: {
						title: {
							display: true,
							text: title
						}
					},
					responsive: true
				}}
			/>
			<div className="result_header">Results</div>
			{listOfData()}
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
