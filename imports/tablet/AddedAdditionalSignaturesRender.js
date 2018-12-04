import React from 'react';
/*global moment*/

export default class AddedAdditionalSignaturesRender extends React.Component {
    constructor(props) {
        super(props)
    }

    showContent(id) {
        document.getElementById(id) && document.getElementById(id).classList.contains('hide')
            ? document.getElementById(id).classList.remove('hide')
            : document.getElementById(id).classList.add('hide');
    }

    renderAdditionalSignatures(list) {
        return (
            list.map((additionalSignature) => {
                console.log('evale edilmis islerin mappingi basladi')
                let signatureInfo = this.props.listOfAdditionalSignature.find((additionalSignature_) => {
                    return additionalSignature_.id === additionalSignature.typeId;
                });

                let spesificId = Math.random()

                return (
                    <div onClick={() => this.showContent(spesificId)} key={Math.random()} className="collection-item row" style={{ cursor: 'pointer' }} >
                        <span className="col s10 m10 l10" >{signatureInfo.title}</span>
                        <span className="col s2 m2 l2 blue darken-1 white-text center-align" >{moment(additionalSignature.date).format("hh:mm a")}</span>
                        <div id={spesificId} className="hide" >
                            <div className="clear margin-top"></div>
                            <hr />
                            <p>{signatureInfo.content}</p>
                            <div className="col s12 m9 l9" style={{ position: 'relative', width: '400px', height: '200px' }} >
                                <img src={additionalSignature.signature} alt="Customer sign" style={{ width: '400px', height: 'auto', zIndex: '1' }} />
                            </div>
                            <div className="col s12 m3 l3">
                                <input type="text" value={additionalSignature.fullname} disabled className="black-text" />
                                <input type="text" value={additionalSignature.date} disabled className="black-text" />
                            </div>
                        </div>
                    </div>
                );
            })
        );
    }

    render() {
        return (
            <div className={this.props.listOfAddedSignature.length > 0 ? 'cadr___ collection' : 'hide'} >
                <div className="collection-item purple lighten-2 white-text">ADDED ADDITIONAL SIGNATURES</div>
                {(() => this.renderAdditionalSignatures(this.props.listOfAddedSignature))()}
            </div>
        );
    }
}
