import React, { useContext } from 'react';
import MainContext from '../Context';
import './sorting.styl';

export default Sorting = () => {
	const { sorting, setSorting } = useContext(MainContext);

	const changeHandler = e => {
		let value = e.target.value;
		setSorting(value);
	};

	return (
		<div className="sag sorting">
			<span className="sol" style={{ marginTop: '2px' }}>
				Sort by:
			</span>
			<select
				onChange={e => changeHandler(e)}
				className="browser-default"
				name="sortBy"
				id="sort_by"
				value={sorting}
			>
				<option value="default">Default</option>
				<option value="az">Moving Date A-Z</option>
				<option value="za">Moving Date Z-A</option>
				<option value="lc">Last Change</option>
			</select>
		</div>
	);
};
