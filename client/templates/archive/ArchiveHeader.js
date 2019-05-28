import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

// imports components
import ArchiveSearch from './ArchiveSearch';

export default class ArchiveHeader extends TrackerReact(Component) {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="archive-header">
                <span>Search in Archive</span>
                <ArchiveSearch />
                {/* display range component */}
            </div>
        );
    }
}
