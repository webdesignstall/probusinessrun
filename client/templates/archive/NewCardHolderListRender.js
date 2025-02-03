import React, { Component } from 'react';
import { Tracker } from 'meteor/tracker';
import WorkData from '../../../common/collections_2';
import { Meteor } from 'meteor/meteor';
import Button from '../quote/Button';

export default class NewCardHolderListRender extends Component {
    constructor(props) {
        super(props);

        this.state = {
            jobs: []
        };
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            Meteor.subscribe('dateSubscribe', new Date());
            let jobs = WorkData.find({ cardHolderInfo: { $exists: true } }).fetch();

            this.setState({
                jobs
            });
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    renderList() {
        return this.state.jobs.map((job, index) => {
            return (
                <div
                    className="col s6 m6 l6 newCardHolderListElement"
                    key={'newCardHolderListRender' + index}
                    style={{
                        padding: '10px'
                    }}
                >
                    <div className="col s12 m8 l8">
                        Job Number: {job.jobNumber} <br />
                        Client: {job.clientFirstName} {job.clientLastName}
                    </div>
                    <div className="col s12 m3 l3">
                        <a href={job.cardHolderpdf} className={!job.cardHolderpdf ? 'btn disabled' : 'btn'}>
                            download
                        </a>
                    </div>
                </div>
            );
        });
    }

    render() {
        return <div className="newCardHolderListRender_main row ">{this.renderList()}</div>;
    }
}
