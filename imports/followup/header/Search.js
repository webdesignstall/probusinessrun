import { Session } from 'meteor/session';
// import TrackerReact from 'meteor/ultimatejs:tracker-react';
// import { Tracker } from 'meteor/tracker';
import React, { useContext, useEffect, useState } from 'react';
import MainContext from '../Context';
import './search.css';

const Search = () => {
	// const [searchWords, setSearchWords ]= useState('');
	// const [result, setResult] = useState(new Set());
	// const [works, setWork] = useState([]);
	// const [searching, setLoading] = useState(false);
	const [timeOut, setTimeOut] = useState(null);
	const { searchWord, setSearchWord, loading, setLoading } = useContext(MainContext);

	useEffect(() => {
		clearTimeout(timeOut);
		setTimeOut(setTimeout(() => searchSub(), 750));

		() => {
			clearTimeout(timeOut);
		};
	}, [searchWord]);

	const search = e => {
		Session.set('loading', false);
		let value = e.target.value.trim();
		setSearchWord(value);
		setLoading(true);
	};

	const searchSub = () => {
		searchWord === '' || !searchWord ? setLoading(false) : null;
	};

	return (
		<div className="sag followup-search">
			<i className={loading ? 'hide' : 'material-icons'}>search</i>
			<i className={loading ? 'material-icons' : 'hide'}>
				<svg width="20" height="20" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
					<defs>
						<linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
							<stop stopColor="#000" stopOpacity="0" offset="0%" />
							<stop stopColor="#000" stopOpacity=".631" offset="63.146%" />
							<stop stopColor="#000" offset="100%" />
						</linearGradient>
					</defs>
					<g fill="none" fillRule="evenodd">
						<g transform="translate(1 1)">
							<path
								d="M36 18c0-9.94-8.06-18-18-18"
								id="Oval-2"
								stroke="url(#a)"
								strokeWidth="2"
							>
								<animateTransform
									attributeName="transform"
									type="rotate"
									from="0 18 18"
									to="360 18 18"
									dur="0.9s"
									repeatCount="indefinite"
								/>
							</path>
							<circle fill="#fff" cx="36" cy="18" r="1">
								<animateTransform
									attributeName="transform"
									type="rotate"
									from="0 18 18"
									to="360 18 18"
									dur="0.9s"
									repeatCount="indefinite"
								/>
							</circle>
						</g>
					</g>
				</svg>
			</i>
			<input
				// onKeyDown={() => Session.set('isSearch', true)}
				onChange={e => search(e)}
				// onKeyUp={e => this.search(e)}
				type="text"
				placeholder="type for searching..."
				value={searchWord}
			/>
		</div>
	);
};

export default Search;
