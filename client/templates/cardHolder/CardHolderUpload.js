import React, { Component } from 'react';
import { Session } from 'meteor/session';
import swal from 'sweetalert';

class CardHolderUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardFront: false,
            cardBack: false,
            cardHolderId: false
        };

        this.fileSelect = this.fileSelect.bind(this);
    }

    fileSelect(e, nameOfFile) {
        Session.set('loading', true);
        let icon = document.getElementById(nameOfFile).innerHTML;
        let loading =
            '<svg width="36px"  height="36px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-rolling" style="background: none;"><circle cx="50" cy="50" fill="none" ng-attr-stroke="{{config.color}}" ng-attr-stroke-width="{{config.width}}" ng-attr-r="{{config.radius}}" ng-attr-stroke-dasharray="{{config.dasharray}}" stroke="#e15b64" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138" transform="rotate(71.8531 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></circle></svg><p>click to upload</p>';
        document.getElementById(nameOfFile).innerHTML = loading;
        let file = e.target.files[0];
        // let value_ = e.target.value;
        let this_ = this;
        function getBase64(file) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function() {
                let cardHolder = Session.get('cardHolder');
                cardHolder[nameOfFile] = reader.result;
                this_.props.change(nameOfFile, reader.result);
                this_.setState(
                    {
                        [nameOfFile]: true
                    },
                    () => Session.set('loading', false)
                );
            };
            reader.onerror = function(error) {
                swal({
                    title: 'Error!',
                    text: error,
                    icon: 'error',
                    button: 'OK'
                });
                document.getElementById(nameOfFile).innerHTML = icon;
                Session.set('loading', false);
                console.log('Error: ', error);
            };
        }

        file
            ? getBase64(file)
            : ((document.getElementById(nameOfFile).innerHTML = icon),
            Session.set('loading', false));
    }
    render() {
        return (
            <div className="col s12 m6 l6 offset-m3 offset-l3 cardholder_upload cardHolder-cardInfo">
                UPLOAD FILES <span className="red_star">*</span>
                <div className="upload_section row">
                    <label htmlFor="card_front">
                        <div className="upload_cardholder_sections">
                            <p>Upload picture of the card front side</p>
                            <div id="cardFront" className={this.state.cardFront ? 'hide' : ''}>
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fab"
                                    data-icon="cc-visa"
                                    className="svg-inline--fa fa-cc-visa fa-w-18"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 576 512"
                                    width="40px"
                                    heigth="40px"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M470.1 231.3s7.6 37.2 9.3 45H446c3.3-8.9 16-43.5 16-43.5-.2.3 3.3-9.1 5.3-14.9l2.8 13.4zM576 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM152.5 331.2L215.7 176h-42.5l-39.3 106-4.3-21.5-14-71.4c-2.3-9.9-9.4-12.7-18.2-13.1H32.7l-.7 3.1c15.8 4 29.9 9.8 42.2 17.1l35.8 135h42.5zm94.4.2L272.1 176h-40.2l-25.1 155.4h40.1zm139.9-50.8c.2-17.7-10.6-31.2-33.7-42.3-14.1-7.1-22.7-11.9-22.7-19.2.2-6.6 7.3-13.4 23.1-13.4 13.1-.3 22.7 2.8 29.9 5.9l3.6 1.7 5.5-33.6c-7.9-3.1-20.5-6.6-36-6.6-39.7 0-67.6 21.2-67.8 51.4-.3 22.3 20 34.7 35.2 42.2 15.5 7.6 20.8 12.6 20.8 19.3-.2 10.4-12.6 15.2-24.1 15.2-16 0-24.6-2.5-37.7-8.3l-5.3-2.5-5.6 34.9c9.4 4.3 26.8 8.1 44.8 8.3 42.2.1 69.7-20.8 70-53zM528 331.4L495.6 176h-31.1c-9.6 0-16.9 2.8-21 12.9l-59.7 142.5H426s6.9-19.2 8.4-23.3H486c1.2 5.5 4.8 23.3 4.8 23.3H528z"
                                    />
                                </svg>
                                <p>click to upload</p>
                            </div>
                            <div className={!this.state.cardFront ? 'hide' : ''}>
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fab"
                                    data-icon="cc-visa"
                                    className="svg-inline--fa fa-cc-visa fa-w-18"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 576 512"
                                    width="40px"
                                    heigth="40px"
                                >
                                    <path
                                        fill="#44BF6A"
                                        d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
                                    />
                                </svg>
                                <p>uploaded</p>
                            </div>
                            <input
                                id="card_front"
                                className="fileUploader"
                                type="file"
                                accept="image/*"
                                onChange={e => this.fileSelect(e, 'cardFront')}
                            />
                        </div>
                    </label>
                    <label htmlFor="card_back">
                        <div className="upload_cardholder_sections">
                            <p>Upload picture of the card back side</p>
                            <div id="cardBack" className={this.state.cardBack ? 'hide' : ''}>
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="credit-card"
                                    className="svg-inline--fa fa-credit-card fa-w-18"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 576 512"
                                    width="40px"
                                    heigth="40px"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M0 432c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V256H0v176zm192-68c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H204c-6.6 0-12-5.4-12-12v-40zm-128 0c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM576 80v48H0V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48z"
                                    />
                                </svg>
                                <p>click to upload</p>
                            </div>
                            <div className={!this.state.cardBack ? 'hide' : ''}>
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fab"
                                    data-icon="cc-visa"
                                    className="svg-inline--fa fa-cc-visa fa-w-18"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 576 512"
                                    width="40px"
                                    heigth="40px"
                                >
                                    <path
                                        fill="#44BF6A"
                                        d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
                                    />
                                </svg>
                                <p>uploaded</p>
                            </div>
                            <input
                                id="card_back"
                                className="fileUploader"
                                type="file"
                                accept="image/*"
                                onChange={e => this.fileSelect(e, 'cardBack')}
                            />
                        </div>
                    </label>
                    <label htmlFor="cardholder_id">
                        <div className="upload_cardholder_sections">
                            <p>Upload picture of government issued ID</p>
                            <div
                                id="cardHolderId"
                                className={this.state.cardHolderId ? 'hide' : ''}
                            >
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="id-card"
                                    className="svg-inline--fa fa-id-card fa-w-18"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 576 512"
                                    width="40px"
                                    heigth="40px"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M528 32H48C21.5 32 0 53.5 0 80v16h576V80c0-26.5-21.5-48-48-48zM0 432c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V128H0v304zm352-232c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16zm0 64c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16zm0 64c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16zM176 192c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64zM67.1 396.2C75.5 370.5 99.6 352 128 352h8.2c12.3 5.1 25.7 8 39.8 8s27.6-2.9 39.8-8h8.2c28.4 0 52.5 18.5 60.9 44.2 3.2 9.9-5.2 19.8-15.6 19.8H82.7c-10.4 0-18.8-10-15.6-19.8z"
                                    />
                                </svg>
                                <p>click to upload</p>
                            </div>
                            <div className={!this.state.cardHolderId ? 'hide' : ''}>
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fab"
                                    data-icon="cc-visa"
                                    className="svg-inline--fa fa-cc-visa fa-w-18"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 576 512"
                                    width="40px"
                                    heigth="40px"
                                >
                                    <path
                                        fill="#44BF6A"
                                        d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
                                    />
                                </svg>
                                <p>uploaded</p>
                            </div>
                            <input
                                id="cardholder_id"
                                className="fileUploader"
                                type="file"
                                accept="image/*"
                                onChange={e => this.fileSelect(e, 'cardHolderId')}
                            />
                        </div>
                    </label>
                </div>
            </div>
        );
    }
}

export default CardHolderUpload;
