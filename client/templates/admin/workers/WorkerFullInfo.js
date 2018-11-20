import React from 'react';
import ReactDOM from 'react-dom';
import {Template} from 'meteor/templating';
import {Tracker} from 'meteor/tracker';
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import WorkData from './../../../../common/collections_2';

let odenildi; //payed
let id1; //id 1
let deyisilecek; //willcha
let iscininID;

class WorkerFullInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            isci: [],
            isleri: [],
            isinMelumatlari: [],
            buttonDeactive: 'deaktiv',
            value: 2
        });
    }

    componentDidMount() {
        this.isciInfoTracker = Tracker.autorun(() => {
            Meteor.subscribe('usersData');
            Meteor.subscribe('workSchema');

            const iscininIdsi = Session.get('isciId');
            if (iscininIdsi) {
                const isci = Meteor.users.find({'_id': iscininIdsi}).fetch();
                const isinMelumatlari = WorkData.find({workers: {$elemMatch: {id: Session.get('isciId')}}}).fetch();
                this.setState({
                    isci: isci
                });
                this.setState({
                    isleri: isci[0].isler
                });
                this.setState({
                    isinMelumatlari: isinMelumatlari
                });
            }
        });
    }

    componentWillUnmount() {
        this.isciInfoTracker.stop();
    }

    odenisDeyisme() {
        this.setState({
            buttonDeactive: 'duyme'
        });
    }

    saveThisinfo(event) {
        id1 = event.target.id;
        deyisilecek = document.getElementsByName(id1)[0].value;
        iscininID = Session.get('isciId');
        Meteor.call('saveEmployeeInfo', id1, deyisilecek, iscininID);
    }

    musterininAdiSoyadi() {
        return (
            this.state.isinMelumatlari.map((ish) => {

                ish.workers.map(function (ishchiler) {
                    if (ishchiler.id === Session.get('isciId')) {
                        odenildi = ishchiler.payed;
                    } else {
                        return false;
                    }
                });

                //todo iscinin maasi deyisdirilmesi mumkun olsun ve save duymesi serverside islesin
                return (
                    <div key={ish._id} className='iscilerSiyahi'>
                        {ish.workDate} {ish.clientFirstName} {ish.clientLastName}
                        <a id={ish._id} href="#" className={'sag xuban ' + this.state.buttonDeactive} onClick={this.saveThisinfo}>Save</a>
                        <input type="number" name={ish._id} className='sag iscininMaasi' placeholder='Change ' onChange={this.odenisDeyisme.bind(this)}/>
                        <span className='sag odenilmis'>${odenildi}</span>
                    </div>
                );
            })
        );
    }

    iscininInfosuRender() {
        return this.state.isci.map((isci) => {
            this.ad = isci.profile.firstName;
            this.soyad = isci.profile.lastName;
            return (
                <div key={isci._id}>
                    {this.musterininAdiSoyadi()}
                </div>
            );
        });
    }

    render() {
        return (
            <div className='workers-list iscininIsleriSiyahi'>
                <div>
                    <div className='right-align'>
                        <span className='collection-header list-of-works'><h5>{this.ad} {this.soyad}</h5></span>
                        <i className="material-icons baqla iscininIsleri">close</i>
                    </div>
                </div>
                {this.iscininInfosuRender()}
            </div>
        );
    }
}

Template.workersList.events({
    'click .info-duymesi': function () {
        const iscininIdsi = this._id;
        Session.set('isciId', iscininIdsi);
        $('.iscininIsleriSiyahi').show();
    },
    'click .iscininIsleri': function () {
        $('.iscininIsleriSiyahi').hide();
    }
});

Template.workersList.onRendered(function () {
    ReactDOM.render(<WorkerFullInfo/>, document.getElementById('workersFullInfo'));
});