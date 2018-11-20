import React from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';

// Components
import Discount from './Discount';

export default class AdditionalSignature extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            animate: false,
            clicked: props.clicked,
            listOfSignatures: [

            ]
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            clicked: nextProps.clicked
        })
    }

    show(id) {
        let target_ = document.querySelector(`#${id}`);
        target_.classList.contains('hide') ? target_.classList.remove('hide') : target_.classList.add('hide');
        this.setState((prevState) => {
            return ({
                animate: !prevState.animate
            })
        })
    }

    render() {
        return (
            <div className={this.state.clicked ? 'hide' : ''}>
                <div className="card__">Hay</div>
                <div className="card__">Huy</div>
                <div className="card__">Duy</div>
                <div className="card__">
                    <div onClick={() => this.show('discount_')} >Discount</div>
                    <div id="discount_" className="hide" ><Discount /></div>
                </div>
            </div>
        );
    }
}