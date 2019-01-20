import React from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import WorkData from '../../common/collections_2';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

/*global $*/

export default class TabletIsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabletIsler: []
        };

        this.isleriDuz = this.isleriDuz.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.x = Tracker.autorun(() => {
            Meteor.subscribe('workSchema');
            // const isler = WorkData.find({ truckNumber: Meteor.user().profile.number, quote: false }).fetch();
            const truckId = Number(Meteor.user().profile.number);
            const isler = WorkData.find(
                {
                    trucks:
                    {
                        $elemMatch:
                        {
                            truck: truckId
                        }
                    },
                    'quote': false
                }
            ).fetch();
            this.setState({
                tabletIsler: isler
            });
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    isleriDuz() {
        return (
            this.state.tabletIsler.map((is) => {
                return (
                    <a href="#" id={is._id} key={Math.random()} className="collection-item" onClick={
                        () => {
                            Session.set('tabletIsId', is._id);
                            $('#tebler-render').show();
                            $('#tablet-is-siyahi').hide();

                        }
                    }>
                        {is.clientFirstName} {is.clientLastName}
                    </a>
                );
            })
        );
    }

    render() {
        return (
            <div className="collection">
                {this.isleriDuz()}
            </div>
        );
    }
}

Template.tablet.onRendered(function () {
    ReactDOM.render(<TabletIsList />, document.getElementById('tablet-is-siyahi'));
});
