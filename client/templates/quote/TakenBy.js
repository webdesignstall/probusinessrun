import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Meteor } from 'meteor/meteor';

export default class TakenBy extends TrackerReact(Component) {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,
            usersList: []
        };

        this.selectRef = React.createRef();
        this.changeDefValue = this.changeDefValue.bind(this);
    }

    fetchUsers(id) {
        let users = [];
        users = id ? Meteor.users.find({ '_id': id }).fetch() : Meteor.users.find({ 'profile.rank': 'officeEmployee' }).fetch();
        return users;
    }

    componentDidMount() {
        this.setState({
            usersList: this.fetchUsers(this.props.id)
        });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            usersList: this.fetchUsers(nextProps.id),
            id: nextProps.id
        });

    }

    changeDefValue() {
        this.selectRef.current.value = this.state.id;
    }

    componentDidUpdate() {
        this.state.id ? this.changeDefValue() : '';
    }

    renderList() {
        return (this.state.usersList.map((user) => {
            return (<option key={user._id + 'option'} value={user._id}>{user.profile.firstName} {user.profile.lastName}</option>);
        }));
    }

    render() {
        return (
            <select id="takenBy--value" ref={this.selectRef} disabled={this.state.id ? true : false} defaultValue="_" className="browser-default" >
                <option value="_" disabled>Taken by</option>
                {this.renderList()}
            </select>
        );
    }
}
