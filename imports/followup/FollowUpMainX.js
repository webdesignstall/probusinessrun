import React from 'react';
import { MainProvider } from './Context';
import FollowUpMain from './FollowUpMain';

const FollowUpMainX = () => {
	return (
		<MainProvider>
			<FollowUpMain />
		</MainProvider>
	);
};

export default FollowUpMainX;
