import React from 'react';

/*global moment*/

export default class AddedDiscountRender extends React.Component {
    constructor(props) {
        super(props);
    }

    showContent(id) {
        document.getElementById(id) && document.getElementById(id).classList.contains('hide')
            ? document.getElementById(id).classList.remove('hide')
            : document.getElementById(id).classList.add('hide');
    }

    renderDiscountList() {
        return this.props.listOfDiscounts && this.props.listOfDiscounts.length > 0
            ? this.props.listOfDiscounts.map(discount => {
                let spesificId = Math.random();
                return (
                    <div key={Math.random()} onClick={() => this.showContent(spesificId)} className="collection-item row">
                        <span className="col s10 m10 l10">
                            {discount.amount}
                            {discount.type === 'amount'
                                ? '$'
                                : discount.type === 'time'
                                    ? 'minutes'
                                    : discount.type === 'percent'
                                        ? '%'
                                        : 'Not valid discount type'}
                        </span>
                        <span className="col s2 m2 l2 blue white-text center-align">
                            {moment(discount.date).format('hh:mm')}
                        </span>
                        <div id={spesificId} className="hide need_collapse">
                            <div className="clear margin-top"></div>
                            {/* reason */}
                            <div className="col s12 m12 l12">
                                <div className="col s12 m6 l6">
                                    <p>{discount.note}</p>
                                </div>

                                <div
                                    className="col s12 m6 l6"
                                    style={{
                                        position: 'relative',
                                        width: '400px',
                                        height: '200px'
                                    }}
                                >
                                    {/* sign */}
                                    <img
                                        src={discount.signature}
                                        alt="Customer sign"
                                        style={{ width: '400px', height: 'auto', zIndex: '1' }}
                                    />
                                </div>
                            </div>
                            <div className="col s12 m12 l12">
                                {/* full name */}
                                <input type="text" value={discount.fullname} disabled className="black-text col s12 m6 l6" />
                                {/* time stamp */}
                                <input
                                    type="text"
                                    value={moment(discount.date).format('MM/DD/YYYY hh:mm a')}
                                    disabled
                                    className="black-text col s12 m6 l6"
                                />
                            </div>
                        </div>
                    </div>
                );
            })
            : '';
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
