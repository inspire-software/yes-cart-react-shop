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
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

import Product from './product/Product';
import MainPaginator from './MainPaginator';

import {
    prodListSetPageCommand,
    prodListSetPageSizeCommand,
    prodListSetSearchResultCommand,
    prodListSetSortFieldCommand,
    prodListSetSortOrderCommand
} from './actions.js'
import {API_URL, CORS_PROXY, getPostData} from './Common.js'
import {adaptFilterParametersToReqParams} from "./Common";
import Container from "react-bootstrap/Container";

/**
 * User: Igor Azarny iazarny@yahoo.com
 * Date: 04-Oct-2020
 * Time: 12:10:23
 */
class MainProductList extends React.Component {


    constructor(props) {
        super(props);
        this.onPageSizeChange = this.onPageSizeChange.bind(this);
        this.onSortChange = this.onSortChange.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
    }


    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(preProps, prevState, currentSnapshot) {
        if (this.props.filterParameters !== preProps.filterParameters
            || this.props.prodListCurrentPage !== preProps.prodListCurrentPage
            || this.props.prodListPageSize !== preProps.prodListPageSize
            || this.props.prodListSortField !== preProps.prodListSortField
            || this.props.prodListSortOrder !== preProps.prodListSortOrder
        ) {
            this.loadData();
        }
    }


    loadData() {
        let displayCategoryData = {
            category: this.props.currentCategoryId,
            includeNavigation: false,
            pageNumber: this.props.prodListCurrentPage,
            pageSize: this.props.prodListPageSize,
            sortField: this.props.prodListSortField,
            sortDescending: this.props.prodListSortOrder,
            parameters: adaptFilterParametersToReqParams(this.props.filterParameters)
        };
        fetch(CORS_PROXY + API_URL + '/search', getPostData(displayCategoryData))
            .then(res => res.json())
            .then((resp) => {
                this.props.dispatch(prodListSetSearchResultCommand(resp));
            })
            .catch(console.log);
    }

    onPageSizeChange(newPageSize) {
        this.props.dispatch(prodListSetPageSizeCommand(newPageSize));
        this.props.dispatch(prodListSetPageCommand(0));
    }

    onSortChange(newSort, asc) {
        this.props.dispatch(prodListSetSortFieldCommand(newSort));
        this.props.dispatch(prodListSetSortOrderCommand(asc));
        this.props.dispatch(prodListSetPageCommand(0));
    }

    onPageChange(newPageIdx) {
        this.props.dispatch(prodListSetPageCommand(newPageIdx));
    }


    render() {

        let products = [];
        let pageAvailableSize = [];
        let pageAvailableSort = {};
        let pageSize = 0;
        let sortField = 'default'; //TODO localization
        let sortDescending = false;
        let totalResults = 0;
        let itemImageWidth = 0;
        let itemImageHeight = 0;
        let pageNumber = 0;
        let pageSizeChangeHandler = this.onPageSizeChange;
        let onSortChangeHandler = this.onSortChange;
        let onPageChangeHandler = this.onPageChange;

        if (this.props.prodListSearchResult.items) {
            products = this.props.prodListSearchResult.items;
            pageSize = this.props.prodListPageSize;
            itemImageWidth = this.props.prodListSearchResult.itemImageWidth;
            itemImageHeight = this.props.prodListSearchResult.itemImageHeight;
            totalResults = this.props.prodListSearchResult.totalResults;
            pageAvailableSize = this.props.prodListSearchResult.pageAvailableSize;
            pageAvailableSort = this.props.prodListSearchResult.pageAvailableSort;
            sortField = this.props.prodListSortField;
            sortDescending = this.props.prodListSortOrder;
            pageNumber = this.props.prodListCurrentPage;
        }

        return (
            <React.Fragment>
                {
                    <Container>
                        {
                            /*TODO show something if products.length eq  0*/
                        }
                        <Row>
                            {
                                products.length > 0 &&
                                <Col xs={6} md={6}>
                                    <DropdownButton id="dropdown-item-button" title={'Show items ' + pageSize}>
                                        {
                                            pageAvailableSize.map(function (item, index) {
                                                return <Dropdown.Item key={index} active={pageSize === item}
                                                                      onClick={() => pageSizeChangeHandler(item)}>{item}</Dropdown.Item>
                                            })
                                        }
                                    </DropdownButton>

                                </Col>

                            }
                            {
                                products.length > 0 &&
                                <Col xs={6} md={6}>
                                    <DropdownButton id="dropdown-item-button" title={'Sort ' + sortField}>
                                        <Dropdown.Item
                                            active={sortField === pageAvailableSort.byPrice && !sortDescending}
                                            onClick={() => onSortChangeHandler(pageAvailableSort.byPrice, false)}>Price
                                            cheap to expensive</Dropdown.Item>
                                        <Dropdown.Item
                                            active={sortField === pageAvailableSort.byPrice && sortDescending}
                                            onClick={() => onSortChangeHandler(pageAvailableSort.byPrice, true)}>Price
                                            expensive to cheap</Dropdown.Item>
                                        <Dropdown.Item
                                            active={sortField === pageAvailableSort.byName && !sortDescending}
                                            onClick={() => onSortChangeHandler(pageAvailableSort.byName, false)}>Name
                                            A->Z</Dropdown.Item>
                                        <Dropdown.Item active={sortField === pageAvailableSort.byName && sortDescending}
                                                       onClick={() => onSortChangeHandler(pageAvailableSort.byName, true)}>Name
                                            Z->A</Dropdown.Item>
                                        <Dropdown.Item active={sortField === pageAvailableSort.bySKU && !sortDescending}
                                                       onClick={() => onSortChangeHandler(pageAvailableSort.bySKU, false)}>Code
                                            A->Z</Dropdown.Item>
                                        <Dropdown.Item active={sortField === pageAvailableSort.bySKU && sortDescending}
                                                       onClick={() => onSortChangeHandler(pageAvailableSort.bySKU, true)}>Code
                                            Z->A</Dropdown.Item>
                                    </DropdownButton>

                                </Col>
                            }
                        </Row>

                        <Row>
                            {
                                products.map(function (item, index) {
                                    return <Col key={item.defaultSkuCode + index} xs={12} md={6}>
                                        <Product product={item} imgWidth={itemImageWidth} imgHeight={itemImageHeight}
                                                 showCode={true} showDescription={true} showPrice={true} showHead={true}/>
                                    </Col>;
                                })
                            }
                        </Row>

                        <Row>
                            {
                                products.length > 0 &&
                                <Col xs={12} md={12}>
                                    <MainPaginator totalItems={totalResults}
                                                   onPage={pageSize}
                                                   currentPage={pageNumber}
                                                   length={10}
                                                   onSelect={(newIdx) => {
                                                       onPageChangeHandler(newIdx)
                                                   }}/>
                                </Col>
                            }
                        </Row>
                    </Container>
                }
            </React.Fragment>
        );
    }
}


function mapStateToProps(state) {
    return {
        //rootCategoryId: state.rootCategoryId,
        currentCategoryId: state.currentCategoryId,
        rootCategoryId: state.rootCategoryId,
        categoryNavigationData: state.categoryNavigationData,
        filterParameters: state.filterParameters,
        prodListSortField: state.prodListSortField,
        prodListSortOrder: state.prodListSortOrder,
        prodListPageSize: state.prodListPageSize,
        prodListCurrentPage: state.prodListCurrentPage,
        prodListSearchResult: state.prodListSearchResult
    };
}


export default connect(mapStateToProps)(MainProductList);




