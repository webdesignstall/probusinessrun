import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import DeleteButton from './DeleteButton';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Tracker } from 'meteor/tracker';
import MoverForm from '../mover/MoverForm';
import TruckForm from '../mover/TruckForm';

export default class ListRender extends TrackerReact(Component) {
    constructor(props) {
        super(props);

        this.state = {
            rank: this.props.rank,
            list: [],
            displayInfo: false
        };

        this.renderList = this.renderList.bind(this);
    }

    getlistFromDatabase() {
        this.x = Tracker.autorun(() => {
            const data = Meteor.users
                .find({
                    'profile.rank': this.state.rank
                })
                .fetch();

            this.setState({
                list: data
            });
        });

        this.displayItemInfo = this.displayItemInfo.bind(this);
    }

    componentDidMount() {
        this.getlistFromDatabase();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState(
            {
                rank: nextProps.rank,
                displayInfo: false
            },
            () => this.getlistFromDatabase()
        );
    }

    displayItemInfo(whatToShow) {
        this.setState(prevState => {
            return prevState.displayInfo === whatToShow ? { displayInfo: '' } : { displayInfo: whatToShow };
        });
    }

    renderList() {
        return this.state.list.map((list, index) => {
            return (
                <div key={index + 'mainDiv'}>
                    <div onClick={() => this.displayItemInfo(index + 'Show')} className="card__ employee--info">
                        {list.profile.firstName} {list.profile.lastName}&nbsp;
                        <span
                            className={
                                (list.profile.rank === 'mover' || list.profile.rank === 'officeEmployee') &&
                                list.profile.phoneNumber !== '' &&
                                list.profile.phoneNumber !== 0
                                    ? 'employee--phone-number'
                                    : 'hide'
                            }>
                            <i className="material-icons employee--phone-icon">phone</i>
                            {list.profile.phoneNumber}
                        </span>
                        <span
                            className={
                                list.profile.rank === 'tablet' && list.profile.lenght !== '' && list.profile.lenght !== 0
                                    ? 'employee--phone-number'
                                    : 'hide'
                            }>
                            <i className="material-icons employee--phone-icon">keyboard_tab</i>
                            {list.profile.lenght}
                        </span>
                        <DeleteButton id={list._id} />
                    </div>

                    <div className={this.state.displayInfo === index + 'Show' ? 'card__' : 'hide'}>
                        <div className="clear" />
                        {(this.state.displayInfo && this.state.rank === 'mover') || this.state.rank === 'officeEmployee' ? (
                            <MoverForm
                                hide={this.displayItemInfo}
                                rank={this.state.rank}
                                show={this.state.displayInfo}
                                id={list._id}
                            />
                        ) : (
                            <TruckForm
                                hide={this.displayItemInfo}
                                rank={this.state.rank}
                                show={this.state.displayInfo}
                                id={list._id}
                            />
                        )}
                    </div>
                </div>
            );
        });
    }

    render() {
        return <React.Fragment>{this.renderList()}</React.Fragment>;
    }
}
