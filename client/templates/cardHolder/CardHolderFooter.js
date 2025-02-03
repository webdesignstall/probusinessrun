import React from 'react';
import { Session } from 'meteor/session';

let CardHolderFooter = () => {
	let job = Session.get('job');
	return (
		<div className="col s12 m6 l6 offset-m3 offset-l3 cardholder_footer">
			<p>All information will remain confidential.</p>
			<p>
				{job.companyInfo.name} / {job.companyInfo.email} / {job.companyInfo.phoneNumber}
			</p>
		</div>
	);
};

export default CardHolderFooter;
