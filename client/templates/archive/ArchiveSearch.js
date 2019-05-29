import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import WorkData from '../../../common/collections_2';
export default class ArchiveSearch extends TrackerReact(Component) {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: ''
        };

        this.searchInput = this.searchInput.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
        this.search = this.search.bind(this);
        this.interval = this.interval.bind(this);
    }

    componentDidMount() {
        this.timeOut = null;
    }

    clearSearch() {
        this.setState(
            {
                searchValue: ''
            },
            this.interval()
        );
    }

    workData() {
        return WorkData.find({ finished: true }).fetch();
    }

    search() {
        let arrayOfWords = this.state.searchValue.split(' ');
        let indexOfEmpty = arrayOfWords.indexOf('');
        indexOfEmpty > -1 ? arrayOfWords.splice(indexOfEmpty, 1) : null;
        let result = new Set();

        arrayOfWords.map(word => {
            this.workData().map(work => {
                work.clientFirstName &&
                work.clientFirstName.toLowerCase().search(word.toLowerCase()) >
                    -1
                    ? result.add(work)
                    : null;
                work.clientLastName &&
                work.clientLastName.toLowerCase().search(word.toLowerCase()) >
                    -1
                    ? result.add(work)
                    : null;
                work.jobNumber &&
                work.jobNumber.toLowerCase().search(word.toLowerCase()) > -1
                    ? result.add(work)
                    : null;
                work.phoneNumber &&
                work.phoneNumber
                    .toString()
                    .toLowerCase()
                    .search(word.toLowerCase()) > -1
                    ? result.add(work)
                    : null;
            });
        });
        let resultConverted = Array.from(result);
        arrayOfWords.length > 0 ? null : (resultConverted = this.workData());
        this.props.updateJobLit(resultConverted);
    }

    interval() {
        clearTimeout(this.timeOut);
        this.timeOut = setTimeout(this.search, 500);
    }

    searchInput(e) {
        let value = e.target.value;
        this.setState({
            searchValue: value
        });
    }

    render() {
        let width = 'calc(100% - 160px)';
        return (
            <nav
                className="grey lighten-5 archive-head--search"
                style={{
                    display: 'inline-block',
                    width,
                    margin: '8px 0 0 150px',
                    borderRadius: '5px',
                    height: '30px',
                    overflow: 'hidden',
                    boxShadow: 'none'
                }}>
                <div id="archive-head--search-content" className="nav-wrapper">
                    <div className="input-field" style={{ height: '30px' }}>
                        <input
                            id="search"
                            type="search"
                            onChange={e => this.searchInput(e)}
                            onKeyUp={this.interval}
                            value={this.state.searchValue}
                            placeholder="search..."
                            required
                            style={{
                                height: '30px',
                                color: 'black !important'
                            }}
                        />
                        <label className="label-icon" htmlFor="search">
                            <i
                                className="material-icons"
                                style={{ lineHeight: '30px', color: 'grey' }}>
                                search
                            </i>
                        </label>
                        <i
                            onClick={this.clearSearch}
                            className="material-icons"
                            style={{ lineHeight: '30px' }}>
                            close
                        </i>
                    </div>
                </div>
            </nav>
        );
    }
}
