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

import Form from "react-bootstrap/Form";
import React from "react";
import './ShoppingCartBuyItemForm.css'
import {API_URL, CORS_PROXY, getPostData, getProductDisplayName, IMG_URL} from "../Common";
import {connect} from "react-redux";
import {setCartCommand} from "./../actions";
import ShoppingCartCommand from "./ShoppingCartCommand";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

/**
 * User: Igor Azarny iazarny@yahoo.com
 * Date: 04-Oct-2020
 * Time: 12:10:23
 */
class ShoppingCartSku extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }


    handleRemove(event) {
        let cmd = {
            parameters: {
                [ShoppingCartCommand.CMD_REMOVEALLSKU] : this.props.product.productSkuCode,
                [ShoppingCartCommand.CMD_P_SUPPLIER] : 'Main'
            }
        };

        this.executeFetch(cmd);
    }

    handleChange(event) {
        //this.setState({ qty: event.target.value});
        console.info("event.target.value " + event.target.value);

        let cmd = {
            parameters: {
                [ShoppingCartCommand.CMD_SETQTYSKU] : this.props.product.productSkuCode,
                [ShoppingCartCommand.CMD_P_QTY] : event.target.value,
                [ShoppingCartCommand.CMD_P_SUPPLIER] : 'Main'
            }
        };

        this.executeFetch(cmd);
    }


    executeFetch(cmd) {
        fetch(CORS_PROXY + API_URL + '/cart', getPostData(cmd))
            .then(res => res.json())
            .then((resp) => {
                this.props.dispatch(setCartCommand(resp));
            })
            .catch(console.log);
    }

    render() {
        let name = ' ';
        let imageUrl = null;
        if (this.props.detail) {
            name = getProductDisplayName(this.props.detail);
            //imageUrl = IMG_URL + this.props.detail.defaultImage + '?w=400&h=400'
            this.props.detail.attributes.map((av) => {
                if (av.attributeCode.startsWith('IMAGE0')) {
                    imageUrl = IMG_URL + av.val+ '?w=400&h=400';
                }
            });
        }


        return <Row>
            <Col xs={12} md={6}>
                <Container>
                    <Row>
                        <Col xs={12} md={3}>
                            {
                                imageUrl &&
                                    <Image width={64}  src={imageUrl}/>
                            }
                        </Col>
                        <Col xs={12} md={9}>
                            <span>{name}</span>
                            <hr/>
                            <span>SKU code {this.props.product.productSkuCode}</span>
                        </Col>
                    </Row>
                </Container>

            </Col>
            <Col xs={12} md={2}>
                {this.props.product.unitPricing.symbol}
                {this.props.product.unitPricing.regularPrice}
                <hr/>
                {this.props.product.unitPricing.priceTaxCode}
                {this.props.product.unitPricing.priceTax}
            </Col>
            <Col xs={12} md={2}>
                <Form.Control value={this.props.product.unitPricing.quantity}
                              onChange={this.handleChange}
                              className='sku-qty'
                              min={1}
                              type="number" />

                <Nav.Link onClick={this.handleRemove}>&#10060;</Nav.Link>
            </Col>
            <Col xs={12} md={2}>
                {this.props.product.totalPricing.symbol}
                {this.props.product.totalPricing.regularPrice}
                <hr/>
                {this.props.product.totalPricing.priceTaxCode}
                {this.props.product.totalPricing.priceTax}
            </Col>
        </Row>
    }


}


function mapStateToProps(state) {
    return {
        cart: state.cart,
    };
}


export default connect(mapStateToProps)(ShoppingCartSku);
