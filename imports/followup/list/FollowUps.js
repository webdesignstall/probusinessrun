import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FollowUps extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: this.props.followUpList || [{}]
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            list: nextProps.followUpList || [{}]
        });
    }

    renderList() {
        return (this.state.list && this.state.list.map((note, index) => {
            return (this.state.list.length !== 1 && this.state.list.length === (index + 1) && index !== 4
                ? (
                    <React.Fragment>
                        <div key={'followup_note' + index} className="col s12 m6 l6">
                            <label className="active" htmlFor="followup_note_list_item">Follow Up #{index + 1}:</label>
                            <textarea
                                disabled={true}
                                style={
                                    {
                                        borderRadius: '5px',
                                        height: '130px',
                                        maxHeight: '130px',
                                        borderColor: '#9E9E9E',
                                        padding: '10px'
                                    }
                                }
                                value={note.note}
                                id={'followup_note_list_item' + index} >
                            </textarea>
                        </div>
                        <div key={'followup_note' + index + 1} className="col s12 m6 l6" >
                            <label className="active" htmlFor="followup_note_list_item">Follow Up #{index + 2}:</label>
                            <textarea
                                disabled={false}
                                style={
                                    {
                                        borderRadius: '5px',
                                        height: '130px',
                                        maxHeight: '130px',
                                        borderColor: '#9E9E9E',
                                        padding: '10px'
                                    }
                                }
                                id={'followup_note_list_item' + index} >
                            </textarea>
                        </div>
                    </React.Fragment>
                )
                :
                (
                    <div className="col s12 m6 l6" key={'followup_note' + index} >
                        <label className="active" htmlFor="followup_note_list_item">Follow Up #{index + 1}:</label>
                        <textarea
                            disabled={this.state.list.length !== 1 ? true : false}
                            style={
                                {
                                    borderRadius: '5px',
                                    height: '130px',
                                    maxHeight: '130px',
                                    borderColor: '#9E9E9E',
                                    padding: '10px'
                                }
                            }
                            value={note.note}
                            id={'followup_note_list_item' + index} >
                        </textarea>
                    </div>
                ));
        }));
    }

    render() {
        return (
            <React.Fragment>
                {this.renderList()}
            </React.Fragment>
        );
    }
}


FollowUps.propTypes = {
    followUpList: PropTypes.array.isRequired
};