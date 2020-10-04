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
import './ShoppingCartBuyItemForm.css'
import {connect} from "react-redux";
import {setViewCartCommand} from "./../actions";
import Price from "../price/Price";
import Nav from "react-bootstrap/Nav";

/**
 * User: Igor Azarny iazarny@yahoo.com
 * Date: 04-Oct-2020
 * Time: 12:10:23
 */
class ShoppingCartSmall extends React.Component {


    render() {
        let cart = this.props.cart;
        let qty = 0;
        let price = null;
        let taxCode = '';
        if (cart != null) {
            qty = cart.items.reduce( (acc, item) => {  return item.quantity + acc}, 0 );
            taxCode = cart.total.itemPricing.priceTaxCode; //cart.items[0].taxCode;
            price = {
                symbol : cart.symbol,
                regularPrice : cart.total.totalAmount,
                priceTaxCode : taxCode,
                priceTax : cart.total.totalTax
            }
        }

        return <div>
            {
                cart == null &&
                    <span>&#128722;</span>
            }

            {
                cart != null &&
                <Nav.Link onClick={() => {
                    this.props.dispatch(setViewCartCommand())
                }}>
                    <span>&#128722;</span>
                    <span>
                        {
                            qty > 0 &&
                            <span>({qty})</span>
                        }
                        {
                            price != null &&
                            <Price price={price}/>
                        }
                    </span>
                </Nav.Link>
            }

        </div>

    }


}


function mapStateToProps(state) {
    return {
        cart: state.cart

    };
}


export default connect(mapStateToProps)(ShoppingCartSmall);


