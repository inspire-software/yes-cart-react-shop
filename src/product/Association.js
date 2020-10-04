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

import React from 'react';
import {connect} from "react-redux";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container';
import {API_URL, CORS_PROXY, getGetData} from '../Common.js'
import Product from "./Product";


export const CROSS_SELL = "cross";
export const ACCESSORIES = "accessories";
export const UP_SELL = "up";
export const BUY_WITH_THIS = "buywiththis";
export const EXPENDABLE = "expendable";

/**
 * User: Igor Azarny iazarny@yahoo.com
 * Date: 04-Oct-2020
 * Time: 12:10:23
 */
class Association extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            relatedProducts: []
        };
        this.fillRelateProducts = this.fillRelateProducts.bind(this);
    }

    componentDidMount() {
        //this.fillImgs(false, this.props.prodItemCurrentProduct.id);
        //https://demo.yes-cart.org/api/rest/products/176/associations/cross
        console.info(">>>>>>>>>. Association::componentDidMount()", this.props.prodItemCurrentProduct.id, this.props.associationType);
        this.fillRelateProducts(this.props.prodItemCurrentProduct.id, this.props.associationType);

    }

    fillRelateProducts(prodId, relationType) {


        let url = CORS_PROXY + API_URL + `/products/${prodId}/associations/${relationType}`;

        fetch(url, getGetData())
            .then(res => res.json())
            .then((info) => {
                this.setState({relatedProducts: info});
            })
            .catch(console.log);

    }

    render() {
        //console.info(">>>>>>>>>. Association::render()", this.props.prodItemCurrentProduct.id, this.props.associationType);
        return <React.Fragment>
            <Container>
                <Row>
                    <Col>{this.props.associationType}</Col>
                </Row>
                <Row>
                {
                    this.state.relatedProducts.map(
                        (rp, rpidx) => {
                            return <Col key={rp.defaultSkuCode + rpidx} xs={3} md={3}>
                                <Product product={rp} imgWidth={100} imgHeight={100}
                                         showCode={false} showDescription={false} showPrice={false} showHead={true}/>
                            </Col>
                        }
                    )
                }
                </Row>
            </Container>
        </React.Fragment>;
    }

}



function mapStateToProps(state) {
    return {
        prodItemCurrentProduct: state.prodItemCurrentProduct,
        prodItemCurrentSku: state.prodItemCurrentSku
    };
}


export default connect(mapStateToProps)(Association);


