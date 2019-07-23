import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class UpdateDetailed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            updates: []
        };
    }

    componentDidMount() {
        this.setState({
            updates: this.props.updates
        });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            updates: nextProps.updates
        });
    }

    renderUpdates() {
        return this.state.updates.map((update, index_) => {
            let { kind, path, lhs, rhs, index, item } = update;

            let path_ = '';
            path.map(path__ => {
                path_ += `/${path__}`;
            });

            if (kind === 'A') {
                kind = item.kind;
                lhs = item.lhs;
                rhs = item.rhs;
            }

            let kind_ = kind => {
                if (kind === 'N') {
                    return <span className="update_status blue darken-3">NEW</span>;
                } else if (kind === 'D') {
                    return <span className="update_status red darken-4">DELETED</span>;
                } else if (kind === 'E') {
                    return <span className="update_status yellow darken-4">EDITED</span>;
                }
            };

            return (
                <div key={'updates_detailed' + index_} className={'update_render_list row ' + kind}>
                    <p>
                        {kind_(kind)} {path_}
                    </p>
                    <div className={kind !== 'N' ? 'col s12 m6 l6 update_values' : 'hide'}>
                        <p>Old value</p>
                        {lhs && lhs.toString()}
                    </div>
                    <div className={kind !== 'D' ? 'col s12 m6 l6 update_values' : 'hide'}>
                        <p>New value</p>
                        {rhs && rhs.toString()}
                    </div>
                </div>
            );
        });
    }

    render() {
        return <li className="collection-item">{this.renderUpdates()}</li>;
    }
}

UpdateDetailed.propTypes = {
    updates: PropTypes.array
};
