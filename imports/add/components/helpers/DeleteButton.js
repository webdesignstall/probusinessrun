import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export default class DeleteEmployee extends Component {
    constructor(props) {
        super(props);

        this.delete = this.delete.bind(this);
    }

    delete() {
        confirm('Are you sure ')
            ? Meteor.call('removeUser', this.props.id)
            : null;
    }

    render() {
        return (
            <a onClick={this.delete} href="#">
                <i className="material-icons sag delete-duymesi animated">delete_forever</i>
            </a>
        );
    }
}
