import React, { Component } from 'react';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import BonusSettings from '../../common/bonusData';
import Button from '../../client/templates/quote/Button';
import swal from 'sweetalert';

export default class BonusSettings_ extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: '',
            options: [
                {
                    value: 'limit',
                    name: 'Jobs Limit',
                    bonus: 200
                },
                {
                    value: 'items',
                    name: 'Items',
                    bonus: 0
                },
                {
                    value: 'studio',
                    name: 'Studio',
                    bonus: 0
                },
                {
                    value: '1_bedroom',
                    name: '1 Bedroom',
                    bonus: 0
                },
                {
                    value: '2_bedroom_small',
                    name: '2 Bedrooms (small size, few items)',
                    bonus: 0
                },
                {
                    value: '2_bedroom_avg',
                    name: '2 Bedrooms (avg. size, avg. items)',
                    bonus: 0
                },
                {
                    value: '2_bedroom_large',
                    name: '2 Bedrooms (large size, many items)',
                    bonus: 0
                },
                {
                    value: '3_bedroom_avg',
                    name: '3 Bedrooms (avg. size, avg. items)',
                    bonus: 0
                },
                {
                    value: '3_bedroom_large',
                    name: '3 Bedrooms (large size, many items)',
                    bonus: 0
                },
                {
                    value: '4_bedrooom_avg',
                    name: '4 Bedrooms (avg. size, avg. items)',
                    bonus: 0
                },
                {
                    value: '4_bedroom_large',
                    name: '4 Bedrooms (large size, many items)',
                    bonus: 0
                },
                {
                    value: '5_bedroom_avarage',
                    name: '5 Bedrooms (avarage size, avg items)',
                    bonus: 0
                },
                {
                    value: 'commercial_sml',
                    name: 'Commercial (small size, few items)',
                    bonus: 0
                },
                {
                    value: 'commercial_avg',
                    name: 'Commercial (avg. size, avg. items)',
                    bonus: 0
                },
                {
                    value: 'commercial_large',
                    name: 'Commercial (large size, many items)',
                    bonus: 0
                },
                {
                    value: 'long_distance_moves',
                    name: 'Long Distance Moves',
                    bonus: 0
                }
            ]
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            Meteor.subscribe('bonusData');
            let dateForSettings = `${new Date().getMonth()}/01/${new Date().getFullYear()}`;
            let data = BonusSettings.find({
                date: dateForSettings
            }).fetch();

            data.length > 0 ? this.setState({ _id: data[0]._id, options: data[0].options }) : null;
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    onChangeHandler(e, index) {
        let value = e.target.value;

        this.setState(prevState => {
            let old = prevState.options;
            old[index].bonus = value;

            return { options: old };
        });
    }

    saveSettings(enableButtons) {
        Meteor.call('saveBonusSettings', this.state._id, this.state.options, (err, res) => {
            if (err) {
                console.error(err);
                enableButtons();
                swal({
                    title: 'Error!',
                    text: 'Error while saving bonus settings',
                    icon: 'error',
                    button: 'OK'
                });
            } else {
                enableButtons();
                swal({
                    title: 'Success!',
                    text: 'Bonus settings saved successfully',
                    icon: 'success',
                    button: 'OK'
                });
            }
        });
    }

    renderOptions() {
        return this.state.options.map((option, index) => {
            return (
                <li key={'bonusMovingSizeList' + index}>
                    {option.name}{' '}
                    <input
                        onChange={e => this.onChangeHandler(e, index)}
                        className="browser-default"
                        key={'bonusMovingBonusList' + index}
                        value={option.bonus === 0 ? '' : option.bonus}
                    />
                </li>
            );
        });
    }

    render() {
        return (
            <div className="bonus_settings">
                <div className="bonus_settings_moving_size">
                    <ul>{this.renderOptions()}</ul>
                </div>
                <div className="clear"></div>
                <Button
                    func={enableButtons => this.saveSettings(enableButtons)}
                    color="yellow darken-2 black-text"
                    text="Save"
                    disable={true}
                />
            </div>
        );
    }
}
