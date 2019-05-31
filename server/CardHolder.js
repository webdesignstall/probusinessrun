import { Meteor } from 'meteor/meteor';
import email from 'emailjs';

if (Meteor.isServer) {
    Meteor.methods({
        sendEmailCardHolder: function(obj) {
            let server = email.server.connect({
                user: obj.companyInfo.email,
                password: 'MCla7724!',
                host: obj.companyInfo.smtp,
                timeout: 60000
                // ssl: true,
            });

            //sending email
            let message = {
                text: ' ',
                from: obj.companyInfo.name + ' ' + obj.companyInfo.email,
                to: obj.email,
                subject:
                    'Guaranteed Moving Estimate for ' +
                    job.firstName +
                    ' ' +
                    job.lastName,
                attachment: [
                    {
                        data: EmailContent(job),
                        alternative: true
                    }
                ]
            };
            this.x = false;

            server.send(message, function(err) {
                if (err) {
                    console.log(err);
                    throw new Meteor.Error(
                        'Can\'t send email',
                        'Impossible send email. Contact system administration'
                    );
                } else {
                    console.log('Email successfully sent to: ' + job.email);
                }
            });
        }
    });
}
