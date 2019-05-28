import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class ArchiveList extends TrackerReact(Component) {
    constructor(props) {
        super(props);
        this.state = {
            list: ['', '', '']
        };

        this.renderList = this.renderList.bind(this);
    }
    renderList() {
        return this.state.list.map((job, index) => {
            return (
                <li
                    key={'archiveList' + index}
                    className="collection-item archive-list-item">
                    Alvin
                </li>
            );
        });
    }

    render() {
        return <ul className="collection archive-list">{this.renderList()}</ul>;
    }
}
