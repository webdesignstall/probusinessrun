import React, { Component } from 'react';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

/*global $, moment*/

export default class DateSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: '',
            endDate: ''
        };
    }

    componentDidMount() {
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
                                Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
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
                            let startDate_ = new Date(start);
                            let endDate_ = new Date(end);
                            Session.set('startDate', startDate_);
                            Session.set('endDate', endDate_);
                            // this.setState({
                            //     startDate: start.format('YYYY-MM-DD'),
                            //     endDate: end.format('YYYY-MM-DD')
                            // });
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
