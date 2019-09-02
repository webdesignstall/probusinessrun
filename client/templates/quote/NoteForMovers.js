import React, { Component } from 'react';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import WorkData from '../../../common/collections_2';

export default class NoteForMovers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noteForMovers: ''
        };
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            let _id = Session.get('is');
            if (_id) {
                let job = WorkData.findOne({ _id });

                this.setState({
                    noteForMovers: job.noteForMovers || ''
                });
            }
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    onChange(e) {
        let value = e.target.value;
        this.setState({
            noteForMovers: value
        });
    }

    render() {
        return (
            <React.Fragment>
                <textarea
                    onChange={e => this.onChange(e)}
                    value={this.state.noteForMovers}
                    style={{ height: '100px' }}
                    id="note_for_movers"
                    className="materialize-textarea"></textarea>
                <label className={this.state.noteForMovers === '' ? '' : 'active'} htmlFor="note_for_movers">
                    Note for Movers
                </label>
            </React.Fragment>
        );
    }
}
