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
import Form from "react-bootstrap/Form";
import React from "react";
import {
    API_URL,
    CORS_PROXY,
    getDisplayNameFromNames,
    getGetData,
    isEmpty,
    splitToKeyValue,
    getProductDisplayName
} from "../Common";
import Card from "react-bootstrap/Card";

/**
 * User: Igor Azarny iazarny@yahoo.com
 * Date: 04-Oct-2020
 * Time: 12:10:23
 */
class FormBuilder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            countries: [],
            area: []
        };
        this.readAreas = this.readAreas.bind(this);
        this.readCountries = this.readCountries.bind(this);
    }


    render() {
        return <Card>
            <Card.Header>
                {this.props.header}
            </Card.Header>
            <Card.Body>
                <Form>
                    {
                        this.props.fieldsMetaData.map((det, detIdx) => {

                            //console.info("Form builder", det.attributeCode + " " + this.props.formData[det.attributeCode]);

                            let kvChoice = [];
                            if (!isEmpty(det.attributeDisplayChoices)) {
                                kvChoice = splitToKeyValue(getDisplayNameFromNames(det.attributeDisplayChoices));
                            }

                            return <Form.Group key={'k-' + det.attributeCode} controlId={"form" + det.attributeCode}>
                                {
                                    det.attributeType !== "Boolean" &&
                                    <Form.Label>{getDisplayNameFromNames(det.attributeDisplayNames)}</Form.Label>
                                }
                                {
                                    (det.attributeType === "String" || det.attributeType === "Email") &&
                                    (det.attributeCode.indexOf("countryCode") === -1 && det.attributeCode.indexOf("stateCode") === -1) &&
                                    <Form.Control
                                        name={det.attributeCode}
                                        value={this.props.formData[det.attributeCode]}
                                        onChange={this.props.handleChange}>
                                    </Form.Control>
                                }
                                {
                                    (det.attributeType === "SecureString") &&
                                    <Form.Control
                                        name={det.attributeCode}
                                        value={this.props.formData[det.attributeCode]}
                                        onChange={this.props.handleChange}
                                        type="password">

                                    </Form.Control>
                                }
                                {
                                    (det.attributeType === "CommaSeparatedList") &&
                                    <Form.Control
                                        name={det.attributeCode}
                                        value={this.props.formData[det.attributeCode]}
                                        onChange={this.props.handleChange}
                                        as="select"
                                    >
                                        {
                                            !isEmpty(det.attributeDisplayChoices) &&
                                            kvChoice.map(
                                                (kv, kvidx) => {
                                                    return <option key={kv.key} value={kv.key}>{kv.val}</option>
                                                }
                                            )
                                        }
                                    </Form.Control>
                                }
                                {
                                    (det.attributeType === "Boolean") &&
                                    <Form.Check
                                        type="checkbox"
                                        label={getDisplayNameFromNames(det.attributeDisplayNames)}/>
                                }



                                {
                                    /*Exclusion for country list*/
                                    (det.attributeCode.indexOf("countryCode") > -1) &&
                                    <Form.Control
                                        name={det.attributeCode}
                                        value={this.props.formData[det.attributeCode]}
                                        onChange={(e) => {
                                            this.props.handleChange(e);
                                            this.readAreas(e.target.value)
                                        }}
                                        as="select"
                                    >
                                        <option key={'c--'} value={'-'}>Select country</option>
                                        {
                                            this.state.countries.map((c, cidx) => {
                                                return <option key={'c--' + c.countryCode} value={c.countryCode}>
                                                    {getProductDisplayName(c)}
                                                </option>
                                            })
                                        }
                                    </Form.Control>
                                }
                                {
                                    /*Exclusion for state list*/
                                    (det.attributeCode.indexOf("stateCode") > -1) &&
                                    <Form.Control
                                        name={det.attributeCode}
                                        value={this.props.formData[det.attributeCode]}
                                        onChange={this.props.handleChange}
                                        as="select"
                                    >
                                        <option key={'ct--'} value={'-'}>Select state</option>
                                        {
                                            this.state.area.map((a, aidx) => {
                                                return <option key={'ct--' + a.stateCode + aidx} value={a.stateCode}>
                                                    {getProductDisplayName(a)}
                                                </option>
                                            })
                                        }
                                    </Form.Control>
                                }



                            </Form.Group>
                        })
                    }

                    <Button
                        onClick={(e) => this.props.handleSubmit(e)}
                        variant="primary" type="submit">
                        Submit
                    </Button>
                    <Button
                        onClick={(e) => this.props.handleCancel(e)}
                        variant="primary" >
                        Cancel
                    </Button>
                </Form>
            </Card.Body>
        </Card>

    }

    componentDidMount() {
        this.formCheck();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.formCheck();
    }

    formCheck() {
        let anyCountry = this.props.fieldsMetaData.find(item => item.attributeCode.indexOf("countryCode") > -1);
        if (anyCountry && this.state.countries.length === 0) {
            this.readCountries();
            if (this.state.area.length === 0) {
                this.readAreas(this.props.formData[anyCountry.attributeCode]);
            }
        }
    }

    readCountries() {
        fetch(CORS_PROXY + API_URL + `/customer/addressbook/B/options/countries`, getGetData())
            .then(res => res.json())
            .then((info) => {
                this.setState({countries: info});
            })
            .catch(console.log);
    }

    readAreas(country) {
        fetch(CORS_PROXY + API_URL + `/customer/addressbook/B/options/countries/${country}`, getGetData())
            .then(res => res.json())
            .then((info) => {
                this.setState({area: info});
            })
            .catch(console.log);
    }


}


export default FormBuilder;


