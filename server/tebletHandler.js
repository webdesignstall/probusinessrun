import { Meteor } from 'meteor/meteor';
import WorkData from './../common/collections_2';

if (Meteor.isServer) {
    Meteor.methods({
        // isin baslama ve bitme vaxtinin teyini
        setWorkBeganTimex: function (id) {
            WorkData.update(
                { _id: id },
                {
                    $set: {
                        startTime: new Date()
                    }
                }
            );
        },

        setWorkStopTime: function (id) {
            WorkData.update(
                { _id: id },
                {
                    $set: {
                        finishTime: new Date()
                    }
                }
            );

            let ish = WorkData.findOne({ _id: id }); //isi tapir
            let isBaslama = (ish.startTime).getTime(); //isin baslamasini init vaxti
            let isBitme = (ish.finishTime).getTime(); //isin bitme vaxti
            let breakTime = ish.totalBreakTime; //total break time
            let totalDriving = ish.totalDrivingTime; //total driving
            let totalIslemeVaxti = (isBitme - isBaslama) / 60000; //total isleme vaxti deqiqe ile
            totalIslemeVaxti = Math.round(totalIslemeVaxti, 2);
            let totalIslemeSaati = 0;
            totalIslemeSaati = totalIslemeVaxti;
            totalIslemeSaati = totalIslemeSaati - (breakTime * 60);


            // eger double drive timed on
            if (ish.doubleDrive === 'yes') {
                totalIslemeSaati = totalIslemeSaati + (totalDriving * 60);
            }

            //eger is vaxti labor timedan az olarsa
            if (totalIslemeSaati < ish.laborTime) {
                totalIslemeSaati = ish.laborTime;
                totalIslemeSaati = totalIslemeSaati + (totalDriving * 2);
            }
            //2 decimal fixed total time
            totalIslemeSaati = totalIslemeSaati.toFixed(2);
            //15 deqiqelik interval hesablamasi
            totalIslemeSaati = ((Math.ceil(totalIslemeSaati / 15)) * 15) / 60; //saata cevrilir
            // eger minimum saatdan azdirsa
            totalIslemeSaati < ish.laborTime ? totalIslemeSaati = ish.laborTime : totalIslemeSaati = totalIslemeSaati

            ish.flatRate && ish.flatRate[0].isTrue && totalIslemeSaati > ish.laborTime ? totalIslemeSaati - ish.laborTime : '';
            console.log('Total isleme saati', totalIslemeSaati)
            //melumatin bazaya yazilmasi
            WorkData.update(
                { _id: id },
                {
                    $set: {
                        totalWorkTime: totalIslemeVaxti, //total is vaxti deqiqe ile hecne elave edilmeden
                        totalWorkHours: Number(totalIslemeSaati) //total isleme saati cem olaraq driving +
                    }
                }
            );
        },

        setDrivingTime: function (id) {
            WorkData.update(
                { _id: id },
                {
                    $set: {
                        muveqqetiYaddas: new Date()
                    }
                }
            );
        },

        //driving time teyini
        drivingTimeStop: function (id) {
            let ish = WorkData.findOne({ _id: id }); // isi tap
            let muveqqetiYaddas1 = ish.muveqqetiYaddas; //muveqqeti yaddas
            let bitmeSaati = new Date(); //bitme vaxti
            let totalVaxt = (bitmeSaati.getTime() - muveqqetiYaddas1.getTime()) / 3600000; //total vaxt saat ile
            let totalDrivingTime = 0;

            //eger daha once surme vaxti yoxdursa
            if (isNaN(ish.totalDrivingTime)) {
                totalDrivingTime = totalVaxt;
            }
            //daha once driving varsa
            else {
                totalDrivingTime = totalVaxt + (ish.totalDrivingTime);
            }

            WorkData.update(
                { _id: id },
                {
                    $push: {
                        'drivingTime': {
                            startTime: muveqqetiYaddas1,
                            endTime: bitmeSaati,
                            totalTime: totalVaxt
                        }
                    }
                }
            );

            WorkData.update(
                { _id: id },
                {
                    $set: {
                        totalDrivingTime: totalDrivingTime
                    }
                }
            );
        },

        // break time init
        breakTime: function (id) {
            WorkData.update(
                { _id: id },
                {
                    $set: {
                        muveqqetiYaddas: new Date()
                    }
                }
            );
        },

        // break time total time calculator
        breakTimeStop: function (id) {
            let ish = WorkData.findOne({ _id: id });
            let muveqqetiYaddas1 = ish.muveqqetiYaddas;
            let bitmeSaati = new Date();
            let totalVaxt = (bitmeSaati.getTime() - muveqqetiYaddas1.getTime()) / 3600000;
            let totalBreakTime = 0;

            if (isNaN(ish.totalBreakTime)) {
                totalBreakTime = totalVaxt;
            } else {
                totalBreakTime = (ish.totalBreakTime) + totalVaxt;
            }

            let obj = {
                startTime: muveqqetiYaddas1,
                endTime: bitmeSaati,
                totalTime: totalVaxt
            };

            WorkData.update(
                { _id: id },
                {
                    $push: {
                        'breakTime': obj
                    }
                }
            );

            WorkData.update(
                { _id: id },
                {
                    $set: {
                        totalBreakTime: totalBreakTime
                    }
                }
            );
        }
    });
}
