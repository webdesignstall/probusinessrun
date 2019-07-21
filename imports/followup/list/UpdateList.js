import React, { Component } from 'react';

import './updateList.styl';

export default class UpdateList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: []
        };

        this.renderUpdates = this.renderUpdates.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            list: nextProps.updates
        });
    }

    renderUpdates() {
        return this.state.list.map((list, index) => {
            return (
                <li key={'updatesList' + index} className="collection-item">
                    {index}
                </li>
            );
        });
    }

    render() {
        return (
            <div className="row update_list_main">
                <div id="update_list" className="col s12 m12 l12 update_list">
                    <span id="update_list_header">updates</span>
                </div>
                <div className="col s12 m12 l12">
                    <ul className="collection">{this.renderUpdates()}</ul>
                </div>
            </div>
        );
    }
}
