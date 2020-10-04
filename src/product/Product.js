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
import {connect} from "react-redux";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'


import {getProductDisplayDescription, getProductDisplayName, IMG_URL} from '../Common.js'
import {setProductCommand} from "../actions";
import Nav from "react-bootstrap/Nav";
import ShoppingCartBuyItemForm from "../shoppingcart/ShoppingCartBuyItemForm";
import Price from "../price/Price";

/**
 * User: Igor Azarny iazarny@yahoo.com
 * Date: 04-Oct-2020
 * Time: 12:10:23
 */
class Product extends React.Component {


    componentDidMount() {


    }


    render() {


        return (
            <React.Fragment>
                {

                    <Card>
                        {
                            this.props.showHead &&
                            <Card.Header>
                                <Nav.Link onClick={() => {
                                    this.props.dispatch(setProductCommand(this.props.product))
                                }}>{getProductDisplayName(this.props.product)}
                                </Nav.Link>
                            </Card.Header>
                        }
                        <Card.Body>
                            <Nav.Link onClick={() => {
                                this.props.dispatch(setProductCommand(this.props.product))
                            }}>
                                {
                                    this.props.showPrice &&
                                    <Row>
                                        <Col xs={12} md={12} className="product-price">
                                            <Price price = {this.props.product.price}/>
                                        </Col>
                                    </Row>
                                }
                            </Nav.Link>
                                {
                                    this.props.showPrice &&
                                    <Row>
                                        <Col xs={12} md={12} className="product-buy">
                                            <ShoppingCartBuyItemForm  skuCode={this.props.product.defaultSkuCode} showQty={false} />
                                        </Col>
                                    </Row>
                                }
                            <Nav.Link onClick={() => {
                                this.props.dispatch(setProductCommand(this.props.product))
                            }}>
                                <Row>
                                    <Col xs={12} md={12} className="product-image">
                                        <Image width={this.props.imgWidth} height={this.props.imgHeight}
                                               src={IMG_URL + this.props.product.defaultImage + '?w=' + this.props.imgWidth + '&h=' + this.props.imgHeight}/>
                                    </Col>
                                </Row>
                                {
                                    this.props.showCode &&
                                    <Row>
                                        <Col xs={12} md={12}>
                                            <p align='center'>
                                                {this.props.product.defaultSkuCode}
                                            </p>
                                        </Col>
                                    </Row>
                                }
                            </Nav.Link>
                            {
                                this.props.showDescription &&
                                <Row>
                                    <Col xs={12} md={12}>
                                        <hr/>
                                        <p align='justify' className="product-description">
                                            {getProductDisplayDescription(this.props.product)}
                                        </p>
                                    </Col>
                                </Row>
                            }
                        </Card.Body>
                    </Card>


                }
            </React.Fragment>
        );
    }
}


function mapStateToProps(state) {
    return {
        //categoryNavigationData: state.categoryNavigationData,
        //filterParameters: state.filterParameters
    };
}

export default connect(mapStateToProps)(Product);




