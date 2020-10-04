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
import Container from 'react-bootstrap/Container';
import {API_URL, CORS_PROXY, getPostData} from '../Common.js'
import Product from "./Product";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

/**
 * User: Igor Azarny iazarny@yahoo.com
 * Date: 04-Oct-2020
 * Time: 12:10:23
 */
class Featured extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            product: []
        };
        this.fillRelateProducts = this.fillRelateProducts.bind(this);
    }

    componentDidMount() {
        this.fillRelateProducts();
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.currentCategoryId !== prevProps.currentCategoryId) {
            this.setState({product: []});
            this.fillRelateProducts();
        }
    }

    fillRelateProducts() {

        let categoryId = 0;
        if (this.props.currentCategoryId !== this.props.rootCategoryId) {
            categoryId = this.props.currentCategoryId;
        }

        let req = {
            "category": categoryId,
            "includeNavigation": false,
            "excludeResults": false,
            "pageNumber": 0,
            "pageSize": 30,
            "parameters": {"featured": ["true"]},
            "sortDescending": true,
            "sortField": null
        };

        let url = CORS_PROXY + API_URL + `/search`;

        fetch(url, getPostData(req))
            .then(res => res.json())
            .then((info) => {
                this.setState({product: info.items});
            })
            .catch(console.log);

    }

    render() {
        const responsive = {
            superLargeDesktop: {
                // the naming can be any, depends on you.
                breakpoint: { max: 4000, min: 3000 },
                items: 5
            },
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 4
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 3
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1
            }
        };
        return <React.Fragment>
            {
                this.state.product.length > 0 &&
                <Container>
                    <Carousel responsive={responsive} autoPlay={this.props.deviceType !== "mobile" ? true : false} autoPlaySpeed={7000}>
                        {
                            this.state.product.map(
                                (rp, rpidx) => {
                                    return <div key={rp.defaultSkuCode + rpidx} xs={3} md={3}>
                                        <Product product={rp} imgWidth={100} imgHeight={100} showCode={false}
                                                 showDescription={false} showPrice={false} showHead={false}/>
                                    </div>
                                }
                            )
                        }
                    </Carousel>
                </Container>
            }
        </React.Fragment>
    }

}


function mapStateToProps(state) {
    return {
        currentCategoryId: state.currentCategoryId,
        rootCategoryId: state.rootCategoryId
    };
}


export default connect(mapStateToProps)(Featured);


