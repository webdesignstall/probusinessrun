import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*global moment*/

export default class AdditionalChargesRender extends Component {
    constructor(props) {
        super(props);

        this.renderList = this.renderList.bind(this);
    }

    showContent(id) {
        document.getElementById(id) && document.getElementById(id).classList.contains('hide')
            ? document.getElementById(id).classList.remove('hide')
            : document.getElementById(id).classList.add('hide');
    }

    renderList() {
        return this.props.list.map(charge => {
            let spesificId = Math.random().toString();
            return (
                <div
                    onClick={() => this.showContent(spesificId)}
                    key={Math.random()}
                    className="collection-item row need_collapse"
                    style={{ cursor: 'pointer' }}
                >
                    <span className="col s10 m10 l10">${charge.amount}</span>
                    <span className="col s2 m2 l2 blue darken-1 white-text center-align">
                        {moment(charge.date).format('hh:mm a')}
                    </span>
                    <div id={spesificId} className="hide need_collapse">
                        <div className="clear margin-top"></div>
                        <div className="col s12 m12 l12">
                            <div className="col s12 m6 l6">
                                <p>{charge.reason}</p>
                            </div>
                            <div
                                className="col s12 m6 l6"
                                style={{
                                    position: 'relative',
                                    width: '400px',
                                    height: '200px'
                                }}
                            >
                                <img
                                    src={charge.signature}
                                    alt="Customer sign"
                                    style={{ width: '400px', height: 'auto', zIndex: '1' }}
                                />
                            </div>
                        </div>
                        <div className="col s12 m3 l3">
                            <input type="text" value={charge.fullname} disabled className="black-text" />
                            <input
                                type="text"
                                value={moment(charge.date).format('MM/DD/YYYY hh:mm a')}
                                disabled
                                className="black-text"
                            />
                        </div>
                    </div>
                </div>
            );
        });
    }

    render() {
        return (
            <div className={this.props.list.length > 0 ? 'cadr___ collection' : 'hide'}>
                <div className="collection-item purple lighten-2 white-text">ADDED ADDITIONAL CHARGES</div>
                {this.renderList()}
            </div>
        );
    }
}

AdditionalChargesRender.propTypes = {
    list: PropTypes.array
};
