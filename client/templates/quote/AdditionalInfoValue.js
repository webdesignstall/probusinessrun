import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

export default class AdditionalInfoValue extends Component {
    changeValue(e) {
        this.setState({
            value: []
        });
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            this.setState({
                value: Session.get('additionalInfo')
            });
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    delete(index) {
        let arr = Session.get('additionalInfo');
        arr.splice(index, 1);

        Session.set('additionalInfo', arr);
    }

    renderList() {
        return (
            <ul>
                {Session.get('additionalInfo').map((info, index) => {
                    return (
                        <li
                            key={index + 'addInfoVal'}
                            style={{
                                listStyleType: 'circle',
                                cursor: 'pointer'
                            }}
                            onClick={() => this.delete(index)}>
                            ✓ {info}
                        </li>
                    );
                })}
            </ul>
        );
    }

    render() {
        return (
            <div
                style={{
                    maxWidth: '50%',
                    minWidth: '50%',
                    minHeight: '100px',
                    maxHeight: '100px',
                    border: 'none',
                    padding: '10px',
                    outline: 'none',
                    float: 'left',
                    overflow: 'auto'
                }}>
                {this.renderList()}
            </div>
        );
    }
}
