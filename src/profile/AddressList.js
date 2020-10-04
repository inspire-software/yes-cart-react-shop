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
import {
    API_URL,
    copyFields,
    CORS_PROXY,
    getGetData,
    getPostData,
    addPrefix,
    deleteIfNull,
    filterFields
} from "../Common";
import {connect} from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import ViewMode from "../ViewMode";
import FormBuilder from "./FormBuilder";
import './AddressList.css'
import Nav from "react-bootstrap/Nav";

/**
 * User: Igor Azarny iazarny@yahoo.com
 * Date: 04-Oct-2020
 * Time: 12:10:23
 */
class AddressList extends React.Component {

    static MODE_LIST = 'List';
    static MODE_EDIT = 'Edit';
    static MODE_CREATE = 'Create';

    constructor(props) {
        super(props);

        this.state = {
            mode: AddressList.MODE_LIST,
            formDetail: {
                custom: []
            },
            formData: {},
            addrs: null

        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.collectAddresses = this.collectAddresses.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSelectDefault = this.handleSelectDefault.bind(this);
    }

    componentDidMount() {
        this.collectAddresses();
    }

    componentDidUpdate(preProps, prevState, currentSnapshot) {
        if (this.state.addrs == null && this.props.viewStep === ViewMode.VIEW_CHECKOUT_STEP_0) {
            this.collectAddresses();
        }
    }


    collectAddresses() {
        if (this.props.loginInfo) {
            fetch(CORS_PROXY + API_URL + `/customer/addressbook/${this.props.type}/address`, getGetData())
                .then(res => res.json())
                .then((info) => {
                    this.setState({formDetail: info});
                })
                .catch(console.log);

            fetch(CORS_PROXY + API_URL + `/customer/addressbook/${this.props.type}`, getGetData())
                .then(res => res.json())
                .then((info) => {
                    this.setState({addrs: info});
                })
                .catch(console.log);
        }
    }

    handleChange(event) {
        let fieldName = event.target.name;
        let fleldVal = event.target.value;
        this.setState({formData: {...this.state.formData, [fieldName]: fleldVal}});
    }

    handleEdit(addr) {
        copyFields(addr, this.state.formData);
        //This is inconsistency fix
        this.state.formData['addressline1'] = this.state.formData['addrline1'];
        this.state.formData['addressline2'] = this.state.formData['addrline2'];

        addPrefix(this.state.formData, 'default_');
        this.setState({mode: AddressList.MODE_EDIT});
    }

    handleSelectDefault(addr) {
        let id = addr.addressId;
        addPrefix(addr, "default_");
        filterFields(addr,
            ['default_defaultAddress', 'default_addressId'
            ]);
        this.postAddressChanges(id, addr, true);
    }

    handleSubmit(event) {
        let custom = {};
        let addressId = 0;
        let addressIdField = this.state.formData['default_addressId']; //todo remove  hardcode
        if (addressIdField) {
            addressId = addressIdField;
        }
        deleteIfNull(this.state.formData);
        //filter fields , allow presented in form only TODO get field list from form
        filterFields(this.state.formData,
            ['default_addressline1', 'default_addressline2',
                'default_city', 'default_countryCode', 'default_firstname',
                'default_lastname', 'default_salutation', 'default_postcode',
                'default_stateCode'
            ]);
        copyFields(this.state.formData, custom);
        this.postAddressChanges(addressId, custom, true); //addr.defaultAddress
    }

    postAddressChanges(addressId, custom, defAddr) {
        let req = {
            'addressId': addressId,
            'addressName': 'ns' + addressId,
            'addressType': this.props.type,
            'defaultAddress': defAddr,
            'custom': custom
        };
        fetch(CORS_PROXY + API_URL + '/customer/addressbook', getPostData(req))
            .then(res => res.json())
            .then((resp) => {
                this.collectAddresses();
                this.setState({mode: AddressList.MODE_LIST});
            })
            .catch(console.log);

    }

    handleCancel() {
        this.setState({mode: AddressList.MODE_LIST});
    }


    render() {
        return <Container>

            {
                (this.state.mode === AddressList.MODE_CREATE || this.state.mode === AddressList.MODE_EDIT) &&
                <FormBuilder header={`Create new address ${this.props.type}`}
                             fieldsMetaData={this.state.formDetail.custom}
                             formData={this.state.formData}
                             handleCancel={this.handleCancel}
                             handleChange={this.handleChange}
                             handleSubmit={this.handleSubmit}/>
            }

            {
                this.state.addrs != null && this.state.mode === AddressList.MODE_LIST &&
                <Card>
                    <Card.Header>
                        Address type {this.props.type}
                    </Card.Header>
                    <Card.Body>
                        <Button
                            variant="outline-success"
                            onClick={(e) => {
                                this.setState({mode: AddressList.MODE_CREATE})
                            }}>Create</Button> {
                        this.state.addrs.map((a, aidx) => {
                            const singleAddress = a;
                            return <Row key={"a-" + this.props.type + aidx + '-' + singleAddress.addressId}>
                                <Col xs={1} md={1}>
                                    <input
                                        onClick={(e) => {
                                            this.handleSelectDefault(singleAddress);
                                        }}
                                        readOnly={true} type="radio" checked={singleAddress.defaultAddress} />

                                </Col>
                                <Col xs={11} md={11}>
                                    <Nav.Link onClick={(e) => {
                                        this.handleEdit(singleAddress);
                                    }}>
                                        {singleAddress.salutation} {singleAddress.firstname} {singleAddress.lastname}
                                        {singleAddress.addrline1} {singleAddress.addrline2}
                                        {singleAddress.city} {singleAddress.postcode} {singleAddress.countryName} - {singleAddress.stateName}
                                    </Nav.Link>
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
        viewStep: state.viewStep,
        loginInfo: state.loginInfo
    };
}

export default connect(mapStateToProps)(AddressList);
