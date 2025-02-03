import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';
import React, { Component } from 'react';
import StatisticContext from './StatisticContext';

/*global $, moment*/

export default class DateSelector extends Component {
	static contextType = StatisticContext;

	constructor(props) {
		super(props);
		this.state = {
			startDate: '',
			endDate: ''
		};
	}

	// componentDidUpdate() {
	// 	console.log(
	// 		`🚀 ~ file: DateSelector.js ~ line 21 ~ DateSelector ~ componentDidMount ~ dateRange`,
	// 		this.dateRange
	// 	);
	// }

	componentDidMount() {
		this.dateRange = this.context.dateRange;
		this.setDateRange = this.context.setDateRange;

		this.x = Tracker.autorun(() => {
			let startDate = Session.get('startDate');
			let endDate = Session.get('endDate');
			startDate = moment(startDate).format('MM/DD/YYYY');
			endDate = moment(endDate).format('MM/DD/YYYY');

			this.setState(
				{
					startDate,
					endDate
				},
				() => {
					$('#statitic__date_picker').daterangepicker(
						{
							autoApply: true,
							ranges: {
								Today: [moment(), moment()],
								Yesterday: [
									moment().subtract(1, 'days'),
									moment().subtract(1, 'days')
								],
								'Last 7 Days': [moment().subtract(6, 'days'), moment()],
								'Last 30 Days': [moment().subtract(29, 'days'), moment()],
								'This Month': [moment().startOf('month'), moment().endOf('month')],
								'Last Month': [
									moment()
										.subtract(1, 'month')
										.startOf('month'),
									moment()
										.subtract(1, 'month')
										.endOf('month')
								]
							},
							alwaysShowCalendars: true,
							startDate: startDate,
							endDate: endDate
						},
						(start, end, label) => {
							let range = [start.format('MM/DD/YYYY'), end.format('MM/DD/YYYY')];

							this.setDateRange(range);
							this.setState({
								startDate: start.format('MM/DD/YYYY'),
								endDate: end.format('MM/DD/YYYY')
							});
						}
					);
				}
			);
		});
	}

	onChangehandler() {}

	componentWillUnmount() {
		this.x.stop();
	}

	render() {
		const { startDate, endDate } = this.state;
		return (
			<React.Fragment>
				<input
					id="statitic__date_picker"
					onChange={this.onChangehandler}
					type="text"
					value={startDate + ' - ' + endDate}
				/>
			</React.Fragment>
		);
	}
}
