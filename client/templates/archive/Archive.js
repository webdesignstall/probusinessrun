import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Template } from 'meteor/templating';

// importing style
import './archive.css';

// importing components
import ArchiveHeader from './ArchiveHeader';
import ArchiveList from './ArchiveList';

Template.archive.onRendered(() => {
    ReactDOM.render(<Archive />, document.getElementById('archive'));
});
Template.archive.onDestroyed(() => {
    ReactDOM.unmountComponentAtNode(document.getElementById('archive'));
});

class Archive extends TrackerReact(Component) {
    constructor(props) {
        super(props);
        this.state = {
            jobList: []
        };

        this.updateJobLit = this.updateJobLit.bind(this);
    }

    componentDidMount() {
        // Meteor.subscribe('workSchema');
    }

    updateJobLit(list) {
        this.setState({
            jobList: list
        });
    }

    render() {
        return (
            <div className="archive-main">
                <ArchiveHeader updateJobLit={this.updateJobLit} />
                <ArchiveList jobList={this.state.jobList} />
            </div>
        );
    }
}
