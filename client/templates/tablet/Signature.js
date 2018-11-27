import React from 'react';
import SignaturePad from 'signature_pad';

export default class Signature extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: new Date().getTime(),
            signatureEmpty: false
        }

        this.createCanvas = this.createCanvas.bind(this);
    }

    componentDidMount() {
        console.log('Component qosuldu');
    }

    createCanvas(id) {
        console.log('loaded create canvas')
        let signaturePadElement = document.getElementById(id + 'canvas')
        this.signaturePad = signaturePadElement ? new SignaturePad(
            signaturePadElement,
            {
                backgroundColor: 'rgba(255, 255, 255, 0)',
                penColor: 'rgb(0, 0, 0)'
            }
        ) : null;
        let saveButton = document.getElementById(id + 'save');
        let clearButton = document.getElementById(id + 'clear')

        this.state.signatureEmpty ? saveButton.classList.remove(disabled) : null;

        clearButton ? clearButton.addEventListener('click', () => this.signaturePad.clear()) : null;
        saveButton ? saveButton.addEventListener('click', () => {
            console.log('loaded save button');
            let fullName = document.getElementById(id).value;
            let date = document.getElementById(id + 'date').innerText;
            let signature = this.signaturePad.toDataURL();
            let typeId = this.props.typeOfSignature;
            this.props.saveSignature(fullName, date, signature, typeId);
            let target_ = document.getElementById(`${ this.props.id }`);
            target_.classList.add('hide');
        }) : null;
    }

    signatureEmpty() {
        console.log('Zulumka')
        this.setState((prevState) => {
            signatureEmpty: !prevState.signatureEmpty
        });
    }

    componentWillUnmount() {
        this.signaturePad.off();
    }

    render() {
        return (
            <div className="row">
                <div className="col s12 m4 l4">
                    <input type="text" id={this.state.id} placeholder="Enter Full Name" />
                    <div className="clear margin-top"></div>
                    <span id={this.state.id + 'date'} className="cercive indigo lighten-5">{Date()}</span>
                </div>
                <div className="col s12 m8 l8">
                    <p>Sign below</p>
                    <canvas id={this.state.id + 'canvas'} className="card__ " width={'400px'} height={'200px'} onChange={this.signatureEmpty} ></canvas>
                    <div className="clear"></div>
                    <button id={this.state.id + 'clear'} className="btn  red lighten-2" >Clear</button>
                    <button id={this.state.id + 'save'} className="btn">Save</button>
                    {this.createCanvas(this.state.id)}
                </div>
            </div>
        );
    }
}
