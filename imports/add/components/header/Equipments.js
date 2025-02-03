import React, { Component } from 'react';

export default class Equipments extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="add-header--menu">
				<a
					href="#"
					onClick={() => {
						debugger;

						this.props.setSubMenu(['trucks']);
					}}
					className="waves-effect waves-light btn"
				>
					Equipments
				</a>
			</div>
		);
	}
}
