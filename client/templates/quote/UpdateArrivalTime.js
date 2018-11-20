import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import WorkData from './../../../common/collections_2';

//TODO: custom vurulduqda add schedulede true false olmur
export default class UpdateArrivalWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            custom: false,
            valueOfInput: '',
            selected: '',
            defValue: '',
            trueFalse: false,
            options: [
                {
                    name: 'Select moving time window',
                    status: 1
                },
                {
                    name: 'Morning',
                    status: 0
                },
                {
                    name: 'Between 8-9am',
                    status: 1
                },
                {
                    name: 'Between 9-10am',
                    status: 1
                },
                {
                    name: 'Afternoon',
                    status: 0
                },
                {
                    name: 'Between 1-4pm',
                    status: 1
                },
                {
                    name: 'Between 2-5pm',
                    status: 1
                },
                {
                    name: 'Morning & Afternoon',
                    status: 1
                },
                {
                    name: 'Custom',
                    status: 1
                }
            ]
        };

        this.onChangeInput = this.onChangeInput.bind(this);
        this.secilmisiRenderEt = this.secilmisiRenderEt.bind(this);
        this.custom = this.custom.bind(this);
        this.renderOptions = this.renderOptions.bind(this);
        this.renderArrivalTime = this.renderArrivalTime.bind(this);
    }

    componentDidMount() {
        this.x = Tracker.autorun(() => {
            let id = Session.get('is');
            let selected = '';

            if (id != '') {
                selected = WorkData.find({ _id: id }).fetch();
                selected = selected[0].workMustBeginTime;
            }

            this.setState({
                selected: selected
            }, () => {
                this.secilmisiRenderEt();
            });

            let that = this;
            document.getElementById('update-select-arrive-time').onchange = function () {
                let value = document.getElementById('update-select-arrive-time').value;
                if (value === 'Custom') {
                    // document.getElementsByClassName('select-wrapper')[0].classList.add('hide');
                    that.setState({
                        custom: true
                    });
                } else {
                    that.setState({
                        custom: false
                    });
                }
            };
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    secilmisiRenderEt() {
        //isdeki zamanin siyahida olub olmamasi yoxlanilir
        this.state.options.map((option) => {
            if (option.name === this.state.selected) {
                this.setState({
                    defValue: this.state.selected
                });
            }
        });

        //isdeki zaman siyahida yoxdursa ve isdeki zaman bos deyilse
        if (this.state.defValue === '' && this.state.selected != '') {
            this.setState({
                defValue: 'Custom'
            });

            this.setState({
                trueFalse: true,
                custom: true,
                valueOfInput: this.state.selected
            });
        }

        if (this.state.selected === '') {
            this.setState({
                defValue: 'Select moving time window'
            });
        }
    }

    renderOptions() {
        return (
            this.state.options.map((option) => {
                return (
                    <option
                        key={option.name}
                        value={option.name}
                        disabled={option.status === 0 ? true : false}
                    >
                        {option.name}
                    </option>
                );
            })
        );
    }

    renderArrivalTime() {
        return (
            <select name="select-arrive-time" id="update-select-arrive-time" defaultValue={this.state.defValue} >
                {this.renderOptions()}
            </select>
        );
    }

    onChangeInput(e) {
        this.setState({
            valueOfInput: e.target.value
        });
    }

    custom() {
        return (
            <input
                id="update-input-custom-time"
                className={this.state.custom ? '' : 'hide'}
                type="text" value={this.state.valueOfInput}
                onChange={this.onChangeInput}
                placeholder="Input the arrival time window manually"
            />
        );
    }

    render() {
        return (
            <div>
                <i className="material-icons isare">date_range</i>
                {this.renderArrivalTime()}
                {this.custom()}
            </div>
        );
    }
}

// Template.preQuote.onRendered(() => {
//     ReactDOM.render(<ArrivalWindow />, document.getElementById('arrival-time'));
// });