import { Session } from 'meteor/session';
import React, { useContext, useEffect, useState } from 'react';
import MainContext from '../../../imports/followup/Context';

const AdditionalInfoValue = () => {
	const [job, setJob] = useState({});
	const { additionalInfo, setAdditionalInfo } = useContext(MainContext);

	useEffect(() => {
		setJob(Session.get('job_') || []);
		setAdditionalInfo(Session.get('job_').additionalInfo || []);
	}, []);

	useEffect(() => {
		let arr = [...additionalInfo];
		let jobDb = { ...job };
		jobDb.additionalInfo = arr;
		jobDb.additionalInfo = additionalInfo;
		setSession(jobDb);
	}, [additionalInfo]);

	function setSession(jobChanged) {
		if (jobChanged._id) {
			Session.set('job_', jobChanged);
		}
	}

	const deleteValue = index => {
		let arr = [...additionalInfo];
		arr.splice(index, 1);

		setAdditionalInfo(arr);
	};

	const renderList = () => {
		return (
			<ul>
				{additionalInfo &&
					additionalInfo.length > 0 &&
					additionalInfo.map((info, index) => {
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
