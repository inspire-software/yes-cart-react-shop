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
class DeleteAccount extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            showNote : false
        };
    }

    handleSubmit(event) {
        const postData = getPostData(null);

        fetch(CORS_PROXY + API_URL + `/auth/deleteaccount`, postData)
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
                Delete account
            </Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group controlId="formBasicDeleteAcc">
                        {
                            this.state.showNote &&
                            <Form.Text
                                className="text-muted">
                                Deletion request has been sent to your email. Please check it
                            </Form.Text>

                        }
                        {
                            !this.state.showNote &&
                            <Form.Text
                                className="text-muted">
                                Account deletion request will be send to you via email after clicking "Delete account"
                                button
                            </Form.Text>

                        }
                        {
                            this.props.customerSummary &&
                            <Button
                                onClick={(e) => this.handleSubmit(e)}
                                variant="danger" type="submit">
                                Delete account
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


export default connect(mapStateToProps)(DeleteAccount);


