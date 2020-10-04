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
import {connect} from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Password from "./Password";
import Email from "./Email";
import AdditionalInfo from "./AdditionalInfo";
import DeleteAccount from "./DeleteAccount";
import {API_URL, CORS_PROXY, getGetData} from "../Common";
import {setCustomerSummaryCommand} from "../actions";
import Address from "./Address";

/**
 * User: Igor Azarny iazarny@yahoo.com
 * Date: 04-Oct-2020
 * Time: 12:10:23
 */
class Profile extends React.Component {


    componentDidMount() {
        fetch(CORS_PROXY + API_URL + '/customer/summary', getGetData())
            .then(res => res.json())
            .then((resp) => {
                this.props.dispatch(setCustomerSummaryCommand(resp));
            })
            .catch(console.log);
    }

    render() {
        return <Container>
            <Row>
                <Col>
                    &nbsp;
                    <Email />
                </Col>
            </Row>
            <Row>
                <Col>
                    &nbsp;
                    <AdditionalInfo />
                </Col>
            </Row>
            <Row>
                <Col>
                    &nbsp;
                    <Password />
                </Col>
                <Col>
                    &nbsp;
                    <DeleteAccount />
                </Col>
            </Row>
            <Row>
                <Col>
                    &nbsp;
                    <Address  showBillingAddresses={true}/>
                </Col>
            </Row>
        </Container>
    }
}

function mapStateToProps(state) {
    return {
        loginInfo: state.loginInfo,
        customerSummary: state.customerSummary
    };
}


export default connect(mapStateToProps)( Profile);


