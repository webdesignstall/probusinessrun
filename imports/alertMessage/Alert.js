import swal from 'sweetalert';

export default function Alert(kind, message) {
    if (kind === 'error') {
        swal({
            title: 'Error!',
            text: message,
            icon: 'error',
            button: 'OK'
        });
    } else if (kind === 'success') {
        swal({
            title: 'Success!',
            text: message,
            icon: 'success',
            button: 'OK'
        });
    }
}
