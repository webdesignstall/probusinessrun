import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WorkData from '../../../common/collections_2';
import { Session } from 'meteor/session';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class FollowUps extends TrackerReact(Component) {
    constructor(props) {
        super(props);

        this.state = {
            followUp: [{ note: '' }],
            followUpOriginal: (this.workData()[0] && this.workData()[0].followUp) || [{ note: '' }]
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        let list = nextProps.followUpList || [];
        this.workData()[0] &&
        this.workData()[0].followUp &&
        this.workData()[0].followUp.length > 0 &&
        list.length <= this.workData()[0].followUp.length
            ? list.push({ note: '' })
            : list.length > 0
                ? null
                : (list = [{ note: '' }]);

        this.setState({
            followUp: list,
            followUpOriginal:
                this.workData()[0] &&
                this.workData()[0].followUp &&
                this.workData()[0].followUp.length > 0
                    ? this.workData()[0].followUp
                    : [{ note: '' }]
        });
    }

    componentDidMount() {
        this.setState({
            followUpOriginal:
                this.workData()[0] &&
                this.workData()[0].followUp &&
                this.workData()[0].followUp.length > 0
                    ? this.workData()[0].followUp
                    : [{ note: '' }]
        });
    }

    workData() {
        return WorkData.find({ _id: Session.get('is') }).fetch();
    }

    onChangeHandler(e, index) {
        let followUp = this.state.followUp;
        followUp[index].note = e.target.value;
        this.setState(
            {
                followUp
            },
            err => {
                if (err) {
                    console.error(err);
                } else {
                    let followUp = this.state.followUp;
                    followUp[index].date = new Date();
                    this.props.updateJob && this.props.updateJob({ followUp });
                }
            }
        );
    }

    renderList() {
        return this.state.followUp.map((note, index) => {
            return (
                <React.Fragment key={'followup_note_fragment' + index}>
                    <div key={'followup_note' + index} className="col s12 m6 l6">
                        <label className="active" htmlFor="followup_note_list_item">
                            Follow Up #{index + 1}:{' '}
                            <span style={{ color: '#4F4F4F' }}>
                                {note.date
                                    ? moment(note.date).format('MM/DD/YYYY hh:mm a')
                                    : 'Date information is not aviable'}
                            </span>
                        </label>
                        <textarea
                            onChange={e => this.onChangeHandler(e, index)}
                            disabled={
                                this.state.followUpOriginal &&
                                index === this.state.followUpOriginal.length
                                    ? false
                                    : this.state.followUp.length === 1
                                        ? false
                                        : true
                            }
                            style={{
                                borderRadius: '5px',
                                height: '130px',
                                maxHeight: '130px',
                                borderColor: '#9E9E9E',
                                padding: '10px'
                            }}
                            value={note.note}
                            id={'followup_note_list_item' + index}
                        />
                    </div>
                </React.Fragment>
            );
        });
    }

    render() {
        return <React.Fragment>{this.renderList()}</React.Fragment>;
    }
}

FollowUps.propTypes = {
    followUpList: PropTypes.array,
    updateJob: PropTypes.func
};
