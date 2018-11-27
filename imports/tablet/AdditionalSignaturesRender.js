import React from 'react';

// load components
import Signature from './Signature';

export default class AdditionalSignaturesRender extends React.Component {
    show(id) {
        let target_ = document.getElementById(`${ id }`);
        target_.classList.contains('hide') ? target_.classList.remove('hide') : target_.classList.add('hide');
    }

    render() {
        return (this.props.listOfSignature.map((additionalSignature) => {
            return (
                <div key={additionalSignature.id} className="card__">
                    <div onClick={() => this.show(additionalSignature.id)}>{additionalSignature.title}</div>
                    <div id={additionalSignature.id} className="hide card__" >
                        {additionalSignature.content}<br />
                        <hr />
                        <Signature saveSignature={this.props.saveSignature} id={additionalSignature.id} />
                    </div>
                </div>
            );
        }));
    }
}
