import React, { useContext, useState } from 'react';
import MainContext from '../../../imports/followup/Context';

export default function AdditionalInfoTemplates() {
	const { additionalInfo, setAdditionalInfo } = useContext(MainContext);

	const [templates, setTemplates] = useState([
		'We have PRICE BEAT guaranteed. If you find any cheaper rate than us, go ahead and forward their official quote to us, then we will beat their price and send you updated quote. Terms and conditions applies.',
		'We can finance your move if you have difficulties to pay. Ask more from your sales representative.',
		'For any additional mover rate will be $30 more per hour.',
		'For 2 movers rate will be $30 less per hour.'
	]);

	function valueChange(value) {
		let addInfo = [...additionalInfo];
		addInfo.push(value);

		setAdditionalInfo(addInfo);
	}

	function renderList() {
		return templates.map((value, index) => {
			return (
				<React.Fragment key={index + 'additionalInfoTemplates'}>
					<ul onClick={() => valueChange(value)}>
						<p>✓ {value}</p>
					</ul>
				</React.Fragment>
			);
		});
	}

	return <div className="col s6 m6 l6 additional_info_template">{renderList()}</div>;
}
