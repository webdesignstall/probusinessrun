// chart.js
import 'chartjs-plugin-labels';
// react
import PropTypes from 'prop-types';
import React, { useEffect, useLayoutEffect } from 'react';

export default ChartComp = ({ title, label, labels, data, backgroundColor, datasets }) => {
	// const [title, setTitle] = useState('No Title');
	// const [label, setLabel] = useState('No Label');
	// const [labels, setLabels] = useState(['No Label']);
	// const [data, setData] = useState([100]);
	// const [backgroundColor, setBackgroundColor] = useState(['#1abc9c', '#2ecc71']);
	// const [datasets, setDatasets] = useState([{ label, backgroundColor, data }]);
	const [chart, setChart] = useState(null);

	// datasetsModified[0].backgroundColor = colors || [
	// 	'#1abc9c',
	// 	'#2ecc71',
	// 	'#3498db',
	// 	'#9b59b6',
	// 	'#34495e',
	// 	'#16a085'
	// ];

	useLayoutEffect(() => {
		// chceck props for undefined
		// set data to chart
		// let chartLocal = chart
		// this.chart.options.title.text = title;
		// this.chart.data = { labels, datasetsModified };
		// this.chart.update();
		console.log(chart);

		// let datasetsModified = datasets;
		// datasetsModified[0].data = data || [2478, 5267, 734, 784, 433];
		// datasetsModified[0].label = label || 'Population (millions)';
		// datasetsModified[0].backgroundColor = colors || [
		// 	'#1abc9c',
		// 	'#2ecc71',
		// 	'#3498db',
		// 	'#9b59b6',
		// 	'#34495e',
		// 	'#16a085'
		// ];
		// this.setState(
		// 	() => {
		// 		return {
		// 			title: title || 'Chart',
		// 			labels: labels || [
		// 				'Africa',
		// 				'Asia',
		// 				'Europe',
		// 				'Latin America',
		// 				'North America'
		// 			],
		// 			datasets: datasetsModified
		// 		};
		// 	},
		// 	() => {
		// 		let labels = this.state.labels;
		// 		let title = this.state.title;
		// this.chart.options.title.text = title;
		// this.chart.data = { labels, datasetsModified };
		// this.chart.update();
		// 	}
		// );
	}, [title, label, labels, data, backgroundColor, datasets]);

	// component did mount
	useEffect(() => {}, []);

	// componentDidMount() {
	//     const { data, title, labels, label, colors } = this.props;
	//     let datasets = this.state.datasets;
	//     datasets[0].data = data || [2478, 5267, 734, 784, 433];
	//     datasets[0].label = label || 'Population (millions)';
	//     datasets[0].backgroundColor = colors || ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e', '#16a085'];
	//     this.setState(() => {
	//         return {
	//             title: title || 'Chart',
	//             labels: labels || ['Africa', 'Asia', 'Europe', 'Latin America', 'North America'],
	//             datasets
	//         };
	//     });

	//     Chart.defaults.global.defaultFontFamily = 'Roboto';
	//     Chart.defaults.global.defaultFontSize = 16;

	//     const datasets_ = this.state.datasets;
	//     const labels_ = this.state.labels;
	//     const title_ = this.state.title;

	//     this.chart = new Chart(this.canvas.current, {
	//         type: 'pie',
	//         data: {
	//             labels: labels_,
	//             datasets: datasets_
	//         },
	//         options: {
	//             legend: {
	//                 display: false
	//             },
	//             title: {
	//                 display: true,
	//                 text: title_
	//             },
	//             tooltips: {
	//                 callbacks: {
	//                     label: function(tooltipItem, data) {
	//                         var dataset = data.datasets[tooltipItem.datasetIndex];
	//                         var meta = dataset._meta[Object.keys(dataset._meta)[0]];
	//                         var total = meta.total;
	//                         var currentValue = dataset.data[tooltipItem.index];
	//                         var percentage = parseFloat(((currentValue / total) * 100).toFixed(1));
	//                         return currentValue + ' (' + percentage + '%)';
	//                     },
	//                     title: function(tooltipItem, data) {
	//                         return data.labels[tooltipItem[0].index];
	//                     }
	//                 }
	//             },
	//             responsive: false,
	//             plugins: {
	//                 labels: {
	//                     render: 'label',
	//                     textShadow: true,
	//                     position: 'border',
	//                     fontColor: '#fff',
	//                     shadowColor: '#000'
	//                 }
	//             }
	//         }
	//     });
	// }

	const listOfData = () => {
		const { data } = this.state.datasets[0];
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

		return this.state.labels.map((label, index) => {
			return (
				<React.Fragment key={'chart_list' + index}>
					<div className="chart_list_render">
						<span className="chart_list_label">{label}</span>{' '}
						<span className="chart_list_value value">{data[index]}</span>{' '}
						<span className="chart_list_value percent">{percentageData[index]}%</span>
					</div>
					<br />
				</React.Fragment>
			);
		});
	};

	return (
		<div className="statistic__graph_list">
			<canvas
				className="statistic__chart"
				ref={this.canvas}
				id="myChart"
				width="400"
				height="400"
			/>
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
