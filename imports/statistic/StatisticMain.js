/*global moment*/
// npm packages
import { Template } from 'meteor/templating';
import React from 'react';
import ReactDOM from 'react-dom';
import Statistic from './Statistic';
// components
import { StatisticProvider } from './StatisticContext';

function StatisticMain() {
	return (
		<StatisticProvider>
			<Statistic />
		</StatisticProvider>
	);
}

Template.statistic.onRendered(() => {
	ReactDOM.render(<StatisticMain />, document.getElementById('statistic_app'));
});

Template.statistic.onDestroyed(() => {
	ReactDOM.unmountComponentAtNode(document.getElementById('statistic_app'));
});

export default StatisticMain;
