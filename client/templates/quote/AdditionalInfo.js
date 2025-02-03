import React, { Component } from 'react';
import AdditionalInfoTemplates from './AdditionalInfoTemplates';
import AdditionalInfoValue from './AdditionalInfoValue';

export default class AdditionalInfo extends Component {
	render() {
		return (
			<div className="row additional_info">
				<div className="additional_info_header">Additional Info</div>
				<AdditionalInfoValue />
				<AdditionalInfoTemplates />
			</div>
		);
	}
}
