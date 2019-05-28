import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class ArchiveSearch extends TrackerReact(Component) {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: ''
        };

        this.searchInput = this.searchInput.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
    }
    clearSearch() {
        this.setState({
            searchValue: ''
        });
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
                <div className="nav-wrapper">
                    <div className="input-field" style={{ height: '30px' }}>
                        <input
                            id="search"
                            type="search"
                            onChange={e => this.searchInput(e)}
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
