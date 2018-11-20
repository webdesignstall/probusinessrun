function modalMessage(mesaj) {
    document.getElementById('mesaj').innerHTML = '<div class="modal-messages"><div class="not-header">Notification!</div><div class="not-mesaj">' + mesaj + '</div></div>';
    $('.qaraArxa').show();

    function removeMessage() {
        document.getElementById('mesaj').innerHTML = '';
        $('.qaraArxa').hide();
    }

    setTimeout(removeMessage, 3000);
}

export {modalMessage};