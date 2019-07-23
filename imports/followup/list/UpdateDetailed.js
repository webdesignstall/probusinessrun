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
        console.log(this.props.updates);
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
        return this.state.updates.map((update, index) => {
            let { kind, path } = update;

            kind === 'A' ? (kind = update.item.kind) : null;

            return (
                <div key={'updates_detailed' + index} className={'update_render_list ' + kind}>
                    {path}
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
