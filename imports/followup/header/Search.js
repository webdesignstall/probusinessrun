import React, { Component } from 'react';
import './search.css';
// import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import MainContext from '../Context';

export default class Search extends Component {
    static contextType = MainContext;

    constructor(props) {
        super(props);

        this.state = {
            searchWords: '',
            result: new Set(),
            works: [],
            searching: false
        };

        this.search = this.search.bind(this);
        this.search_ = this.search_.bind(this);
        this.interval = this.interval.bind(this);
    }

    componentDidMount() {
        let { searchWord, setSearchWord, setStatus } = this.context;

        this.setSearchWord = setSearchWord;
        this.setStatus = this.setStatus;
        this.timeOut = null;
        this.setState({
            searchWords: searchWord
        });

        this.x = Tracker.autorun(() => {
            let searching = Session.get('isSearch');

            this.setState({
                searching
            });
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    search(e) {
        Session.set('loading', false);
        let value = e.target.value;
        let searching = true;

        this.setState(
            {
                searchWords: value,
                searching
            },
            () => this.interval(value)
        );
    }

    search_(value) {
        // Session.set('loading', true);
        this.setSearchWord(value);
        value === '' || !value ? this.setState({ searching: false }) : '';
        // Session.set('searchWords', this.state.searchWords);
    }

    interval(value) {
        clearTimeout(this.timeOut);
        this.timeOut = setTimeout(() => this.search_(value), 500);
    }

    render() {
        return (
            <div className="sag followup-search">
                <i className={this.state.searching ? 'hide' : 'material-icons'}>search</i>
                <i className={this.state.searching ? 'material-icons' : 'hide'}>
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
                                <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" strokeWidth="2">
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
                    onKeyDown={() => Session.set('isSearch', true)}
                    onChange={e => this.search(e)}
                    onKeyUp={e => this.search(e)}
                    type="text"
                    placeholder="type for searching..."
                    value={this.state.searchWords}
                />
            </div>
        );
    }
}
