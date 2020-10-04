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

import React from "react";
import './ShoppingCartBuyItemForm.css'
import {connect} from "react-redux";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ViewMode from "./../ViewMode";
import {setViewCheckoutCommand, setViewStepCommand} from "../actions";
import Nav from "react-bootstrap/Nav";

/**
 * User: Igor Azarny iazarny@yahoo.com
 * Date: 04-Oct-2020
 * Time: 12:10:23
 */
class ShoppingCartSummary extends React.Component {

    render() {
        return <Container>
            <br/>
            <Card>
                <Card.Header>
                    Summary
                </Card.Header>
                <Card.Body>
                    <span>{this.props.cart.symbol}</span> <span>{this.props.cart.total.totalAmount}</span>
                    <hr/>
                    <span>{this.props.cart.total.itemPricing.priceTaxCode}</span> <span>{this.props.cart.total.totalTax}</span>
                    <Nav.Link onClick={() => {
                        if (this.props.loginInfo == null) {
                            this.props.dispatch(setViewStepCommand(ViewMode.VIEW_CHECKOUT_STEP_0));
                        } else {
                            this.props.dispatch(setViewStepCommand(ViewMode.VIEW_CHECKOUT_STEP_3));
                        }
                        this.props.dispatch(setViewCheckoutCommand());
                    }}><Button  variant="outline-success">Checkout</Button></Nav.Link>
                </Card.Body>
            </Card>

        </Container>
    }


}


function mapStateToProps(state) {
    return {
        cart: state.cart,
        loginInfo: state.loginInfo
    };
}


export default connect(mapStateToProps)(ShoppingCartSummary);


