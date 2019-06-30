import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';

import './chart.styl';
import ChartComp from './ChartComp';
import ChartMenu from './ChartMenu';

export default class Statistic extends Component {
    render() {
        return (
            <div className="statistic">
                <div className="col s12 m12 l12">
                    <ChartMenu />
                </div>
                <div className="col s12 m6 l6 center-align">
                    <ChartComp />
                </div>
                <div className="col s12 m6 l6 center-align">
                    <ChartComp />
                </div>
            </div>
        );
    }
}

Template.statistic.onRendered(() => {
    ReactDOM.render(<Statistic />, document.getElementById('statistic_app'));
});

Template.statistic.onDestroyed(() => {
    ReactDOM.unmountComponentAtNode(document.getElementById('statistic_app'));
});
