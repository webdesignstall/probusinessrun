import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WorkData from '../../../common/collections_2';
import { Session } from 'meteor/session';

export default class FollowUps extends Component {
    constructor(props) {
        super(props);

        this.state = {
            followUp: this.props.followUpList || [{}],
            followUpOriginal: WorkData.findOne({ _id: Session.get('is') }).followUp,
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            followUp: nextProps.followUpList || [{}],
        });
    }

    onChangeHandler(e, index) {
        let followUp = this.state.followUp;
        followUp[index] = { note: e.target.value };
        this.setState(
            {
                followUp,
            },
            err => {
                if (err) {
                    console.log(err);
                } else {
                    let followUp = this.state.followUp;
                    this.props.updateJob && this.props.updateJob({ followUp });
                }
            },
        );
    }

    renderList() {
        return (
            this.state.followUpOriginal &&
            this.state.followUpOriginal.map((note, index) => {
                return this.state.followUpOriginal.length !== 1 &&
                    this.state.followUpOriginal.length === index + 1 &&
                    index !== 4 ? (
                        <React.Fragment key={'followup_note_fragment' + index}>
                            <div key={'followup_note' + index} className="col s12 m6 l6">
                                <label className="active" htmlFor="followup_note_list_item">
                                Follow Up #{index + 1}:
                                </label>
                                <textarea
                                    disabled={true}
                                    style={{
                                        borderRadius: '5px',
                                        height: '130px',
                                        maxHeight: '130px',
                                        borderColor: '#9E9E9E',
                                        padding: '10px',
                                    }}
                                    value={note.note}
                                    id={'followup_note_list_item' + index}
                                />
                            </div>
                            <div key={'followup_note' + index + 1} className="col s12 m6 l6">
                                <label className="active" htmlFor="followup_note_list_item">
                                Follow Up #{index + 2}:
                                </label>
                                <textarea
                                    onChange={e => this.onChangeHandler(e, index + 1)}
                                    disabled={false}
                                    style={{
                                        borderRadius: '5px',
                                        height: '130px',
                                        maxHeight: '130px',
                                        borderColor: '#9E9E9E',
                                        padding: '10px',
                                    }}
                                    value={
                                        this.state.followUp[index + 1]
                                            ? this.state.followUp[index + 1].note
                                            : ''
                                    }
                                    id={'followup_note_list_item' + index}
                                />
                            </div>
                        </React.Fragment>
                    ) : (
                        <div className="col s12 m6 l6" key={'followup_note' + index}>
                            <label className="active" htmlFor="followup_note_list_item">
                            Follow Up #{index + 1}:
                            </label>
                            <textarea
                                onChange={e => this.onChangeHandler(e, 0)}
                                disabled={this.state.followUp.length !== 1 ? true : false}
                                style={{
                                    borderRadius: '5px',
                                    height: '130px',
                                    maxHeight: '130px',
                                    borderColor: '#9E9E9E',
                                    padding: '10px',
                                }}
                                value={note.note}
                                id={'followup_note_list_item' + index}
                            />
                        </div>
                    );
            })
        );
    }

    render() {
        return <React.Fragment>{this.renderList()}</React.Fragment>;
    }
}

FollowUps.propTypes = {
    followUpList: PropTypes.array.isRequired,
    updateJob: PropTypes.func,
};
