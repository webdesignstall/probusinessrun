import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import WorkData from '../../common/collections_2';
import { ReactiveVar } from 'meteor/reactive-var';
import { modalMessage } from '../../client/templates/module_messages/moduleMessage';
import { Session } from 'meteor/session';
import ReactDOM from 'react-dom';
import React from 'react';

//import componenets
import UpdateAddTruck from './../../client/templates/quote/UpdateAddTruck';
import ArrivalWindow from './../../client/templates/quote/ArrivalWindow';
import MovingSize from './../../client/templates/quote/MovingSize';
import CompanySelector from './../../client/templates/quote/CompanySelector';
import Addresses from './../../client/templates/quote/Addresses';
import RenderEmployees from './../../client/templates/quote/RenderEmployees';
import UpdateDoubleDrive from './../../client/templates/quote/UpdateDoubleDrive';
import TempTrucks from './../../client/templates/quote/TempTrucks';
import NumberOfUsers from '../../client/templates/quote/NumberOfUsers';
import TakenBy from '../../client/templates/quote/TakenBy';
import DailyStats from './DailyStats';

/*global moment $*/

let infoDisplay;
let ayDeqiq;
let ayin1ciGunu;
let aydaGunlerinSayi;
let usersBaza;
let usersBazaObject = {};
let arrayToObject = function () {
    let i;
    for (i = 0; i < usersBaza.length; i++) {
        let ad = usersBaza[i].profile.firstName + ' id: ' + usersBaza[i]._id;
        usersBazaObject[ad] = null;
    }
};

function jobNumber_() {
    document.getElementById('quote-job-number').value = Math.random().toString(36).substr(2, 5);
}

function Xuban() {
    $('input[name*="workers"]').autocomplete({
        data: usersBazaObject,
        limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
        onAutocomplete: function ( /*val*/) {
            // Callback function when value is autcompleted.
        },
        minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
    });
}

Template.kalendar.onCreated(function () {
    Template.instance().secilenTarix2 = new ReactiveVar('burger-form');
    Template.instance().vurulanId = new ReactiveVar('zulumbala');
    usersBaza = Meteor.users.find().fetch();
    arrayToObject();
});

Template.preQuote.onDestroyed(function () {
    $('#add-schedule-page').hide();
    $('#edit-schedule-page').hide();
    ReactDOM.unmountComponentAtNode(document.getElementById('truck-list-update'));
    ReactDOM.unmountComponentAtNode(document.getElementById('update_time_window'));
    ReactDOM.unmountComponentAtNode(document.getElementById('arrival-time'));
    ReactDOM.unmountComponentAtNode(document.getElementById('moving-size'));
    ReactDOM.unmountComponentAtNode(document.getElementById('iscilerinSiyahisiRender'));
    ReactDOM.unmountComponentAtNode(document.getElementById('moving-company'));
    ReactDOM.unmountComponentAtNode(document.getElementById('tempTruck'));
    Session.set('secilmisIsciler', '');
});

Template.kalendar.helpers({
    gununIsleri: function () {
        return WorkData.find({ workDate: (Template.instance().secilenTarix2.get()).toString(), quote: false }, { sort: { workMustBeginTime: 1 } });
    },
    isGunMelumatVar: function () {
        if (WorkData.find({ workDate: (Template.instance().secilenTarix2.get()).toString() }).fetch().length) {
            return true;
        } else {
            return false;
        }
    },
    isAM: function (saat) {
        if (Number(saat.substr(0, 2)) < 12) {
            return true;
        } else {
            return false;
        }
    },
    saatDeqiq: function (saat) {
        if (Number(saat.substr(0, 2)) < 12) {
            if (saat.substr(0, 2) === '00') {
                return saat.replace('00', '12');
            } else {
                return saat;
            }
        }
        if ((Number(saat.substr(0, 2)) > 12)) {
            if ((Number(saat.substr(0, 2) - 12) < 10)) {
                return saat.replace(saat.substr(0, 2), '0' + ((Number(saat.substr(0, 2)) - 12).toString()));
            } else {
                return saat.replace(saat.substr(0, 2), (Number(saat.substr(0, 2)) - 12).toString());
            }
        }
    },
    buDocument: function () {
        return WorkData.findOne({ '_id': Template.instance().vurulanId.get() });
    },
    quotedir: function (quote) {
        return quote;
    }
});

