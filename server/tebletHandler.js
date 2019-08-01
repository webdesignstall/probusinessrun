import {Meteor} from 'meteor/meteor';
import WorkData from '../common/collections_2';

if (Meteor.isServer) {
    Meteor.methods({
        // isin baslama ve bitme vaxtinin teyini
        setWorkBeganTimex: function (id) {
            WorkData.update(
                {_id: id},
                {
                    $set: {
                        startTime: new Date()
                    }
                }
            );
        },

        setWorkStopTime: function (id) {
            WorkData.update(
                {_id: id},
                {
                    $set: {
                        finishTime: new Date()
                    }
                },
                () => {
                    // finish time yaddasa vurulduqdan sonra qalan hesablamalari aparsin
                    let ish = WorkData.findOne({_id: id}); //isi tapir
                    let isBaslama = ish.startTime.getTime(); //isin baslamasini init vaxti
                    let isBitme = ish.finishTime.getTime(); //isin bitme vaxti
                    let totalIslemeVaxti = (isBitme - isBaslama) / 3600000; //total isleme vaxti saat ile

                    //melumatin bazaya yazilmasi
                    WorkData.update(
                        {_id: id},
                        {
                            $set: {
                                totalWorkTime: Number(totalIslemeVaxti) //total is vaxti saat ile hecne elave edilmeden
                            }
                        }
                    );
                }
            );
        },

        setDrivingTime: function (id) {
            WorkData.update(
                {_id: id},
                {
                    $set: {
                        muveqqetiYaddas: new Date(),
                        drivingClicked: true
                    }
                }
            );
        },

        //driving time teyini
        drivingTimeStop: function (id) {
            let ish = WorkData.findOne({_id: id}); // isi tap
            let muveqqetiYaddas1 = ish.muveqqetiYaddas; //muveqqeti yaddas
            let bitmeSaati = new Date(); //bitme vaxti
            let totalVaxt =
                (bitmeSaati.getTime() - muveqqetiYaddas1.getTime()) / 3600000; //total vaxt saat ile
            let totalDrivingTime = 0;

            //eger daha once surme vaxti yoxdursa
            if (isNaN(ish.totalDrivingTime)) {
                totalDrivingTime = totalVaxt;
            }
            //daha once driving varsa
            else {
                totalDrivingTime = totalVaxt + ish.totalDrivingTime;
            }

            WorkData.update(
                {_id: id},
                {
                    $push: {
                        drivingTime: {
                            startTime: muveqqetiYaddas1,
                            endTime: bitmeSaati,
                            totalTime: totalVaxt
                        }
                    }
                }
            );

            WorkData.update(
                {_id: id},
                {
                    $set: {
                        totalDrivingTime: totalDrivingTime,
                        drivingClicked: false
                    }
                }
            );
        },

        // break time init
        breakTime: function (id) {
            WorkData.update(
                {_id: id},
                {
                    $set: {
                        muveqqetiYaddas: new Date(),
                        breakClicked: true
                    }
                }
            );
        },

        // break time total time calculator
        breakTimeStop: function (id) {
            let ish = WorkData.findOne({_id: id});
            let muveqqetiYaddas1 = ish.muveqqetiYaddas;
            let bitmeSaati = new Date();
            let totalVaxt =
                (bitmeSaati.getTime() - muveqqetiYaddas1.getTime()) / 3600000;
            let totalBreakTime = 0;

            if (isNaN(ish.totalBreakTime)) {
                totalBreakTime = totalVaxt;
            } else {
                totalBreakTime = ish.totalBreakTime + totalVaxt;
            }

            let obj = {
                startTime: muveqqetiYaddas1,
                endTime: bitmeSaati,
                totalTime: totalVaxt
            };

            WorkData.update(
                {_id: id},
                {
                    $push: {
                        breakTime: obj
                    }
                }
            );

            WorkData.update(
                {_id: id},
                {
                    $set: {
                        totalBreakTime: totalBreakTime,
                        breakClicked: false
                    }
                }
            );
        }
    });
}
