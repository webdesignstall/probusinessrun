import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    enableButtons(disable) {
        let btns = document.getElementsByClassName('btn');
        for (let i = 0; i < btns.length; i++) {
            btns[i].classList.remove('disabled');
        }
    }

    disableButtons() {
        let btns = document.getElementsByClassName('btn');
        for (let i = 0; i < btns.length; i++) {
            btns[i].classList.add('disabled');
        }
    }

    render() {
        return (
            <a
                style={{ margin: '3px !important' }}
                className={`waves-effect waves-light btn ${this.props.color || 'blue'}`}
                onClick={() => {
                    this.props.disable && this.disableButtons();
                    this.props.func && this.props.func(this.enableButtons);
                }}>
                {this.props.text || 'Button text'}
            </a>
        );
    }
}

Button.propTypes = {
    disable: PropTypes.bool,
    color: PropTypes.string,
    func: PropTypes.func,
    text: PropTypes.string
};
