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
            tabletIsler: [],
        };

        this.isleriDuz = this.isleriDuz.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.x = Tracker.autorun(() => {
            Meteor.subscribe('workSchema');
            // const isler = WorkData.find({ truckNumber: Meteor.user().profile.number, quote: false }).fetch();
            const truckId = Number(Meteor.user().profile.number);
            const isler = WorkData.find({
                trucks: {
                    $elemMatch: {
                        truck: truckId,
                    },
                },
                status: 'won',
            }).fetch();
            this.setState({
                tabletIsler: isler,
            });
        });
    }

    componentWillUnmount() {
        this.x.stop();
    }

    isleriDuz() {
        return this.state.tabletIsler.map(is => {
            return (
                <a
                    href="#"
                    id={is._id}
                    key={Math.random()}
                    className="collection-item"
                    onClick={() => {
                        Session.set('tabletIsId', is._id);
                        $('#tebler-render').show();
                        $('#tablet-is-siyahi').hide();
                    }}>
                    <span
                        style={{
                            borderRadius: '10px',
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            color: '#52A39A',
                            margin: '0 5px',
                            padding: '0 10px',
                        }}>
                        {is.clientFirstName} {is.clientLastName}
                    </span>
                    <span
                        style={{
                            borderRadius: '10px',
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            color: 'black',
                            padding: '0 10px',
                        }}>
                        |
                    </span>

                    <span
                        style={{
                            borderRadius: '10px',
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            color: '#78ab64',
                            padding: '0 10px',
                            margin: '0 5px',
                        }}>
                        {is.jobNumber}
                    </span>
                    {is.finished && (
                        <span
                            style={{
                                borderRadius: '10px',
                                letterSpacing: '1px',
                                textTransform: 'uppercase',
                                backgroundColor: '#ED383D',
                                fontWeight: 'bold',
                                color: 'white',
                                padding: '0 10px',
                                margin: '0 5px',
                                textShadow: '1px 1px black',
                            }}>
                            CLOSED
                        </span>
                    )}
                </a>
            );
        });
    }

    render() {
        return <div className="collection">{this.isleriDuz()}</div>;
    }
}

Template.tablet.onRendered(function() {
    ReactDOM.render(<TabletIsList />, document.getElementById('tablet-is-siyahi'));
});
