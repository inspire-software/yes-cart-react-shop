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
import {connect} from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {API_URL, CORS_PROXY, getPostData} from "../Common";

/**
 * User: Igor Azarny iazarny@yahoo.com
 * Date: 04-Oct-2020
 * Time: 12:10:23
 */
class Password extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showNote : false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        fetch(CORS_PROXY + API_URL + `/auth/resetpassword?email=${this.props.customerSummary.email}`, getPostData(null))
            .then(res => res.json())
            .then((resp) => {

                this.setState({showNote:  true});

            })
            .catch(console.log);
        event.preventDefault();
    }

    render() {
        return <Card>
            <Card.Header>
                Password
            </Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group controlId="formBasicPwdChange">
                        {
                            this.state.showNote &&
                            <Form.Text
                                className="text-muted">
                                Password request has been sent to you via email
                            </Form.Text>
                        }
                        {
                            !this.state.showNote &&
                            <Form.Text
                                className="text-muted">
                                New password request will be send to you via email after clicking "Change password" button
                            </Form.Text>
                        }
                        {
                            this.props.customerSummary &&
                            <Button
                                onClick={(e) => this.handleSubmit(e)}
                                variant="warning" type="submit">
                                Reset
                            </Button>
                        }
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    }
}


function mapStateToProps(state) {
    return {
        customerSummary: state.customerSummary
    };
}


export default connect(mapStateToProps)(Password);


