import React, { Component } from 'react';
import { Session } from 'meteor/session';

export default class ConfirmationDisplay extends Component {
    constructor(props) {
        super(props);

        // FIXME: sessionda oalnda ancaq state elave olsun 
        this.state = {
            company: Object.keys(Session.get('job')).length > 0 ? Session.get('job').company : {}
        }
    }
    render() {
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
                    <a href={'tel:' + this.state.company.phone} target="_blank" rel="noopener">this.state.company.phone</a>&nbsp;<br />
                            E-mail:&nbsp;
                    <a href={'mailto:' + this.state.company.email} target="_blank" rel="noopener">{this.state.company.email}</a>
                        </span>
                    </div>
                    <div>
                        <span>Web:&nbsp;
                    <a href={this.state.company.website} target="_blank" rel="noopener">{this.state.company.website}</a>
                        </span>
                    </div>
                    <div>
                        <span>CAL PUC T-0191555</span>
                    </div>
                </div>
            </div>
        );
    }
}
