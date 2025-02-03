import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

export default class SmallItemPacking extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            this.timeOut = null;
            let value = Session.get('job_').smallItemPacking;
            if (value) {
                this.setState({
                    value
                });
            } else {
                this.setState({
                    value: ''
                });
            }
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    setSession(what, value) {
        let job = Session.get('job_');
        job[what] = value;
        Session.set('job_', job);
    }

    interval(what, value) {
        clearTimeout(this.timeOut);
        this.timeOut = setTimeout(() => this.setSession(what, value), 500);
    }

    onClick() {
        this.setState(
            prevState => {
                return prevState.value === -1 ? { value: '' } : { value: -1 };
            },
            () => {
                this.interval('smallItemPacking', Number(this.state.value) || '');
            }
        );
    }

    onChange(e) {
        let value = e.target.value;

        this.setState(
            {
                value
            },
            () => {
                this.interval('smallItemPacking', Number(this.state.value) || '');
            }
        );
    }

    render() {
        return (
            <div className="input-field valideyn">
                <i className="material-icons isare">view_array</i>
                <input
                    disabled={!!(this.state.value === -1)}
                    onChange={e => this.onChange(e)}
                    id="small_item_pack"
                    className="xx"
                    type="number"
                    placeholder="0"
                    value={this.state.value}
                />
                <label className="active" htmlFor="small_item_pack">
                    Small item packing
                    <i className="lime-text lighten-5 black">
                        [ Yes
                        <input
                            id="smallItemPackInit"
                            type="checkbox"
                            onChange={this.onClick}
                            checked={this.state.value && this.state.value === -1}
                        />
                        ]
                    </i>
                </label>
            </div>
        );
    }
}
