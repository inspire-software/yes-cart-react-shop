/*
 * Copyright 2020 Inspire-Software.com
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */


import React from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import './Common.css'
import './App.css';
import {connect} from "react-redux";
import {
    addFilterCommand,
    setCurrentCategoryCommand,
    setLoginInfoCommand,
    setViewLoginRegisterCommand,
    setViewProfileCommand
} from "./actions";
import ShoppingCartSmall from "./shoppingcart/ShoppingCartSmall.js";
/**
 * User: Igor Azarny iazarny@yahoo.com
 * Date: 04-Oct-2020
 * Time: 12:10:23
 */
class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.onAddFilter = this.onAddFilter.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleTagSelection = this.handleTagSelection.bind(this);
        this.handleSearchFromMenu = this.handleSearchFromMenu.bind(this);
        this.state = {
            searchValue: ''
        };
    }

    onAddFilter(code, value, displayCode, displayValue) {
        if (value && value.trim().length> 0) {
            this.props.dispatch(addFilterCommand(code, value, displayCode, displayValue));
        }
    }

    handleSubmit(event) {
        this.onAddFilter('query',this.state.searchValue, 'Search', this.state.searchValue);
        this.setState({ searchValue: '' });
        event.preventDefault();
    }

    handleSearchFromMenu(term, category) {
        if (category) {
            this.props.dispatch(setCurrentCategoryCommand(category));
        } else {
            this.props.dispatch(setCurrentCategoryCommand(this.props.rootCategoryId));
        }
        this.onAddFilter('query', term, 'Search', term);
    }

    handleTagSelection(tag, tagDepict) {
        this.props.dispatch(setCurrentCategoryCommand(this.props.rootCategoryId));
        this.onAddFilter('tag', tag, '', tagDepict);
    }

    handleChange(event) {
        this.setState({ searchValue: event.target.value});
    }



    render() {

        return <React.Fragment>
            <Row>
                <Col>
                    <Navbar bg="light" expand="lg">
                        <Navbar.Brand href="#home" onClick={(e) =>  this.props.dispatch(setCurrentCategoryCommand(this.props.rootCategoryId))}>YC-DEMO-SHOP</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="#sale" onClick={(e) => this.handleTagSelection('sale', 'Sale')}>Sale</Nav.Link>
                                <Nav.Link href="#specialoffer" onClick={(e) => this.handleTagSelection('specialoffer', 'Special Offer')}>Special Offer</Nav.Link>
                                <Nav.Link href="#newarrival" onClick={(e) => this.handleTagSelection('newarrival', 'New Arrivals')}>New Arrivals</Nav.Link>
                                <NavDropdown title="Demo" id="basic-nav-dropdown">

                                    <NavDropdown.Item href="#preorder" onClick={(e) => this.handleTagSelection('preorder', 'Preorder')}>Preorder</NavDropdown.Item>
                                    <NavDropdown.Item href="#backorder" onClick={(e) => this.handleTagSelection('backorder', 'Backorder')}>Backorder</NavDropdown.Item>
                                    <NavDropdown.Item href="#always" onClick={(e) => this.handleTagSelection('always', 'Always')}>Always</NavDropdown.Item>
                                    <NavDropdown.Item href="#showroom" onClick={(e) => this.handleTagSelection('showroom', 'Showroom')}>Showroom</NavDropdown.Item>
                                    <NavDropdown.Divider/>

                                    <NavDropdown.Item href="#multisku"  onClick={(e) => this.handleTagSelection('multisku', 'Multi Sku')}>Multi Sku</NavDropdown.Item>
                                    <NavDropdown.Item href="#multibuy" onClick={(e) => this.handleTagSelection('multibuy', 'Multi Buy')}>Multi Buy</NavDropdown.Item>
                                    <NavDropdown.Item href="#multidelivery" onClick={(e) => this.handleTagSelection('multidelivery', 'Multi Delivery')}>Multi Delivery (Add all to cart)</NavDropdown.Item>
                                    <NavDropdown.Item href="#accessories" onClick={(e) => this.handleTagSelection('accessories', 'Accessories')}>Accessories</NavDropdown.Item>
                                    <NavDropdown.Divider/>

                                    <NavDropdown.Item href="#mini-mouse-red-global"  onClick={(e) => this.handleSearchFromMenu('mini mouse red')}>Global: "mini mouse red"</NavDropdown.Item>
                                    <NavDropdown.Item href="#mini-mouse-red-category"  onClick={(e) => this.handleSearchFromMenu('mini mouse red', 10525 )}>Category: "mini mouse red"</NavDropdown.Item>
                                    <NavDropdown.Item href="#mini-mouse-white-global"  onClick={(e) => this.handleSearchFromMenu('mini mouse white')}>Global: "mini mouse white"</NavDropdown.Item>
                                    <NavDropdown.Item href="#mini-mouse-white-category"  onClick={(e) => this.handleSearchFromMenu('mini mouse white', 10525 )}>Category: "mini mouse white"</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            {
                                this.props.loginInfo && this.props.loginInfo.authenticated &&
                                <Nav className="mr-auto">
                                    <NavDropdown title={this.props.loginInfo.greeting} id="profile-nav-dropdown">
                                        <NavDropdown.Item   onClick={(e) => this.props.dispatch(setViewProfileCommand())}>Profile</NavDropdown.Item>
                                        <NavDropdown.Item   onClick={(e) => console.info(e)}>Wish list</NavDropdown.Item>
                                        <NavDropdown.Item   onClick={(e) => console.info(e)}>Order history</NavDropdown.Item>
                                        <NavDropdown.Item   onClick={(e) => this.props.dispatch(setLoginInfoCommand(null))}>Log off</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            }
                            {
                                !this.props.loginInfo &&
                                <Nav className="mr-auto">
                                    <Nav.Link href="#sale" onClick={(e) => this.props.dispatch(setViewLoginRegisterCommand())}>
                                        Login
                                    </Nav.Link>
                                </Nav>
                            }

                            <ShoppingCartSmall />

                            <Form inline onSubmit={e => { this.handleSubmit(e); }}>
                                <FormControl value={this.state.searchValue}
                                             onChange={this.handleChange}
                                             type="text"
                                             placeholder="Search"
                                             className="mr-sm-2"/>
                                <Button
                                    onClick={(e) => this.handleSubmit(e)}
                                    variant="outline-success">Search</Button>
                            </Form>

                        </Navbar.Collapse>
                    </Navbar>

                </Col>
            </Row>


        </React.Fragment>;
    }

}

function mapStateToProps(state) {
    return {
        categoryNavigationData: state.categoryNavigationData,
        filterParameters: state.filterParameters,
        rootCategoryId: state.rootCategoryId,
        loginInfo: state.loginInfo

    };
}

export default connect(mapStateToProps)(Menu);
