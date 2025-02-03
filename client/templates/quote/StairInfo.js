import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

export default class StairInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: '',
            stairs: ''
        };

        this.checkbox = this.checkbox.bind(this);
        this.selector = this.selector.bind(this);
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            let job = Session.get('job_');

            this.setState({
                checked: job.addressExt && job.addressExt[this.props.index] ? job.addressExt[this.props.index].checked : '',
                stairs: job.addressExt && job.addressExt[this.props.index] ? job.addressExt[this.props.index].stairs : ''
            });
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    checkbox(value) {
        this.setState(
            prevState => {
                return {
                    checked: prevState.checked === value ? '' : value
                };
            },
            () => {
                this.setSession();
            }
        );
    }
    setSession() {
        let job = Session.get('job_');
        job.addressExt ? null : (job.addressExt = [{ checked: '', stairs: '' }, { checked: '', stairs: '' }]);
        job.addressExt[this.props.index] = this.state;

        Session.set('job_', job);
    }

    selector(e) {
        let value = e.target.value;

        this.setState(
            {
                stairs: value
            },
            () => {
                this.setSession();
            }
        );
    }

    render() {
        return (
            <div className="stair-info">
                <ul>
                    <li>
                        <input
                            id="flat_checkbox"
                            onChange={() => this.checkbox('flat')}
                            type="checkbox"
                            checked={!!(this.state.checked === 'flat')}
                            style={{ fontSize: '20px' }}
                        />
                        Flat
                    </li>
                    <li>
                        <input
                            id="elevator_checkbox"
                            onChange={() => this.checkbox('elevator')}
                            type="checkbox"
                            checked={!!(this.state.checked === 'elevator')}
                            style={{ fontSize: '20px' }}
                        />
                        Elevator
                    </li>
                    <li>
                        <input
                            id="stairs_checkbox"
                            onChange={() => this.checkbox('stairs')}
                            type="checkbox"
                            checked={!!(this.state.checked === 'stairs')}
                            style={{ fontSize: '20px' }}
                        />
                        Stairs
                    </li>
                    <li>
                        <select
                            disabled={!(this.state.checked === 'stairs')}
                            style={{ display: this.state.checked === 'stairs' ? 'inline-block' : 'none', height: '22px' }}
                            onChange={e => this.selector(e)}
                            name="stairs_info"
                            id="stairs_info_select"
                            className="browser-default"
                            value={this.state.stairs}>
                            <option value="Up to 5 steps">Up to 5 steps</option>
                            <option value="Up to 10 steps">Up to 10 steps</option>
                            <option value="1 flight of stairs">1 flight of stairs</option>
                            <option value="2 flight of stairs">2 flights of stairs</option>
                            <option value="3 flight of stairs">3 flights of stairs</option>
                            <option value="4 flight of stairs">4 flights of stairs</option>
                            <option value="5 flight of stairs">5 flights of stairs</option>
                            <option value="More than 5 flights">More than 5 flights</option>
                        </select>
                    </li>
                </ul>
            </div>
        );
    }
}

StairInfo.propTypes = {
    checked: PropTypes.string,
    stairs: PropTypes.string,
    index: PropTypes.number
};
