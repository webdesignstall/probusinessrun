import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';

export default class NumberOfUsers extends React.Component {
    constructor(props) {
        super(props);
        // noinspection JSValidateTypes
        this.state = {
            numberOfWorkers: 0,
            iscilerinSayi: []
        };

        this.saylari = this.saylari.bind(this);
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            let job = Session.get('job_');
            let movers = Meteor.users.find({ 'profile.rank': 'mover' }).fetch();

            job.numberOfWorkers
                ? this.setState({ numberOfWorkers: job.numberOfWorkers })
                : this.setState({
                    numberOfWorkers: 0,
                    iscilerinSayi: []
                });
            this.setState({
                iscilerinSayi: movers
            });
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    saylari() {
        let arr = [...this.state.iscilerinSayi];
        arr.push('Select movers');
        return arr.map((number, index) => {
            return (
                <option value={index} key={index + 'moverscount'} disabled={index === 0}>
                    {index === 0 ? 'Select movers' : index}
                </option>
            );
        });
    }

    changeValue(e) {
        let job = Session.get('job_');
        let value = Number(e.target.value);
        job.numberOfWorkers = value;

        this.setState(
            {
                numberOfWorkers: value
            },
            () => {
                Session.set('job_', job);
            }
        );
    }

    render() {
        return (
            <div id="number-of-movers" className="input-field valideyn azMargin">
                <div
                    className="number-of-users--main"
                    style={{
                        position: 'relative'
                    }}>
                    <select
                        id="iscinin-sayi"
                        className="browser-default"
                        name="number of movers"
                        value={this.state.numberOfWorkers}
                        onChange={e => this.changeValue(e)}>
                        {this.saylari()}
                    </select>
                    <label
                        className="active"
                        style={{
                            backgroundColor: 'rgb(237, 240, 241)',
                            padding: '0px 5px',
                            margin: ' -28px 15px',
                            top: '-15px',
                            left: '0',
                            position: 'absolute'
                        }}
                        htmlFor="iscinin-sayi">
                        # of movers
                    </label>
                </div>
            </div>
        );
    }
}
