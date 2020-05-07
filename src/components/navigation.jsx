import React, { Component } from 'react';

import { Input, Menu } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import SearchMenu from "./search";
import "./css/navigation.css";


class Navigation extends Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    render() {

        const { activeItem } = this.state

        return (

            <div className="menu-wrapper">


                <Menu fluid stackable className="menu" size="large" stackable color="blue" inverted>

                    <Menu.Item
                        as={Link} to="/"
                        name='Home'
                        active={activeItem === 'home'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        as={Link} to="/countries"
                        name='Countries'
                        active={activeItem === 'countries'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        as={Link} to="/about"
                        name='About'
                        active={activeItem === 'about'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            {/* <Input icon='search' placeholder='Search...' /> */}
                            <SearchMenu ></SearchMenu>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </div>


        );
    }
}

export default Navigation;