Template.kalendar.onRendered(
    function () {
        let sayi = 0;
        let clickOnDay = 0;
        let clickOnSelect = 0;
        let gun = moment().date();
        let gunSayimi = 1;
        let ay = moment().month();
        const ayOriginiali = moment().month();
        let il = moment().year();
        const ilOriginal = moment().year();
        let aylarSiyahi = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let dateChanged = 0;
        let classAdi = '';

        //autocomplete scripti

        Xuban();

        // tarixi yuxari panelde gosteren funksiya
        function tarixiGoster(ayDaxil, ilDaxil) {
            let ayAdi = moment.months(ayDaxil);
            let tarixIn = document.getElementById('ayHaqqinda');
            if (dateChanged === 1) {
                tarixIn.innerHTML = gun + '<a href="#" id="ay" class="tarixSecim"></a><a href="#" id="il" class="tarixSecim"></a><a href="#" id="goToday" class="tarixSecimGoToday"></a>';
            } else {
                tarixIn.innerHTML = gun + '<a href="#" id="ay" class="tarixSecim"></a><a href="#" id="il" class="tarixSecim"></a>';
            }
            let ayHedef = document.getElementById('ay');
            let ilHedef = document.getElementById('il');
            let goTodayHedef = document.getElementById('goToday');
            ayHedef.innerText = ayAdi;
            ilHedef.innerText = ilDaxil;
            if (dateChanged !== 0) {
                goTodayHedef.innerText = 'Go back today';
            }
        }

        tarixiGoster(ay, il);

        // gunleri cedvele yerlesiren funksiya
        function gunYerlesdirme(ayx, ilx) {
            ayin1ciGunu = moment([ilx, ayx]).startOf('month').day();
            aydaGunlerinSayi = moment([ilx, ayx]).endOf('month').date();
            ayDeqiq = ayx + 1;
            // cedvelden gun xanalrini sec
            let xanalar = document.getElementsByClassName('dayData');
            // xanalari loop edib icine gunleri yerlesdirmek ve idlerini hemin gun etmesi
            let gunYerlesdirilecekHedef; // gunun nomresi yerlesdirilecek hedef
            let y;
            for (y = 0; y < xanalar.length; y++) {
                // idlerin teyin ve aid edilmesi
                if (sayi < ayin1ciGunu || gunSayimi > aydaGunlerinSayi) {
                    xanalar[y].setAttribute('id', '');
                    xanalar[y].setAttribute('id', 'gunNomre' + sayi);
                    document.getElementById('gunNomre' + sayi).innerHTML = '';
                }
                if (sayi >= ayin1ciGunu && gunSayimi < aydaGunlerinSayi + 1) {
                    if (gunSayimi < 10) {
                        if (ayx < 10) {
                            let teqvim = '0' + ayDeqiq + '/0' + gunSayimi + '/' + ilx;
                            xanalar[y].setAttribute('id', '');
                            xanalar[y].setAttribute('id', teqvim);
                        } else {
                            let teqvim = ayDeqiq + '/0' + gunSayimi + '/' + ilx;
                            xanalar[y].setAttribute('id', '');
                            xanalar[y].setAttribute('id', teqvim);
                        }
                    } else {
                        if (ayx < 10) {
                            let teqvim = '0' + ayDeqiq + '/' + gunSayimi + '/' + ilx;
                            xanalar[y].setAttribute('id', '');
                            xanalar[y].setAttribute('id', teqvim);
                        } else {
                            let teqvim = ayDeqiq + '/' + gunSayimi + '/' + ilx;
                            xanalar[y].setAttribute('id', '');
                            xanalar[y].setAttribute('id', teqvim);
                        }
                    }
                }
                if (sayi >= ayin1ciGunu && gunSayimi < aydaGunlerinSayi + 1) {
                    if (gunSayimi < 10) {
                        if (ayx < 10) {
                            let teqvim = '0' + ayDeqiq + '/0' + gunSayimi + '/' + ilx;
                            gunYerlesdirilecekHedef = document.getElementById(teqvim);
                            gunYerlesdirilecekHedef.innerHTML = gunSayimi;
                            gunSayimi++;
                        } else {
                            let teqvim = ayDeqiq + '/0' + gunSayimi + '/' + ilx;
                            gunYerlesdirilecekHedef = document.getElementById(teqvim);
                            gunYerlesdirilecekHedef.innerHTML = gunSayimi;
                            gunSayimi++;
                        }
                    } else {
                        if (ayx < 10) {
                            let teqvim = '0' + ayDeqiq + '/' + gunSayimi + '/' + ilx;
                            gunYerlesdirilecekHedef = document.getElementById(teqvim);
                            gunYerlesdirilecekHedef.innerHTML = gunSayimi;
                            gunSayimi++;
                        } else {
                            let teqvim = ayDeqiq + '/' + gunSayimi + '/' + ilx;
                            gunYerlesdirilecekHedef = document.getElementById(teqvim);
                            gunYerlesdirilecekHedef.innerHTML = gunSayimi;
                            gunSayimi++;
                        }
                    }
                }
                sayi += 1;
            }
            sayi = 0;
            gunSayimi = 1;
            try {
                let aktivGunHedef = document.getElementById(moment().format('MM/DD/YYYY'));
                $('.dayData').removeClass('aktivGun');
                aktivGunHedef.className += ' aktivGun';
            } catch (err) {
                return true;
            }

            let gunler = Array.from(document.getElementsByClassName('dayData'));
            gunler.map((gun) => {
                let div = document.createElement('div');
                div.setAttribute('id', (gun.id + '_'));
                document.getElementById(gun.id).appendChild(div);
                if (gun.id.search('gunNomre') < 0) {
                    ReactDOM.render(<DailyStats date={gun.id} />, document.getElementById(gun.id + '_'));
                }
            });
        }

        gunYerlesdirme(ay, il);

        // click eventler
        $('body').click(function (event) {
            // go today click
            if (event.target.id === 'goToday') {
                clickOnSelect = 0;
                dateChanged = 0;
                tarixiGoster(ayOriginiali, ilOriginal);
                $('#teqvimSecim').slideUp(500);
                gunYerlesdirme(ayOriginiali, ilOriginal);
                $('.dayInfo').hide();
            }

            if (event.target.className === 'tarixSecim') {
                let idInfo = event.target.id;
                let z;
                let hedefInsert = document.getElementById('teqvimSecim');
                // aylarin adlari siyahisi
                if (idInfo === 'ay') {
                    let ayAdlarSiyahi = '';
                    for (z = 0; z < aylarSiyahi.length; z++) {
                        ayAdlarSiyahi += '<a href="#" name="' + z + '" class="tarixSecim tarixSecimay">' + aylarSiyahi[z] + '</a>';
                    }
                    hedefInsert.innerHTML = ayAdlarSiyahi;
                }
                // illerin siyahisi
                if (idInfo === 'il') {
                    let ilSiyahi = '';
                    let ilHesab = il;
                    for (z = -3; z < 2; z++) {
                        ilHesab = il + z;
                        ilSiyahi += '<a href="#" name="' + ilHesab + '" class="tarixSecim tarixSecimay">' + ilHesab + '</a>';
                    }
                    hedefInsert.innerHTML = ilSiyahi;
                }
                // ay ve ya il siyahisini gosterme ve gizletme
                if (clickOnSelect !== idInfo) {
                    clickOnSelect = idInfo;
                    $('#teqvimSecim').slideDown(500);
                } else if (clickOnSelect === idInfo) {
                    clickOnSelect = 0;
                    $('#teqvimSecim').slideUp(500);
                }

                // vurulan tarixi funkasiya vasitesile cedvele yerlesdirme
                $('.tarixSecimay').click(function (event) {
                    if (event.target.name < 12) {
                        ay = Number(event.target.name);
                    }
                    if (event.target.name > 2000 && event.target.name < 2100) {
                        il = Number(event.target.name);
                    }
                    dateChanged = 1;
                    ayDeqiq = ay + 1;
                    ayin1ciGunu = moment([il, ay]).startOf('month').day();
                    aydaGunlerinSayi = moment([il, ay]).endOf('month').date();
                    gunYerlesdirme(ay, il);
                    tarixiGoster(ay, il);
                    $('.dayInfo').hide();
                });
            }

            // islerin siyahisini cixartma
            if ((event.target.className).search('dayData') > -1 && (event.target.id).search('gunNomre') === -1) {
                Meteor.subscribe('workSchema');

                try {
                    let secilmisGun = document.getElementById(event.target.id);
                    $('.dayData').removeClass('aktivGun');
                    secilmisGun.className += ' aktivGun';
                } catch (err) {
                    err
                        ? console.log(err)
                        : null;
                }

                // Islerin siyahisini cixardir
                if (clickOnDay === 0 || clickOnDay !== event.target.id) {
                    clickOnDay = event.target.id;

                    // aid olduqu heftenin informasiya gosteren td show edir
                    infoDisplay = function () {
                        let baza = ['week1', 'week2', 'week3', 'week4', 'week5', 'week6'];
                        let bazatd = ['weektr1', 'weektr2', 'weektr3', 'weektr4', 'weektr5', 'weektr6'];
                        classAdi = event.target.className;
                        let o;
                        for (o = 0; o < baza.length; o++) {
                            if (classAdi.search(baza[o]) > -1) {
                                $('.' + bazatd[o]).show();
                            }
                            if (classAdi.search(baza[o]) === -1) {
                                $('.' + bazatd[o]).hide();
                            }
                        }
                    };

                    infoDisplay();
                } else {
                    clickOnDay = 0;
                    $('.dayInfo').hide();
                }
            }
        });
        $('.dayData').click(function () {
            $('#modal1').modal();
        });
    }
);

