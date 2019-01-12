import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import DeleteButton from './DeleteButton';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Tracker } from 'meteor/tracker';
import FlipMove from 'react-flip-move';

export default class ListRender extends TrackerReact(Component) {
    constructor(props) {
        super(props);

        this.state = {
            rank: this.props.rank,
            list: []
        };

        this.renderList = this.renderList.bind(this);
    }

    getlistFromDatabase() {
        this.x = Tracker.autorun(() => {
            const data = Meteor.users.find({
                'profile.company': Meteor.userId(),
                'profile.rank': this.state.rank
            }).fetch();

            this.setState({
                list: data
            });
        });
    }

    componentDidMount() {
        this.getlistFromDatabase();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            rank: nextProps.rank,
        }, () => this.getlistFromDatabase());
    }

    renderList() {
        return (
            this.state.list.map((list, index) => {
                return (<div key={index + 'addList'} className="card__ employee--info">
                    {list.profile.firstName} {list.profile.lastName}&nbsp;
                    <span className="employee--phone-number">
                        <i className="material-icons employee--phone-icon">phone</i>
                        {list.profile.phoneNumber}
                    </span>
                    <DeleteButton id={list._id} />
                </div>);
            })
        );
    }

    render() {
        return (
            <FlipMove>
                {this.renderList()}
            </FlipMove>
        );
    }
}
