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
import {API_URL, CORS_PROXY, getPostData} from "../Common";
import {connect} from "react-redux";
import {setLoginInfoCommand} from "./../actions";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";

/**
 * User: Igor Azarny iazarny@yahoo.com
 * Date: 04-Oct-2020
 * Time: 12:10:23
 */
class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            login: 'azarny@gmail.com',
            pwd: 'Password123!@#',
            showForgotPwdLink : false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeLogin = this.handleChangeLogin.bind(this);
        this.handleChangePwd = this.handleChangePwd.bind(this);
    }

    handleSubmit(event) {
        let loginRequest = {
            "activate": true,
            "password": this.state.pwd,
            "username": this.state.login
        };
        fetch(CORS_PROXY + API_URL + '/auth/login', getPostData(loginRequest))
            .then(res => res.json())
            .then((resp) => {
                this.setState({ showForgotPwdLink: !resp.authenticated});
                if (resp.authenticated) {
                    this.setState({ login: ''});
                    this.setState({ pwd: ''});
                    this.props.dispatch(setLoginInfoCommand(resp));
                    this.onLogin();

                }
            })
            .catch(console.log);
        event.preventDefault();
    }

    onLogin() {
        if (this.props.onLogin) {
            this.props.onLogin();
        }
    }

    handleChangeLogin(event) {
        this.setState({ login: event.target.value});
    }

    handleChangePwd(event) {
        this.setState({ pwd: event.target.value});
    }

    render() {
        return <Card>
            <Card.Header>
                Login
            </Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            value={this.state.login}
                            onChange={this.handleChangeLogin}
                            name="email"
                            type="email"
                            placeholder="Enter email" />
                        <Form.Text
                            className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            value={this.state.pwd}
                            onChange={this.handleChangePwd}
                            name="password"
                            type="password"
                            placeholder="Password" />
                    </Form.Group>
                    <Button
                        onClick={(e) => this.handleSubmit(e)}
                        variant="primary" type="submit">
                        Submit
                    </Button>
                    <Form.Group controlId="formBasicAction">
                        {
                            this.state.showForgotPwdLink &&
                            <Nav.Link onClick={() => {
                                console.info("TODO forgot pwd link")
                            }}>Forgot password</Nav.Link>
                        }
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>

    }


}


function mapStateToProps(state) {
    return {
        cart: state.cart,
    };
}


export default connect(mapStateToProps)(Login);


