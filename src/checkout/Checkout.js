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

import Button from "react-bootstrap/Button";
import React from "react";
import './../shoppingcart/ShoppingCartBuyItemForm.css'
import {getGetData} from "../Common";
import {connect} from "react-redux";
import { setViewStepCommand} from "./../actions";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Login from "./../profile/Login";
import Register from "./../profile/Register";
import {Tab, Tabs} from "react-bootstrap";
import ViewMode from "../ViewMode";
import Address from "../profile/Address";
import Shipment from "./Shipment";
import Form from "react-bootstrap/Form";

/**
 * User: Igor Azarny iazarny@yahoo.com
 * Date: 04-Oct-2020
 * Time: 12:10:23
 */
class Checkout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            wtf: null
        };
        this.onLoginOk = this.onLoginOk.bind(this);
        this.onRegisterOk = this.onRegisterOk.bind(this);
        this.handleSeparateBillingAddress = this.handleSeparateBillingAddress.bind(this);
    }

    onLoginOk () {
        this.props.dispatch(setViewStepCommand(ViewMode.VIEW_CHECKOUT_STEP_1));
    };

    onRegisterOk () {
        this.props.dispatch(setViewStepCommand(ViewMode.VIEW_CHECKOUT_STEP_1));
    };

    handleSeparateBillingAddress (e) {

        let billingAddressId = this.props.cart.orderInfo.billingAddressId;


        let commanData = {
            parameters: {
                'shippingSameAsBilling' : !e.target.checked,
                'addressId' : billingAddressId
            }
        }

        console.info(">>>>>>>>>>!!!!>>>>>>>>>" , e.target.checked, commanData, this.props.cart);



        /*{"addressId":"100023","shippingSameAsBilling":true}*/

        /*var commanData = {
            parameters: {
                [ShoppingCartCommand.CMD_SEPARATEBILLING] : !e.target.checked
            }
        };

        console.info(">>>>>>>>>>>>>>>>>>>" , commanData);
        fetch(CORS_PROXY + API_URL + '/cart', getPostData(commanData))
            .then(res => res.json())
            .then((resp) => {
                //this.props.dispatch(setCartCommand(resp));
                //this.setState({ coupon: ''});
                console.info("<<<<<<<<<<<<<<<<<<<<" , resp);
            })
            .catch(console.log);
        e.preventDefault();*/

    };

    render() {
        console.info("Checkout::render", this.props.viewStep, this.props.cart, getGetData());
        return <Container>
            <Tabs activeKey={this.props.viewStep} onSelect={(k) => {this.props.dispatch(setViewStepCommand(k))}}  >
                <Tab eventKey={ViewMode.VIEW_CHECKOUT_STEP_0} title="Log in" disabled={this.props.loginInfo != null}>
                    <Row>
                        <Col xs={12} md={6}>
                            <Container>
                                <Row>
                                    <Col xs={12} md={12}>
                                        <Login onLogin={ () => this.onLoginOk() }/>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                        <Col xs={12} md={6}>
                            <Container>
                                <Row>
                                    <Col xs={12} md={12}>
                                        Guest checkout
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Register onRegister={ () => this.onRegisterOk() } />
                        </Col>
                    </Row>
                </Tab>
                <Tab eventKey={ViewMode.VIEW_CHECKOUT_STEP_1} title="Your Address" disabled={this.props.loginInfo == null}>

                    <Row>
                        <Col>
                            {
                                'TODO && ' +  this.props.cart.orderInfo.separateBillingAddressEnabled
                            }
                            <Form>
                                    <Form.Group>
                                        <Form.Check
                                            onChange={this.handleSeparateBillingAddress}
                                            type="checkbox"
                                            label={'Billing address is the same as shipping'}
                                            checked={!this.props.cart.orderInfo.separateBillingAddress}

                                        />
                                    </Form.Group>
                            </Form>


                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Address showBillingAddresses={this.props.cart.orderInfo.separateBillingAddress} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {JSON.stringify(this.props.cart)}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button
                                variant="outline-success"
                                onClick={ (e) => {this.props.dispatch(setViewStepCommand(ViewMode.VIEW_CHECKOUT_STEP_2))}  }>Shipping Method &gt;</Button>
                        </Col>
                    </Row>

                </Tab>
                <Tab eventKey={ViewMode.VIEW_CHECKOUT_STEP_2} title="Shipping Method" disabled={this.props.loginInfo == null}>
                    <Row>
                        <Col>
                            <Shipment />

                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button
                                variant="outline-success"
                                onClick={ (e) => {this.props.dispatch(setViewStepCommand(ViewMode.VIEW_CHECKOUT_STEP_3))}  }>Payment &gt;</Button>

                        </Col>
                    </Row>

                </Tab>
                <Tab eventKey={ViewMode.VIEW_CHECKOUT_STEP_3} title="Payment" disabled={this.props.loginInfo == null}>
                    <Row>
                        <Col>
                            Fire !!!!
                        </Col>
                    </Row>
                </Tab>
            </Tabs>
        </Container>

    }


}


function mapStateToProps(state) {
    return {
        cart: state.cart,
        viewStep:  state.viewStep,
        loginInfo: state.loginInfo
    };
}


export default connect(mapStateToProps)(Checkout);


