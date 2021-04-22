import { Session } from 'meteor/session';
import React, { useEffect, useState } from 'react';

const AdditionalInfoValue = () => {
	const [value, setValue] = useState([]);
	const [job, setJob] = useState({});
	// const { additionalInfo, setAdditionalInfo } = useContext(MainContext);

	useEffect(() => {
		let jobSession = Session.get('job_');
		setJob(jobSession);
		// setAdditionalInfo(jobSession.additionalInfo);
		setValue(jobSession.additionalInfo);
	}, []);

	useEffect(() => {
		Session.set('job_', job);
	}, [job]);

	const deleteValue = index => {
		// let job = Session.get('job_');
		// job.additionalInfo ? null : [];
		let arr = [...value];
		arr.splice(index, 1);
		setValue(arr);
		let jobDb = { ...job };
		jobDb.additionalInfo = arr;
		setJob(jobDb);

		// setJob(job);
		// setAdditionalInfo(arr);
	};

	const renderList = () => {
		return (
			<ul>
				{value &&
					value.length > 0 &&
					value.map((info, index) => {
						return (
							<li
								key={index + 'addInfoVal'}
								style={{
									listStyleType: 'circle',
									cursor: 'pointer'
								}}
								onClick={() => deleteValue(index)}
							>
								✓ {info}
							</li>
						);
					})}
			</ul>
		);
	};

	return (
		<div
			style={{
				maxWidth: '50%',
				minWidth: '50%',
				minHeight: '100px',
				maxHeight: '100px',
				border: 'none',
				padding: '10px',
				outline: 'none',
				float: 'left',
				overflow: 'auto'
			}}
		>
			{renderList()}
		</div>
	);
};

export default AdditionalInfoValue;
