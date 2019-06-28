import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';

import './chart.styl';
import ChartComp from './ChartComp';

export default class Statistic extends Component {
    render() {
        return (
            <div className="statistic">
                <div className="col s12 m8 l8 center-align">
                    <ChartComp />
                </div>
                <div className="col s12 m4 l4">Hell</div>
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
