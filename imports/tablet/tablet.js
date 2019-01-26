import { Template } from 'meteor/templating';

Template.tablet.events({
    'click #start-work': function (e) {
        e.preventDefault();
        document.getElementById('start-work').classList.add('disabled');
    },
    'click #stop-work': function (e) {
        e.preventDefault();
        if (confirm('Are you sure to stop work time?')) {
            document.getElementById('stop-work').classList.add('disabled');
            document.getElementById('driving-start').classList.add('disabled');
            document.getElementById('driving-stop').classList.add('disabled');
            document.getElementById('break-start').classList.add('disabled');
            document.getElementById('break-stop').classList.add('disabled');
        } else {
            return false;
        }
    },
    'click #driving-start': function (e) {
        e.preventDefault();
        document.getElementById('driving-start').classList.add('disabled');
        document.getElementById('break-start').classList.add('disabled');
    },
    'click #driving-stop': function (e) {
        e.preventDefault();
        if (confirm('Are you sure to stop driving time?')) {
            document.getElementById('driving-start').classList.remove('disabled');
            document.getElementById('break-start').classList.remove('disabled');
        } else {
            return false;
        }
    },
    'click #break-start': function (e) {
        e.preventDefault();
        document.getElementById('break-start').classList.add('disabled');
        document.getElementById('driving-start').classList.add('disabled');
    },
    'click #break-stop': function (e) {
        e.preventDefault();
        if (confirm('Are you sure to stop break time?')) {
            document.getElementById('break-start').classList.remove('disabled');
            document.getElementById('driving-start').classList.remove('disabled');
        } else {
            return false;
        }
    }
});
