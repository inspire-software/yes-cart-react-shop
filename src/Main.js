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
import MainPromo from './MainPromo';
import MainProductList from './MainProductList';
import MainSku from './product/MainSku';

/**
 * User: Igor Azarny iazarny@yahoo.com
 * Date: 04-Oct-2020
 * Time: 12:10:23
 */
class Main extends React.Component {


    /**
     Collect all data to make a decision what to show.
     */
    componentDidMount() {

    }


    render() {
        var mode = 'MAIN_PROMO';
        const itemsNavData = this.props.categoryNavigationData;
        const prodItemCurrentProduct = this.props.prodItemCurrentProduct;
        if (prodItemCurrentProduct && prodItemCurrentProduct != null) {
            mode = 'MAIN_SKU';
        } else if ((itemsNavData && itemsNavData.totalResults > 0) ) {
            mode = 'MAIN_PRODLIST';
        } else if (this.props.rootCategoryId === this.props.currentCategoryId &&  this.props.filterParameters.length > 0) {
            mode = 'MAIN_PRODLIST';
        }

        return (
            <React.Fragment>
                {
                    <div>
                        {mode === 'MAIN_PRODLIST' &&
                        <MainProductList/>
                        }
                        {mode === 'MAIN_SKU' &&
                        <MainSku prodItemCurrentSku={this.props.prodItemCurrentSku}/>
                        }
                        {mode === 'MAIN_PROMO' &&
                        <MainPromo categoryId={this.props.currentCategoryId}/>
                        }
                    </div>
                }
            </React.Fragment>
        );
    }
}


function mapStateToProps(state) {
    return {
        categoryNavigationData: state.categoryNavigationData,
        rootCategoryId: state.rootCategoryId,
        currentCategoryId: state.currentCategoryId,
        filterParameters: state.filterParameters,
        prodItemCurrentSku: state.prodItemCurrentSku,
        currentMenu: state.currentMenu,
        prodItemCurrentProduct: state.prodItemCurrentProduct
    };
}

export default connect(mapStateToProps)(Main);



