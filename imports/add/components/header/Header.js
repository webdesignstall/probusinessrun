import React, { Component } from 'react';
import Equipments from './Equipments';
import Mover from '../mover/Mover';
import MoverList from '../mover/MoverList';
import TruckList from '../truck/TruckList';
import SubMenu from './SubMenu';
import OfficeEmployee from '../officeEployee/OfficeEmployee';

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
            subMenu: menus
        });
    }

    selectMenu(menu) {
        this.setState({
            selectedMenu: menu
        });
    }

    render() {
        return (
            <div>
                <div className="card__ add-header">
                    <Equipments setSubMenu={this.setSubMenu} />
                    <Mover setSubMenu={this.setSubMenu} />
                </div>
                <div className={this.state.subMenu.length > 0 ? 'card__ add-header' : 'hide'}>
                    <SubMenu subMenu={this.state.subMenu} selectMenu={this.selectMenu} />
                </div>
                <div className={this.state.subMenu.length > 0 ? '' : 'hide'} style={{ backgroundColor: '#FFFDF3', fontFamily: 'monospace' }}>
                    {this.state.selectedMenu !== '' ? <MoverList whatToDisplay={this.state.selectedMenu === 'movers' ? 'mover' : this.state.selectedMenu === 'office employees' ? 'officeEmployee' : 'tablet'} /> : null}
                </div>
            </div>
        );
    }
}
