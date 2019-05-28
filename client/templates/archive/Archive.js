import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Template } from 'meteor/templating';

// importing style
import './archive.styl';

// importing components
import ArchiveHeader from './ArchiveHeader';
import ArchiveList from './ArchiveList';

Template.archive.onRendered(() => {
    ReactDOM.render(<Archive />, document.getElementById('archive'));
});
Template.archive.onDestroyed(() => {
    ReactDOM.unmountComponentAtNode(document.getElementById('archive'));
});

export default class Archive extends TrackerReact(Component) {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="archive-main">
                <ArchiveHeader />
                <ArchiveList />
            </div>
        );
    }
}
