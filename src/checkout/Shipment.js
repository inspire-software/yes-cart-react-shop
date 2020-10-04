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
import {API_URL, getProductDisplayName, CORS_PROXY, getGetData} from "../Common";
import {connect} from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
/**
 * User: Igor Azarny iazarny@yahoo.com
 * Date: 04-Oct-2020
 * Time: 12:10:23
 */
/**
 * At this moment only 1 supplier is supported.
 */
class Shipment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            shippingOptions: null
        };
        this.findCarrierById = this.findCarrierById.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.collectOptions = this.collectOptions.bind(this);
    }

    componentDidMount() {
        //this.collectOptions();
    }

    componentDidUpdate(preProps, prevState, currentSnapshot) {

        if (!this.state.shippingOptions && this.props.loginInfo) {
            this.collectOptions();
        }
    }


    collectOptions() {
        fetch(CORS_PROXY + API_URL + `/cart/options/shipping`, getGetData())
            .then(res => res.json())
            .then((info) => {
                this.setState({shippingOptions: info});
            })
            .catch(console.log);
    }

    handleSelect(cs) {

        let req = {
            "billingAddressId": this.props.cart.orderInfo.billingAddressId,
            "deliveryAddressId": this.props.cart.orderInfo.deliveryAddressId,
            "shippingMethods": {
                "selected": [
                    {
                        "carrierSlaId": cs.carrierslaId,
                        "supplier": "Main"
                    }
                ]
            }
        }

        console.info("Selected", cs, this.props.cart, req);


    }

    findCarrierById(id) {
        return this.state.shippingOptions[0].carriers.find(i => i.carrierId === id);
    }

    render() {
        console.info("eeeeeeeeeeeeeeeeeeeeeeeeee", this.state.shippingOptions);
        return <Container>

            {
                this.state.shippingOptions && this.state.shippingOptions.length > 0 &&
                <Card>
                    <Card.Header>
                        Shipping options
                    </Card.Header>
                    <Card.Body>
                        {
                            this.state.shippingOptions[0].sortedSla.map((cs, csidx) => {
                                return <Row key={"cs-" + cs.carrierslaId + cs.code}>
                                    <Col xs={1} md={1}>
                                        <Form.Check
                                            onClick={() => {
                                                this.handleSelect(cs);
                                            }}
                                            custom
                                            type={'radio'}
                                            label={``}
                                            id={`csla-${csidx}`}
                                            checked={false}
                                            readOnly={true}
                                        />


                                    </Col>
                                    <Col xs={11} md={11}>
                                        {getProductDisplayName(cs)} by {getProductDisplayName(this.findCarrierById(cs.carrierId))}
                                    </Col>
                                </Row>
                            })
                        }
                    </Card.Body>
                </Card>
            }
        </Container>
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart,
        viewStep: state.viewStep,
        loginInfo: state.loginInfo
    };
}


export default connect(mapStateToProps)(Shipment);