// kalendardaki eventler
Template.kalendar.events({
    'click .delete-duymesi': function () {
        if (confirm('Are you sure to delete this event?')) {
            Meteor.call('isiSilmek', this._id);
        }
    },
    'click .dayData': function (event) {
        event.preventDefault();
        Template.instance().secilenTarix2.set(event.target.id);
    },
    'click .add-schedule-button': function (event) {
        event.preventDefault();
        $('#add-schedule-page').show();
        ReactDOM.unmountComponentAtNode(document.getElementById('truck-list-update'));
        ReactDOM.unmountComponentAtNode(document.getElementById('update_time_window'));
        ReactDOM.render(<ArrivalWindow />, document.getElementById('arrival-time'));
        ReactDOM.render(<CompanySelector />, document.getElementById('moving-company'));
        ReactDOM.render(<TempTrucks />, document.getElementById('tempTruck'));
        ReactDOM.render(<TakenBy />, document.getElementById('takenBy'));
        window.addresses = ReactDOM.render(<Addresses />, document.getElementById('addressesId'));
        Session.set('is', '');

        $(document).ready(function () {
            $('select').material_select();
        });

        jobNumber_();
    },
    'click .add-moreschedule-button': function (event) {
        event.preventDefault();
        $('#add-schedule-page').show();
        ReactDOM.unmountComponentAtNode(document.getElementById('truck-list-update'));
        ReactDOM.unmountComponentAtNode(document.getElementById('update_time_window'));
        ReactDOM.render(<ArrivalWindow />, document.getElementById('arrival-time'));
        ReactDOM.render(<CompanySelector />, document.getElementById('moving-company'));
        ReactDOM.render(<TempTrucks />, document.getElementById('tempTruck'));
        ReactDOM.render(<TakenBy />, document.getElementById('takenBy'));
        window.addresses = ReactDOM.render(<Addresses />, document.getElementById('addressesId'));
        Session.set('is', '');

        $(document).ready(function () {
            $('select').material_select();
        });

        jobNumber_();
    },
    'click .baqla': function (event) {
        event.preventDefault();
        $('#add-schedule-page').hide();
        $('#edit-schedule-page').hide();
        ReactDOM.unmountComponentAtNode(document.getElementById('truck-list-update'));
        ReactDOM.unmountComponentAtNode(document.getElementById('update_time_window'));
        ReactDOM.unmountComponentAtNode(document.getElementById('arrival-time'));
        ReactDOM.unmountComponentAtNode(document.getElementById('moving-size'));
        ReactDOM.unmountComponentAtNode(document.getElementById('iscilerinSiyahisiRender'));
        ReactDOM.unmountComponentAtNode(document.getElementById('moving-company'));
        ReactDOM.unmountComponentAtNode(document.getElementById('tempTruck'));
        ReactDOM.unmountComponentAtNode(document.getElementById('addressesId'));
        ReactDOM.unmountComponentAtNode(document.getElementById('takenBy'));
        Session.set('secilmisIsciler', '');
        Session.set('is', '');
    },
    'click .edit-duymesi': function (event) {
        event.preventDefault();
        Template.instance().vurulanId.set(this._id);
        $('#edit-schedule-page').show();
        Session.set('is', this._id);
        ReactDOM.unmountComponentAtNode(document.getElementById('addTruck'));
        ReactDOM.render(<UpdateAddTruck />, document.querySelector('#truck-list-update'));
        ReactDOM.unmountComponentAtNode(document.getElementById('arrival-time'));
        ReactDOM.render(<ArrivalWindow update={true} />, document.getElementById('update_time_window'));
        ReactDOM.render(<MovingSize />, document.getElementById('moving-size'));
        ReactDOM.render(<RenderEmployees />, document.getElementById('iscilerinSiyahisiRender'));
        ReactDOM.render(<UpdateDoubleDrive />, document.getElementById('double-drive-time-update'));
        ReactDOM.render(<Addresses />, document.getElementById('addressesIdUpdate'));
        ReactDOM.render(<NumberOfUsers />, document.getElementById('number-of-movers2'));
        ReactDOM.render(<TempTrucks update={true} />, document.getElementById('tempTruckUpdate'));
        let x = WorkData.findOne({ _id: Session.get('is') });
        let takenById = x.takenBy;
        ReactDOM.render(<TakenBy id={takenById} update={true} />, document.getElementById('takenBy--update'));

        $(document).ready(function () {
            $('select').material_select();
        });
    },
    'click #testucun': function () {
        function yenidenIsled() {
            $('input[name*="workers"]').autocomplete({
                data: usersBazaObject,
                limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
                onAutocomplete: function ( /*val*/) {
                    // Callback function when value is autcompleted.
                },
                minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
            });
        }

        setTimeout(yenidenIsled, 100);
    },
    'click .elave-et': function () {
        let say = 1;
        $('.elave-et').text('remove_circle');
        $('.elave-et').addClass('sil');
        $('.elave-et').removeClass('elave-et');
        $('.iscileriElaveEt').append('<div class="input-field valideyn col s12 m12 l12"><i id="hu" class="material-icons isare elave-et">add_circle</i><input name="workers.' + say + '.id" class="xx" type="text" placeholder="Add employee"></div>');
        Xuban();
        say++;
    },
    'click .sil': function (e) {
        $(e.target).parent().remove();
    }
});

Template.registerHelper(
    'isBosdur',
    function (workMustBeginTime) {
        if (workMustBeginTime === '' || workMustBeginTime === undefined) {
            return true;
        } else {
            return false;
        }
    }
);

// Bazaya melumat daxil olduqdan sonra cixan mesaj
WorkData.after.insert(function (user, doc) {
    modalMessage('Work Schedule added to calendar succesfully!');
    let isciler = $('input[name*="workers"]');
    let i;
    for (i = 0; i < isciler.length; i++) {
        let userValue = isciler[i].value;
        let baslanqicIndex = userValue.indexOf('id:');
        let correctIndex = Number(baslanqicIndex) + 4;
        let istifadeciId = userValue.substr(correctIndex, userValue.length);
        Meteor.users.update({ _id: istifadeciId }, { $push: { isler: { is: doc._id, payed: 0 } } });
    }
});
