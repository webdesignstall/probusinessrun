import React, { Component } from 'react';

import ExtendedArchiveTrucs from './ExtendedArchiveTrucs';
import ExtendedArchiveEmployee from './ExtendedArchiveEmployee';

export default class ExtendArchive extends Component {
    render() {
        return (
            <div>
                <hr
                    style={{
                        borderBottom: '1px solid #2F3E4E',
                        margin: '10px auto'
                    }}
                />
                <span className="archive-list--extended-information">
                    Extended Information:
                </span>
                <ExtendedArchiveEmployee />
                <ExtendedArchiveTrucs />
            </div>
        );
    }
}
