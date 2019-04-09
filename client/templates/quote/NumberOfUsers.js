import React from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import WorkData from './../../../common/collections_2';
import { Session } from 'meteor/session';

export default class NumberOfUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            iscilerinSayi: 0,
            oncedenSecilmis: 0,
        };

        this.saylari = this.saylari.bind(this);
    }
    UNSAFE_componentWillMount() {
        this.x = Tracker.autorun(() => {
            const iscilerinSayi = WorkData.find({ _id: Session.get('is') }).fetch();

            if (iscilerinSayi.length > 0) {
                const iscilerinSayiNumber = iscilerinSayi[0].numberOfWorkers;
                if (!isNaN(iscilerinSayiNumber)) {
                    this.setState({
                        oncedenSecilmis: iscilerinSayiNumber,
                    });
                }
            }

            let ishchilerSay = Meteor.users.find({ 'profile.rank': 'mover' }).fetch().length;
            this.setState({
                iscilerinSayi: ishchilerSay,
            });
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    demo() {
        return 4;
    }

    saylari() {
        let xuban = [];
        let i = 0;
        for (i = 0; i < this.state.iscilerinSayi + 1; i++) {
            i === 0 ? xuban.push('Select movers') : xuban.push(i);
        }

        return xuban.map(number => {
            return (
                <option
                    value={number}
                    key={number}
                    disabled={isNaN(number) ? true : false}
                    onChange={this.demo}
                    defaultValue={this.state.oncedenSecilmis === 0 ? 'Select movers' : this.state.oncedenSecilmis}>
                    {number}
                </option>
            );
        });
    }

    changeValue(e) {
        this.setState({
            oncedenSecilmis: e.target.value,
        });
    }

    render() {
        return (
            <div
                className="number-of-users--main"
                style={{
                    position: 'relative',
                }}>
                {/* value deyisir amma seelect edende deyismir */}
                <select
                    id="iscinin-sayi"
                    className="browser-default"
                    name="number of movers"
                    value={this.state.oncedenSecilmis === 0 ? 'Select movers' : this.state.oncedenSecilmis}
                    onChange={e => this.changeValue(e)}>
                    {this.saylari()}
                </select>
                <label
                    className="active"
                    style={{
                        backgroundColor: 'rgb(237, 240, 241)',
                        padding: '0px 5px',
                        margin: ' -28px 15px',
                        top: '-15px',
                        left: '0',
                        position: 'absolute',
                    }}
                    htmlFor="iscinin-sayi">
                    # of movers
                </label>
            </div>
        );
    }
}

Template.preQuote.onRendered(function() {
    ReactDOM.render(<NumberOfUsers />, document.getElementById('number-of-movers'));
});

Template.preQuote.onDestroyed(function() {
    ReactDOM.unmountComponentAtNode(document.getElementById('number-of-movers'));
});
