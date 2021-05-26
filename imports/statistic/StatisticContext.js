import PropTypes from 'prop-types';
import React, { useState } from 'react';

const StatisticContext = React.createContext();

function StatisticProvider({ children }) {
	// Context state
	const [status, setStatus] = useState('all');
	const [company, setCompany] = useState('all');
	const [dateRange, setDateRange] = useState([
		moment().format('MM/DD/YYYY'),
		moment().format('MM/DD/YYYY')
	]);
	const [employees, setEmployees] = useState([]);
	const [employee, setEmployee] = useState('all');
	const [data, setData] = useState(null);

	// Provide Context to children components
	return (
		<StatisticContext.Provider
			value={{
				status,
				setStatus,
				company,
				setCompany,
				dateRange,
				setDateRange,
				employees,
				setEmployees,
				employee,
				setEmployee,
				data,
				setData
			}}
		>
			{children}
		</StatisticContext.Provider>
	);
}

StatisticProvider.propTypes = {
	children: PropTypes.any
};

export default StatisticContext;

export { StatisticProvider };
