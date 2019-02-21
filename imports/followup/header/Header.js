import React, { Component } from 'react';
import Search from './Search';
import Filter from './Filter';

export default class Header extends Component {
    render() {
        return (
            <div
                className="followup--header"
                style={{
                    padding: '10px 0',
                    borderBottom: '2px solid #3E3E3E'
                }}
            >
                <span style={{ color: '#707070' }}>JOB LIST</span>
                <Filter />
                <Search />
            </div>
        );
    }
}
