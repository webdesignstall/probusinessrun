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
            console.log("​ish", ish)
            let isBaslama = (ish.startTime).getTime(); //isin baslamasini init vaxti
            console.log("​isBaslama", isBaslama)
            let isBitme = (ish.finishTime).getTime(); //isin bitme vaxti
            console.log("​isBitme", isBitme)
            let breakTime = ish.totalBreakTime; //total break time
            breakTime > 0 ? null : breakTime = 0;
            console.log("​breakTime", breakTime)
            let totalDriving = ish.totalDrivingTime; //total driving
            totalDriving > 0 ? null : totalDriving = 0;
            console.log("​totalDriving", totalDriving)
            let totalIslemeVaxti = (isBitme - isBaslama) / 60000; //total isleme vaxti deqiqe ile
            console.log("​totalIslemeVaxti", totalIslemeVaxti)
            totalIslemeVaxti = Math.round(totalIslemeVaxti, 2);
            console.log("​totalIslemeVaxti", totalIslemeVaxti)
            let totalIslemeSaati = 0;
            console.log("​totalIslemeSaati", totalIslemeSaati)
            totalIslemeSaati = totalIslemeVaxti;
            console.log("​totalIslemeSaati", totalIslemeSaati)
            totalIslemeSaati = totalIslemeSaati - (breakTime * 60);
            console.log("​totalIslemeSaati", totalIslemeSaati)


            // eger double drive timed on
            if (ish.doubleDrive === 'yes') {
                totalIslemeSaati = totalIslemeSaati + (totalDriving * 60);
                console.log("​totalIslemeSaati", totalIslemeSaati)
            }

            //eger is vaxti labor timedan az olarsa
            if (totalIslemeSaati < ish.laborTime) {
                totalIslemeSaati = ish.laborTime;
                console.log("​totalIslemeSaati", totalIslemeSaati)
                totalIslemeSaati = totalIslemeSaati + (totalDriving * 2);
                console.log("​totalIslemeSaati", totalIslemeSaati)
            }
            //2 decimal fixed total time
            totalIslemeSaati = totalIslemeSaati.toFixed(2);
            console.log("​totalIslemeSaati", totalIslemeSaati)
            //15 deqiqelik interval hesablamasi
            totalIslemeSaati = ((Math.ceil(totalIslemeSaati / 15)) * 15) / 60; //saata cevrilir
            console.log("​totalIslemeSaati", totalIslemeSaati)
            // eger minimum saatdan azdirsa
            totalIslemeSaati < ish.laborTime ? totalIslemeSaati = ish.laborTime : totalIslemeSaati = totalIslemeSaati
            console.log("​totalIslemeSaati", totalIslemeSaati)

            ish.flatRate && ish.flatRate[0].isTrue && totalIslemeSaati > ish.laborTime ? totalIslemeSaati = totalIslemeSaati - ish.laborTime : null;
            console.log('Total isleme saati', totalIslemeSaati)
            //melumatin bazaya yazilmasi
            WorkData.update(
                { _id: id },
                {
                    $set: {
                        totalWorkTime: Number(totalIslemeVaxti), //total is vaxti deqiqe ile hecne elave edilmeden
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
