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

/**
 * User: Igor Azarny iazarny@yahoo.com
 * Date: 04-Oct-2020
 * Time: 12:10:23
 */

import React from 'react';
import {BrowserRouter, Route, Switch, useLocation} from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

import {LinkContainer} from 'react-router-bootstrap';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import './Common.css'

import CategoryMenu from './CategoryMenu';
import Breadcrumbs from './Breadcrumbs';
import Main from './Main';
import Menu from './Menu';
import FilteredNav from './FilteredNav';
import Footer from './Footer';
import Featured from './product/Featured';
import ShoppingCartBig from './shoppingcart/ShoppingCartBig';
import Checkout from './checkout/Checkout';
import Profile from './profile/Profile';
import LoginRegister from './profile/LoginRegister';


import './App.css';
import {connect} from "react-redux";
import {API_URL, CORS_PROXY, extractYcHeader, getGetData} from "./Common";
import {setCurrentCategoryCommand, setRootCommand, setRootMenuCommand} from "./actions";
import ViewMode from "./ViewMode";

const Home = () => <span>Home</span>;

const About = () => <span>About</span>;

const Users = () => <span>Users</span>;

function HeaderView() {

    let location = useLocation();
    console.log(location.pathname);
    return <span>Path : {location.pathname}  </span>

}

class App extends React.Component {

    componentDidMount() {
        fetch(CORS_PROXY + API_URL + '/categories/menu?mode=hierarchy', getGetData())
            .then(res => {
                    extractYcHeader(res)
                    return res.json();
                }
            )
            .then((data) => {
                this.props.dispatch(setRootCommand(data[0].parentId, "Home")); //TODO Home need to localize
                this.props.dispatch(setRootMenuCommand(data));
                this.props.dispatch(setCurrentCategoryCommand(data[0].parentId));

            })
            .catch(console.log);
    }

    /**
     * Parse window.location.pathname and present it as
     * url, fetch data, dispatch command
     */
    parseUrl() {

    }


    render() {

        //console.info(HeaderView());


        return <BrowserRouter>
            <Container className="p-3">
                <Row>
                    <Col className="wireframe">
                        <Jumbotron>
                            <span><HeaderView/></span>
                            <h2>
                                Welcome To React-Bootstrap Current Page is{' '} Navigate to{' '}
                                <Switch>
                                    <Route path="/about">
                                        <About/>
                                    </Route>
                                    <Route path="/users">
                                        <Users/>
                                    </Route>
                                    <Route path="/" component={Home}/>
                                    <Route path="/Laptops">
                                        <span>WTF</span>
                                    </Route>
                                </Switch>
                            </h2>
                            <h2>
                                <ButtonToolbar className="custom-btn-toolbar">
                                    <LinkContainer to="/">
                                        <Button>Home</Button>
                                    </LinkContainer>
                                    <LinkContainer to="/about">
                                        <Button>About</Button>
                                    </LinkContainer>
                                    <LinkContainer to="/users">
                                        <Button>Users</Button>
                                    </LinkContainer>
                                </ButtonToolbar>
                            </h2>
                        </Jumbotron>

                    </Col>
                </Row>

            </Container>
            <Container className="p-3">
                <Row>
                    <Col>
                        <Featured/>
                    </Col>
                </Row>

            </Container>

            <Container>
                <Row>
                    <Col>
                        <Menu/>
                    </Col>
                </Row>
            </Container>

            <Container>

                {
                    this.props.viewMode === ViewMode.VIEW_SHOP &&
                    <Row>
                        <Col>
                            <Breadcrumbs/>
                        </Col>
                    </Row>
                }
                {
                    this.props.viewMode === ViewMode.VIEW_SHOP &&

                    <Row className="work80vh">
                        <Col xs={12} md={3} className="">
                            <CategoryMenu/>
                            <FilteredNav/>
                        </Col>
                        <Col xs={12} md={9}>
                            <Main/>
                        </Col>
                    </Row>
                }
                {
                    this.props.viewMode === ViewMode.VIEW_CART &&
                    <Row className="work80vh">
                        <Col xs={12} md={12} className="">
                            <ShoppingCartBig/>
                        </Col>
                    </Row>
                }
                {
                    this.props.viewMode === ViewMode.VIEW_CHECKOUT &&
                    <Checkout/>
                }
                {
                    this.props.viewMode === ViewMode.VIEW_PROFILE &&
                    <Profile/>
                }

                {
                    this.props.viewMode === ViewMode.VIEW_LOGINREGISTER &&
                    <LoginRegister/>
                }

            </Container>

            <Container>
                <Row className="work40pt">
                    <Col className="wireframe">
                        Just place
                    </Col>
                </Row>
            </Container>

            <Container>
                <Row className="work40pt">
                    <Col className="wireframe">
                        <Footer/>
                    </Col>
                </Row>
            </Container>

        </BrowserRouter>;
    }

}

function mapStateToProps(state) {
    return {
        viewMode: state.viewMode
    };
}

export default connect(mapStateToProps)(App);
