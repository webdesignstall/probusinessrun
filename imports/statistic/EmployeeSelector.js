import React, { useContext, useEffect } from 'react';
import StatisticContext from './StatisticContext';

export default EmployeeSelector = () => {
	const { employees, setEmployees, setEmployee, employee } = useContext(StatisticContext);

	useEffect(() => {
		const userId = Meteor.userId();

		setEmployee(userId); // select current user as default value

		Meteor.call('fetchUsers', userId, (err, res) => {
			if (err) {
				console.error(err.details);
			} else {
				setEmployees(res);
				if (!(res.length > 1)) {
					setEmployee(userId);
				} else {
					setEmployee('all');
				}
			}
		});
	}, []);

	const renderEmployeeList = () => {
		return employees.map((employee, index) => {
			return (
				<option key={'employeeSelector' + index} value={employee._id}>
					{employee.profile.firstName} {employee.profile.lastName}
				</option>
			);
		});
	};

	// set selected employee id
	const changeEmployee = e => {
		const value = e.target.value;
		setEmployee(value);
	};

	return (
		<select
			onChange={e => changeEmployee(e)}
			value={employee}
			className="browser-default statistic__employee_selector"
		>
			{employees.length > 1 ? <option value="all">All Employee</option> : ''}
			{renderEmployeeList()}
		</select>
	);
};
