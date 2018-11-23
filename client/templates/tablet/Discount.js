import React from 'react';

export default class Discount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            money: 0,
            time: 0,
            percentage: 0,
            selected: 'amount',
            valueOfSelected: 'Amount'
        }

        this.select = this.select.bind(this);
        this.changeAmountValue = this.changeAmountValue.bind(this);
    }

    select(name) {
        this.setState({
            selected: name
        })
    }

    changeAmountValue(e) {
        e.preventDefault();
        this.setState({
            valueOfSelected: e.target.value
        })

        this.props.hesabala;
    }

    render() {
        return (
            <div className="card__ discount row">
                <div className="cardTitle">
                    <span className="left-align col s6 m6 l6" ></span>
                    <span className={this.state.selected === 'amount' ? 'col s2 m2 l2 discountTypes activeDiscount' : 'col s2 m2 l2 discountTypes'} onClick={() => this.select('amount')}>$ Amount</span>
                    <span className={this.state.selected === 'percent' ? 'col s2 m2 l2 discountTypes activeDiscount' : 'col s2 m2 l2 discountTypes'} onClick={() => this.select('percent')}>% Percent</span>
                    <span className={this.state.selected === 'time' ? 'col s2 m2 l2 discountTypes activeDiscount' : 'col s2 m2 l2 discountTypes'} onClick={() => this.select('time')}>Time</span>
                    <div className="clear"></div>
                </div>
                <div className="secondContent">
                    <div className="amount">
                        <input id="valueOfAmount" type="number" placeholder={this.state.selected} value={this.state.valueOfSelected} onChange={this.changeAmountValue} />
                        <input type="text" placeholder="Promo Code" />
                        <div className="clear margin-top"></div>
                        <button className="btn">Ask Discount</button>
                        <div className="borderRight"></div>
                    </div>
                    <div className="notes">
                        <div className="cardTitle white left-align grey-text">Notes:</div>
                        <div className="noteTextArea">
                            <textarea name="" id="discountNote" cols="30" rows="10" className="card__" ></textarea>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
