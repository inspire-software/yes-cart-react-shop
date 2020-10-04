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
import {API_URL, copyFields, CORS_PROXY, getGetData, getPostData} from "../Common";
import {connect} from "react-redux";
import {setLoginInfoCommand} from "./../actions";
import FormBuilder from "./FormBuilder";

/**
 * User: Igor Azarny iazarny@yahoo.com
 * Date: 04-Oct-2020
 * Time: 12:10:23
 */
class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formDetail : {
                custom: []
            },
            formData : {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    onRegister() {
        if (this.props.onRegister) {
            this.props.onRegister();
        }
    }

    handleSubmit(event) {

        let regReq = {
            custom: {},
            customerType: "B2C",
            email: this.state.formData.email,
        };

        copyFields( this.state.formData, regReq.custom);

        //Copy fields
        //for (var key in this.state.formData) {
          //  regReq.custom[key] = this.state.formData[key];
        //}

        fetch(CORS_PROXY + API_URL + '/auth/register', getPostData(regReq))
            .then(res => res.json())
            .then((resp) => {
                if (resp.authenticated) {
                    this.props.dispatch(setLoginInfoCommand(resp));
                    this.onRegister();
                }
                console.info("Submit res ", this.state, regReq, resp);
            })
            .catch(console.log);
        console.info("Submit", this.state, regReq);
        event.preventDefault();
    }


    handleChange(event) {
        let fieldName = event.target.name;
        let fleldVal = event.target.value;
        this.setState({formData: {...this.state.formData, [fieldName]: fleldVal}})
    }

    componentDidMount() {
        fetch(CORS_PROXY + API_URL + '/auth/register?customerType=B2C', getGetData())
            .then(res => res.json())
            .then((info) => {
                info.custom.map(  (det,detIdx) => {
                    let aval = det.val;
                    if (!aval) {
                        aval = '';
                    }
                    this.state.formData[det.attributeCode] = aval;

                });
                this.setState({formDetail: info});

            })
            .catch(console.log);
    }


    render() {

        return <FormBuilder header="New customer"
                            fieldsMetaData={this.state.formDetail.custom}
                            formData={this.state.formData}
                            handleChange={this.handleChange}
                            handleSubmit={this.handleSubmit} />

    }


}


function mapStateToProps(state) {
    return {
        cart: state.cart,
    };
}


export default connect(mapStateToProps)(Register);


