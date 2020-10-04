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
import Container from 'react-bootstrap/Container';
import MainSkuAttr from './MainSkuAttr';
import Nav from 'react-bootstrap/Nav'
import {Tab, Tabs} from 'react-bootstrap';
import {setSkuCommand} from '../actions.js'
import {API_URL, CORS_PROXY, getGetData, getProductDisplayName} from '../Common.js'
import {getProductDisplayDescription, IMG_URL} from "../Common";
import Association, {CROSS_SELL} from "./Association";
import '../Common.css'
import './MainSku.css';
import ShoppingCartBuyItemForm from "./../shoppingcart/ShoppingCartBuyItemForm";
import Price from "./../price/Price";
/**
 * User: Igor Azarny iazarny@yahoo.com
 * Date: 04-Oct-2020
 * Time: 12:10:23
 */
class MainSku extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            altImages: []
        };
        this.onSkuChange = this.onSkuChange.bind(this);
        this.fillImgs = this.fillImgs.bind(this);
    }

    componentDidMount() {
        if (this.props.prodItemCurrentProduct.skus.length === 1) {
            this.fillImgs(false, this.props.prodItemCurrentProduct.id);
        } else {
            let exactSku = this.props.prodItemCurrentProduct.skus.find( (s,sidx ) => { return s.code === this.props.prodItemCurrentProduct.defaultSkuCode } );
            this.fillImgs(true, exactSku.id);
        }
    }


    //TODO not optimal to ask av for images
    fillImgs(isSku, id) {
        let url;
        if (isSku) {
            url = CORS_PROXY + API_URL + `/skus/${id}/supplier/Main`;
        } else {
            url = CORS_PROXY + API_URL + `/products/${id}/supplier/Main`;
        }
        fetch(url, getGetData())
            .then(res => res.json())
            .then((info) => {
                let imgs = [];
                info.attributes.map((av) => {
                    if (av.attributeCode.startsWith('IMAGE')) {
                        imgs.push(av.val)
                    }
                });
                this.setState({altImages: imgs});
            })
            .catch(console.log);
    }


    onSkuChange(sku) {
        this.props.dispatch(setSkuCommand(sku));
        this.setState({altImages: []});
        this.fillImgs(true, sku.id);
    }


    render() {
        let skuChangeHandler = this.onSkuChange;

        let skuCode = this.props.prodItemCurrentProduct.defaultSkuCode;
        let skuName = getProductDisplayName(this.props.prodItemCurrentProduct);

        if (this.props.prodItemCurrentSku != null) {
            skuCode = this.props.prodItemCurrentSku.code;
            skuName = getProductDisplayName(this.props.prodItemCurrentSku);
        }

        return (
            <React.Fragment>
                {
                    <Card>
                        <Card.Header>
                            {skuName} /{skuCode}
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col xs={12} md={6} className="product-image">
                                    <Container>
                                        <Row>
                                            <Col xs={12} md={12} className="product-image">
                                                {
                                                    this.props.prodItemCurrentSku != null &&
                                                    <Image width={320}
                                                           src={IMG_URL + this.props.prodItemCurrentSku.defaultImage + '?w=400&h=400'}/>
                                                }
                                                {
                                                    this.props.prodItemCurrentSku == null &&
                                                    <Image width={320}
                                                           src={IMG_URL + this.props.prodItemCurrentProduct.defaultImage + '?w=400&h=400'}/>
                                                }
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12} md={12}>
                                                {
                                                    this.state.altImages.map((value, idx) => {
                                                        return <Image width={100} height={100} key={'i' + value + idx}
                                                                      src={IMG_URL + value + '?w=200&h=200'}/>
                                                    })
                                                }
                                            </Col>
                                        </Row>
                                    </Container>


                                </Col>
                                <Col xs={12} md={3}>
                                    {
                                        this.props.prodItemCurrentProduct.multisku === true &&
                                        this.props.prodItemCurrentProduct.skus.map((s, sidx) => {
                                            return <Nav.Link key={s.code + sidx}
                                                             onClick={() => skuChangeHandler(s)}>{s.code}</Nav.Link>
                                        })
                                    }

                                </Col>
                                <Col xs={12} md={3}>
                                    <Price price = {this.props.prodItemCurrentProduct.price}/>
                                    <ShoppingCartBuyItemForm skuCode={skuCode} showQty={true}/>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={12} md={12} id="descr-attr-tab">
                                    <Tabs defaultActiveKey="Description">
                                        <Tab eventKey="Description" title="Description">
                                            <p align='justify' className="sku-description">
                                                {getProductDisplayDescription(this.props.prodItemCurrentProduct)}
                                            </p>
                                        </Tab>
                                        <Tab eventKey="Attributes" title="Attributes">
                                            <div align='justify' className="sku-description">
                                                {
                                                    this.props.prodItemCurrentSku != null &&
                                                    <MainSkuAttr id={this.props.prodItemCurrentSku.id}
                                                                 isProduct={false}
                                                                 supplier={'Main'}/>
                                                }
                                                {
                                                    this.props.prodItemCurrentSku == null &&
                                                    <MainSkuAttr id={this.props.prodItemCurrentProduct.id}
                                                                 isProduct={true}
                                                                 supplier={'Main'}/>
                                                }

                                            </div>
                                        </Tab>
                                        <Tab eventKey="Dump" title="Dump">
                                            <p align='justify' className="sku-description">
                                                {JSON.stringify(this.props.prodItemCurrentProduct)}
                                            </p>
                                        </Tab>

                                    </Tabs>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={12} md={12}>
                                    <Association associationType={CROSS_SELL}/>
                                </Col>
                            </Row>

                        </Card.Body>


                    </Card>
                }
            </React.Fragment>
        );
    }
}


function mapStateToProps(state) {
    return {
        prodItemCurrentProduct: state.prodItemCurrentProduct,
        prodItemCurrentSku: state.prodItemCurrentSku
    };
}


export default connect(mapStateToProps)(MainSku);




