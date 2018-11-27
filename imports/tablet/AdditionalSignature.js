import React from 'react';

// Components
import Discount from './Discount';
import AdditionalSignaturesRender from './AdditionalSignaturesRender';

export default class AdditionalSignature extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            animate: false,
            clicked: props.clicked
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            clicked: nextProps.clicked
        })
    }

    show(id) {
        let target_ = document.querySelector(`#${ id }`);
        target_.classList.contains('hide') ? target_.classList.remove('hide') : target_.classList.add('hide');
        this.setState((prevState) => {
            return ({
                animate: !prevState.animate
            })
        })
    }

    render() {
        return (
            <div className={!this.state.clicked ? 'hide' : ''}>
                <div className="card__">
                    <AdditionalSignaturesRender listOfSignature={this.props.additionalSignatureList} saveSignature={this.props.saveSignature} />
                </div>
                <div className="card__">
                    <div onClick={() => this.show('discount_')} >Discount</div>
                    <div id="discount_" className="hide" >
                        <Discount
                            yoxlama={this.props.yoxlama}
                            hesabla={this.props.hesabla}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
