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
import './ShoppingCartBuyItemForm.css'
import {API_URL, CORS_PROXY, getPostData} from "../Common";
import {connect} from "react-redux";
import {setCartCommand} from "./../actions";
import ShoppingCartCommand from "./ShoppingCartCommand";

/**
 * User: Igor Azarny iazarny@yahoo.com
 * Date: 04-Oct-2020
 * Time: 12:10:23
 */
class ShoppingCartBuyItemForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            qty: 1
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ qty: event.target.value});
        console.info("event.target.value " + event.target.value);
    }

    handleSubmit(event) {
        console.info('Buy ' + this.state.qty + " code " + this.props.skuCode );

        var commanData = {
            parameters: {
                [ShoppingCartCommand.CMD_ADDTOCART] : this.props.skuCode,
                [ShoppingCartCommand.CMD_P_QTY] : this.state.qty,
                [ShoppingCartCommand.CMD_P_SUPPLIER] : 'Main'
            }

        };


        fetch(CORS_PROXY + API_URL + '/cart', getPostData(commanData))
            .then(res => res.json())
            .then((resp) => {
                this.props.dispatch(setCartCommand(resp));
            })
            .catch(console.log);



        event.preventDefault();
    }

    render() {
        return <Form inline onSubmit={this.handleSubmit}>
            {
                this.props.showQty &&
                <Form.Control value={this.state.qty}
                             onChange={this.handleChange}
                             className='sku-qty'
                             min={0}
                             type="number" />
            }
            <Button  type="submit" variant="outline-success">Buy</Button>
        </Form>

    }


}


function mapStateToProps(state) {
    return {
        cart: state.cart,
    };
}


export default connect(mapStateToProps)(ShoppingCartBuyItemForm);


