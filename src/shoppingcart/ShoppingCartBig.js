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
import {API_URL, CORS_PROXY, getPostData} from "../Common";
import {connect} from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ShoppingCartSku from "./ShoppingCartSku";
import ShoppingCartSummary from "./ShoppingCartSummary";
import ShoppingCartCoupons from "./ShoppingCartCoupons";
import ShoppingCartMessage from "./ShoppingCartMessage";

/**
 * User: Igor Azarny iazarny@yahoo.com
 * Date: 04-Oct-2020
 * Time: 12:10:23
 */
class ShoppingCartBig extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            skusDetail: null
        };

    }

    componentDidMount() {
        this.collectDetails();
    }


    /**
     * Collect skus in cart to get name and image
     */
    collectDetails() {
        let request = {
            references: []
        };

        this.props.cart.items.map((prod) => {
            request.references.push(
                {
                    "reference": prod.productSkuCode,
                    "supplier": "Main"
                }
            )
        });

        fetch(CORS_PROXY + API_URL + '/skus/list', getPostData(request))
            .then(res => res.json())
            .then((info) => {
                this.setState({skusDetail: info});

            })
            .catch(console.log);
    }


    render() {
        return <Container>
            <Row>
                <Col xs={12} md={8}>
                    <Container>
                        <Row>
                            <Col xs={12} md={6}>
                                Product
                            </Col>
                            <Col xs={12} md={2}>
                                Price
                            </Col>
                            <Col xs={12} md={2}>
                                Quantity
                            </Col>
                            <Col xs={12} md={2}>
                                Amount
                            </Col>
                        </Row>
                        <hr/>
                        {
                            this.props.cart.items.map((prod, idx) => {
                                let detail = null;
                                if (this.state.skusDetail != null){
                                    detail = this.state.skusDetail[idx]; //  todo is order the same ???
                                }
                                return <ShoppingCartSku key={idx} product={prod} detail={detail}/>
                            })
                        }
                    </Container>
                </Col>
                <Col xs={12} md={4}>
                    <Container>
                        <Row>
                            <Col xs={12} md={12}>
                                <ShoppingCartSummary />
                            </Col>
                            <Col xs={12} md={12}>
                                <ShoppingCartCoupons />
                            </Col>
                            <Col xs={12} md={12}>
                                <ShoppingCartMessage />
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>

    }


}


function mapStateToProps(state) {
    return {
        cart: state.cart,
    };
}


export default connect(mapStateToProps)(ShoppingCartBig);


