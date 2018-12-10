import React from 'react';

export default class AddedDiscountRender extends React.Component {
    constructor(props) {
        super(props);
    }

    renderDiscountList() {
        return (this.props.listOfDiscounts && this.props.listOfDiscounts.length > 0 ?
            this.props.listOfDiscounts.map((discount) => {
                return (
                    <div key={Math.random()} className="collection-item row">
                        <span className="col s10 m10 l10">{moment(discount.date).format('hh:mm')}</span>
                        <span className="col s2 m2 l2 blue white-text center-align">
                            {discount.amount}
                            {
                                discount.type === 'amount' ? '$'
                                    : discount.type === 'time' ? 'minutes'
                                        : discount.type === 'percent' ? '%' : 'Not valid discount type'
                            }
                        </span>
                    </div>
                );
            }) : ''
        );
    }

    render() {
        return (
            <div className={this.props.listOfDiscounts && this.props.listOfDiscounts.length > 0 ? 'cadr___  collection' : 'hide'}>
                <div className="collection-item teal darken-1 white-text">ADDED DISCOUNTS</div>
                {this.renderDiscountList()}
            </div>
        );
    }
}
