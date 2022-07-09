import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CardHolderSign extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="col s12 m6 l6 offset-m3 offset-l3">
				<p>Cardholder – Please Sign and Date</p>
				<div className="input-field col s12 m6 l6">
					<input
						placeholder="print name"
						id="cardholder_name"
						type="text"
						className="validate"
						value={this.props.obj.typedFirstName}
						onChange={(e) => this.props.change('typedFirstName', e.target.value)}
					/>
					<label htmlFor="cardholder_name" className="active">
						Name <span className="red_star">*</span>
					</label>
				</div>
				<div className="input-field col s12 m6 l6">
					<input
						placeholder="print date"
						id="cardholder_date"
						type="text"
						className="validate"
						value={this.props.obj.typedDate}
						onChange={(e) => this.props.change('typedDate', e.target.value)}
					/>
					<label htmlFor="cardholder_date" className="active">
						Date <span className="red_star">*</span>
					</label>
				</div>
			</div>
		);
	}
}

CardHolderSign.propTypes = {
	change: PropTypes.func,
	obj: PropTypes.object,
};

export default CardHolderSign;
