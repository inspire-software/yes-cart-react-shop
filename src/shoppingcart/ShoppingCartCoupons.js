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
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ShoppingCartCommand from "./ShoppingCartCommand";
import {API_URL, CORS_PROXY, getPostData} from "../Common";
import {setCartCommand} from "../actions";
import Card from "react-bootstrap/Card";

/**
 * User: Igor Azarny iazarny@yahoo.com
 * Date: 04-Oct-2020
 * Time: 12:10:23
 */
class ShoppingCartCoupons extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            coupon: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ coupon: event.target.value});
    }

    handleSubmit(event) {
        var commanData = {
            parameters: {
                [ShoppingCartCommand.CMD_ADDCOUPON] : this.state.coupon
            }
        };
        fetch(CORS_PROXY + API_URL + '/cart', getPostData(commanData))
            .then(res => res.json())
            .then((resp) => {
                this.props.dispatch(setCartCommand(resp));
                this.setState({ coupon: ''});
            })
            .catch(console.log);
        event.preventDefault();
    }

    render() {
        return <Container>
            {
                this.props.cart.appliedCoupons.lenght > 0 &&
                <Card>
                    <Card.Header>
                        Applied Coupons
                    </Card.Header>
                    <Card.Body>
                        {
                            this.props.cart.appliedCoupons.map(
                                (ac, acidx) => {
                                    return <Row key={'ac-' + ac + acidx}><Col>{ac}</Col></Row>
                                }
                            )
                        }
                    </Card.Body>
                </Card>
            }
            <br/>
            <Card>
                <Card.Header>
                    Coupons
                </Card.Header>
                <Card.Body>
                    {
                        this.props.cart.coupons.map(
                            (c, cidx) => {
                                let isApplied = this.props.cart.appliedCoupons.indexOf(c);

                                return <Row key={'c-' + c + cidx}>
                                    <Col>{c}</Col>
                                    {
                                        isApplied &&
                                        <Col>Applied</Col>
                                    }
                                    <Col> (X) </Col>
                                </Row>
                            }
                        )
                    }
                    <Form inline onSubmit={this.handleSubmit}>
                        <Form.Control value={this.state.coupon}
                                      onChange={this.handleChange}
                                      className='sku-qty'
                                      type="string" />
                        <Button  type="submit" variant="outline-success">Add coupon</Button>
                    </Form>
                </Card.Body>
            </Card>

        </Container>
    }
}


function mapStateToProps(state) {
    return {
        cart: state.cart,
    };
}


export default connect(mapStateToProps)(ShoppingCartCoupons);


