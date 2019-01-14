import React, { Component } from 'react';
import Equipments from './Equipments';
import Mover from '../mover/Mover';
import MoverList from '../mover/MoverList';
import SubMenu from './SubMenu';
import FlipMove from 'react-flip-move';

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            subMenu: [],
            selectedMenu: ''
        };

        this.setSubMenu = this.setSubMenu.bind(this);
        this.selectMenu = this.selectMenu.bind(this);
    }

    setSubMenu(menus) {
        this.setState({
            subMenu: menus,
            selectedMenu: ''
        });
    }

    selectMenu(menu) {
        this.setState({
            selectedMenu: menu,
        });
    }

    render() {
        return (
            <FlipMove>
                <div key="main-menu" className="card__ add-header">
                    <Equipments setSubMenu={this.setSubMenu} />
                    <Mover setSubMenu={this.setSubMenu} />
                </div>
                <div key="sub-menu" className={this.state.subMenu.length > 0 ? 'card__ add-header' : 'hide'}>
                    <FlipMove>
                        <SubMenu subMenu={this.state.subMenu} selectMenu={this.selectMenu} />
                    </FlipMove>
                </div>
                <div key="listing" className={this.state.subMenu.length > 0 ? '' : 'hide'} style={{ backgroundColor: '#FFFDF3', fontFamily: 'monospace' }}>
                    {this.state.selectedMenu !== '' ? <MoverList whatToDisplay={this.state.selectedMenu === 'movers' ? 'mover' : this.state.selectedMenu === 'office employees' ? 'officeEmployee' : 'tablet'} /> : null}
                </div>
            </FlipMove>
        );
    }
}
