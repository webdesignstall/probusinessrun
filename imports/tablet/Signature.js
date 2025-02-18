import React from 'react';
import SignaturePad from 'signature_pad';

export default class Signature extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: (Math.random()).toString(),
            signatureEmpty: false,
            time: new Date().getTime(),
            fullname: ''
        };

        this.initialize = this.initialize.bind(this);
        this.saving = this.saving.bind(this);
        this.fullNameChange = this.fullNameChange.bind(this);
    }

    componentDidMount() {
        this.initialize();
    }

    UNSAFE_componentWillReceiveProps() {
        this.initialize();
    }

    initialize() {
        let signaturePadElement = document.getElementById(this.state.id + 'canvas');
        this.signaturePad = signaturePadElement ?
            new SignaturePad(signaturePadElement,
                {
                    backgroundColor: 'rgba(255, 255, 255, 0)',
                    penColor: 'rgb(0, 0, 0)',
                    onBegin: () => {
                        this.setState({ signatureEmpty: true });
                    }
                }
            ) : null;
    }

    saving() {
        let fullname = this.state.fullname;
        let date = this.state.time;
        let signature = this.signaturePad.toDataURL();
        let information = {
            fullname,
            date,
            signature,
            typeId: this.props.id
        };
        this.props.extraInformation ? information = Object.assign({}, information, this.props.extraInformation) : null;
        this.props.saveSignature(this.props.which, information);
        // let target_ = document.getElementById(this.props.id);
        this.signaturePad.clear();
        this.props.resetDiscount ? this.props.resetDiscount() : null;
        this.props.reset ? this.props.reset() : null;
        this.setState({
            id: (Math.random()).toString(),
            signatureEmpty: false,
            time: new Date().getTime(),
            fullname: ''
        });
    }

    fullNameChange(e) {
        this.setState({
            fullname: e.target.value
        });
    }

    componentWillUnmount() {
        this.signaturePad.off();
    }

    render() {
        return (
            <div className="row">
                <div className="col s12 m4 l4" style={{ marginTop: '60px' }}>
                    <input type="text" id={this.state.id} placeholder="Enter Full Name" onChange={this.fullNameChange} value={this.state.fullname} />
                    <div className="clear margin-top"></div>
                    <span id={this.state.id + 'date'} className="cercive indigo lighten-5">{Date()}</span>
                </div>
                <div className="col s12 m8 l8">
                    <p>Sign below</p>
                    <canvas id={this.state.id + 'canvas'} className="card__ " width={'400px'} height={'200px'} ></canvas>
                    <div className="clear"></div>
                    <button id={this.state.id + 'clear'}
                        className="btn  red lighten-2"
                        onClick={() => this.signaturePad.clear()}
                    >Clear</button>
                    <button
                        key={Math.random()}
                        id={this.state.id + 'save'}
                        className="btn"
                        onClick={this.saving}
                        disabled={this.state.fullname !== '' && this.state.signatureEmpty ? false : true}
                    >Save</button>
                </div>
            </div>
        );
    }
}
