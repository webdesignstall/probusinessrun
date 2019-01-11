import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import DeleteButton from './DeleteButton';

export default class ListRender extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rank: this.props.rank,
            list: []
        };

        this.renderList = this.renderList.bind(this);
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            const list = Meteor.users.find({
                'profile.company': Meteor.userId(),
                'profile.rank': this.props.rank
            }).fetch();

            console.log(this.state.rank);

            this.setState({
                list
            });
        });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const list = Meteor.users.find({
            // 'profile.company': Meteor.userId(),
            'profile.rank': nextProps.rank
        }).fetch();
        console.log(nextProps.rank);

        this.setState({
            rank: nextProps.rank,
            list
        });
    }

    componentWillUnmount() {
        this.x.stop();
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
            <div>
                {this.renderList()}
            </div>
        );
    }
}
