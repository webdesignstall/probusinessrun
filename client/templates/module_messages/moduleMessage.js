import { Tracker } from 'meteor/tracker';
import Discounts from '../../../common/discountData';
import { Template } from 'meteor/templating';
import Push from 'push.js';

Template.modalMesaj.onRendered(() => {
    Tracker.autorun(() => {
        // Meteor.subscribe('Dicsounts');
        const discounts = Discounts.find({}).fetch();

        discounts.length > 0
            ? (Bert.alert({
                title: 'Discount asking',
                message: `Truck #${
                    discounts[discounts.length - 1].truckNumber
                } asking for discount`,
                type: 'danger'
            }),
            Push.create(
                `Truck #${
                    discounts[discounts.length - 1].truckNumber
                } asking for discount`,
                {
                    timeout: 120000,
                    onClick: function() {
                        'http://localhost:3000/quote';
                        window.focus();
                        this.close();
                    }
                }
            ))
            : null;
    });
});

function modalMessage(mesaj) {
    document.getElementById('mesaj').innerHTML =
        '<div class="modal-messages"><div class="not-header">Notification!</div><div class="not-mesaj">' +
        mesaj +
        '</div></div>';
    $('.qaraArxa').show();

    function removeMessage() {
        document.getElementById('mesaj').innerHTML = '';
        $('.qaraArxa').hide();
    }

    setTimeout(removeMessage, 3000);
}

export { modalMessage };
