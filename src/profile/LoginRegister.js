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
import {connect} from "react-redux";
import {setViewProfileCommand} from "./../actions";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Login from "./Login";
import Register from "./Register";

/**
 * User: Igor Azarny iazarny@yahoo.com
 * Date: 04-Oct-2020
 * Time: 12:10:23
 */
class LoginRegister extends React.Component {

    static MODE_LOGIN = 'Login';
    static MODE_REGISTER = 'Register';


    constructor(props) {
        super(props);
        this.state = {
            mode: LoginRegister.MODE_LOGIN
        };
        this.onLoginOk = this.onLoginOk.bind(this);
        this.onRegisterOk = this.onRegisterOk.bind(this);
    }

    onLoginOk () {
        this.props.dispatch(setViewProfileCommand());
    };

    onRegisterOk () {
        this.props.dispatch(setViewProfileCommand());
    };

    render() {
        return <Container>
            <Row>
                <Col xs={3} md={3}>
                    &nbsp;
                </Col>
                <Col xs={6} md={6}>
                    {
                        this.state.mode === LoginRegister.MODE_LOGIN &&
                        <Login onLogin={ () => this.onLoginOk() }/>
                    }
                    {
                        this.state.mode === LoginRegister.MODE_LOGIN &&
                        <Button
                            onClick={(e) => this.setState({ mode: LoginRegister.MODE_REGISTER})}>
                            Register
                        </Button>

                    }
                    {
                        this.state.mode === LoginRegister.MODE_REGISTER &&
                        <Register onRegister={ () => this.onRegisterOk() } />
                    }
                    {
                        this.state.mode === LoginRegister.MODE_REGISTER &&
                        <Button
                            onClick={(e) => this.setState({ mode: LoginRegister.MODE_LOGIN})}>
                            Login
                        </Button>
                    }
                </Col>
                <Col xs={3} md={3}>
                    &nbsp;
                </Col>
            </Row>
        </Container>

    }


}


function mapStateToProps(state) {
    return {
        cart: state.cart,
        viewStep:  state.viewStep,
        loginInfo: state.loginInfo
    };
}


export default connect(mapStateToProps)(LoginRegister);


