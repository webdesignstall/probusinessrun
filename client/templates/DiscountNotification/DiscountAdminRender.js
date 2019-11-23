import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Discounts from '../../../common/discountData';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
/*global swal*/

export default class DiscountAdminRender extends TrackerReact(React.Component) {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            // Meteor.subscribe('Dicsounts');
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    discountsData() {
        return Discounts.find({}, { sort: { createdAt: -1 } }).fetch();
    }

    deny(discount) {
        let doc = {
            amount: discount.amount,
            note: discount.note,
            type: discount.type,
            confirmed: false,
            truckNumber: discount.truckNumber,
            responded: true
        };

        Meteor.call('updateDiscount', doc, discount._id);
    }

    accept(discount) {
        let doc = {
            amount: discount.amount,
            note: discount.note,
            type: discount.type,
            confirmed: true,
            truckNumber: discount.truckNumber,
            responded: true
        };

        Meteor.call('updateDiscount', doc, discount._id, err => {
            if (err) {
                console.error(err);
            } else {
                swal({
                    title: 'Success',
                    text: 'Discount accepted',
                    icon: 'success'
                });
            }
        });
    }

    renderList() {
        return this.discountsData().map(discount => {
            return (
                <div
                    key={Math.random()}
                    className="cardBorder col s12 m12 l12"
                    style={{ backgroundColor: '#ecf0f1' }}
                >
                    <div
                        id={discount._id + 'deny'}
                        className={
                            discount.responded && !discount.confirmed
                                ? 'z2 transparentRed center-align'
                                : 'hide'
                        }
                    />
                    <div
                        id={discount._id + 'accept'}
                        className={
                            discount.responded && discount.confirmed
                                ? 'z2 transparentGreen center-align'
                                : 'hide'
                        }
                    />
                    <div className="col s5 m5 l5 cardBorder noPadding">
                        <div className="padding5 click col s6 m6 l6 center-align saqiBorder">
                            Truck# {discount.truckNumber}
                        </div>
                        <div className="padding5 click col s6 m6 l6 center-align ">
                            {discount.amount}
                            {discount.type === 'amount'
                                ? '$'
                                : discount.type === 'time'
                                    ? 'minutes'
                                    : discount.type === 'percent'
                                        ? '%'
                                        : 'Not valid discount type'}
                        </div>
                    </div>
                    <div className="col s3 m3 l3" />
                    <div className="col s4 m4 l4 cardBorder noPadding">
                        <div
                            className=" click col s6 m6 l6 center-align white-text"
                            style={{ backgroundColor: '#e74c3c' }}
                            onClick={() => this.deny(discount)}
                        >
                            <i className="material-icons padding5z">cancel</i>
                        </div>
                        <div
                            className=" click  col s6 m6 l6 center-align white-text"
                            style={{ backgroundColor: '#1abc9c' }}
                            onClick={() => this.accept(discount)}
                        >
                            <i className="material-icons padding5z">check_circle</i>
                        </div>
                    </div>
                    <div className="clear" />
                    {discount.note ? (
                        <div className="cardBorder col s12 m12 l12">{discount.note}</div>
                    ) : null}
                </div>
            );
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col s12 m12 l12">{this.renderList()}</div>
            </div>
        );
    }
}
