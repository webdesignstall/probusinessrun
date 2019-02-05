import React, { Component } from 'react';
import { Session } from 'meteor/session';

export default class ConfirmationDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            company: Session.get('job').companyInfo
        };
    }
    render() {
        const colorStyle = {
            color: '#daf2ff'
        };
        return (
            <div className="center-text">
                <div>
                    <span>
                        <strong>Thank you for booking your move with us!&nbsp;</strong>
                    </span>
                </div>
                <div>
                    <span>
                        <strong>&nbsp;</strong>
                    </span>
                </div>
                <div>
                    <span>
                        <strong>&nbsp;</strong>
                    </span>
                </div>
                <div>
                    <span>
                        <strong>&nbsp;</strong>
                    </span>
                </div>
                <div>
                    <span>
                        <strong>Confirmation e-mail was sent to your e-mail address.&nbsp;</strong>
                    </span>
                </div>
                <div>
                    <span>
                        <strong>&nbsp;</strong>
                    </span>
                </div>
                <div>
                    <span>
                        <strong>You can always call us, e-mail and text if you had any questions.&nbsp;</strong>
                    </span>
                </div>
                <div>
                    <span>
                        <strong>&nbsp;</strong>
                    </span>
                </div>
                <div>
                    <span>
                        <strong>Hoping to see you soon!&nbsp;</strong>
                    </span>
                </div>
                <div>
                    <span>
                        <strong>Your Trusted Movers&nbsp;</strong>
                    </span>
                </div>
                <div>
                    <div>&nbsp;</div>
                </div>
                <div>&nbsp;</div>
                <div>
                    <div>&nbsp;</div>
                </div>
                <div>
                    <div>
                        <span>{this.state.company.name} -- Moving you with pride since 2006!</span>
                    </div>
                </div>
                <div>
                    <div>
                        <span>Phone:&nbsp;
                            <a style={colorStyle} href={'tel:' + this.state.company.phoneNumber} target="_blank" rel="noopener noreferrer">{this.state.company.phoneNumber}</a>&nbsp;<br />
                            E-mail:&nbsp;
                            <a style={colorStyle} href={'mailto:' + this.state.company.email} target="_blank" rel="noopener noreferrer">{this.state.company.email}</a>
                        </span>
                    </div>
                    <div>
                        <span>Web:&nbsp;
                            <a style={{ textDecoration: 'none', color: 'white' }} href={'http://' + this.state.company.url} target="_blank" rel="noopener noreferrer">{'http://' + this.state.company.url}</a>
                        </span>
                    </div>
                    <div>Powered by Movers Legion</div>
                    <div>
                        <span>BEARHFTI 0191555</span>
                    </div>
                </div>
            </div>
        );
    }
}
