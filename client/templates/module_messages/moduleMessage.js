import { Tracker } from 'meteor/tracker';
import Discounts from '../../../common/discountData';
import { Template } from 'meteor/templating';
import Push from 'push.js';

/*global $*/

Template.modalMesaj.onRendered(() => {
    Tracker.autorun(() => {
        // Meteor.subscribe('Dicsounts');
        const discounts = Discounts.find({}).fetch();

        if (discounts.length > 0) {
            Push.create(`Truck #${discounts[discounts.length - 1].truckNumber} asking for discount`, {
                timeout: 120000,
                onClick: function() {
                    'http://localhost:3000/quote';
                    window.focus();
                    this.close();
                }
            });
        }
    });
});

function modalMessage(mesaj) {
    document.getElementById('mesaj').innerHTML =
        '<div class="modal-messages"><div class="not-header">Notification!</div><div class="not-mesaj">' + mesaj + '</div></div>';
    $('.qaraArxa').show();

    function removeMessage() {
        document.getElementById('mesaj').innerHTML = '';
        $('.qaraArxa').hide();
    }

    setTimeout(removeMessage, 3000);
}

export { modalMessage };
