// react
import React, { useContext } from 'react';
// helpers
import companies_ from '../helpers/companyInfos.json';
import StatisticContext from './StatisticContext';

export default CompanySelector = () => {
	const { companies } = companies_;
	const { company, setCompany } = useContext(StatisticContext);

	const renderCompaniesList = () => {
		return companies.map((company, index) => {
			return <option key={'companyList' + index}>{company.name}</option>;
		});
	};

	const companyChanger = e => {
		let value = e.target.value;

		setCompany(value);
	};

	return (
		<select
			onChange={e => companyChanger(e)}
			value={company}
			className="browser-default statistic__company_selector"
		>
			<option value="all">All Companies</option>
			{renderCompaniesList()}
		</select>
	);
};
