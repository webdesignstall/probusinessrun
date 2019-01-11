import React, { Component } from 'react';

export default class SubMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            subMenu: this.props.subMenu
        };
    }

    renderSubMenu() {
        return (this.state.subMenu.map((subMenu, index) => {
            return (
                <a
                    key={index}
                    href="#"
                    onClick={() => this.props.selectMenu(subMenu)}
                    className="add-header--menu waves-effect waves-light btn amber">
                    {subMenu}
                </a>
            );
        }));
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            subMenu: nextProps.subMenu
        });
    }

    render() {
        return (
            <div>
                {this.renderSubMenu()}
            </div>
        );
    }
}
