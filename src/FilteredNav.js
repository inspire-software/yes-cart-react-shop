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
import Nav from 'react-bootstrap/Nav'
import {adaptFilterParametersToReqParams, API_URL, CORS_PROXY, getFilteredNavCaption, getPostData} from './Common.js'

import {connect} from "react-redux";
import {addFilterCommand, setNavigationDataCommand} from "./actions";
import Card from "react-bootstrap/Card";
import {LinkContainer} from "react-router-bootstrap";
/**
 * User: Igor Azarny iazarny@yahoo.com
 * Date: 04-Oct-2020
 * Time: 12:10:23
 */
class FilteredNav extends React.Component {

    constructor(props) {
        super(props);
        this.onAddFilter = this.onAddFilter.bind(this);
    }

    componentDidUpdate(preProps, prevState, currentSnapshot) {

        if (this.props.currentCategoryId !== preProps.currentCategoryId
            || this.props.filterParameters.length !== preProps.filterParameters.length) {
            if (this.props.currentCategoryId === this.props.rootCategoryId) {
                // just empty
                this.props.dispatch(setNavigationDataCommand({
                    filteredNavigation : {
                        fnAttributes : []
                    }
                }));
            } else {

                var displayCategoryData = {
                    'category': this.props.currentCategoryId,
                    'includeNavigation': true,
                    //"excludeResults": true, //the items are excluded
                    'pageNumber': 0,
                    'pageSize': 10 //todo get from main prod list and sorting as well
                };

                displayCategoryData.parameters = adaptFilterParametersToReqParams(this.props.filterParameters);

                fetch(CORS_PROXY + API_URL + '/search', getPostData(displayCategoryData))
                    .then(res => res.json())
                    .then((resp) => {
                        this.props.dispatch(setNavigationDataCommand(resp));
                    })
                    .catch(console.log);
            }
        }
    }



    onAddFilter(code, value, displayCode, displayValue) {
        this.props.dispatch(addFilterCommand(code, value, displayCode, displayValue));
    }

    render() {

        let addFilterHandler = this.onAddFilter;

        let filteredNavigation = {
            fnAttributes : []
        };

        if (this.props.categoryNavigationData && this.props.categoryNavigationData.filteredNavigation) {
            filteredNavigation = this.props.categoryNavigationData.filteredNavigation;
        }


        return (
            <React.Fragment>
                {
                    <Card>
                        {
                            filteredNavigation.fnAttributes.map(function (item, index) {
                                let displayCode = getFilteredNavCaption(item);
                                return <div className='filter-nav-holder' key={index}>
                                    <Card.Header>{displayCode}</Card.Header>
                                    <Card.Body className='single-nav-block flex-column'>
                                    {
                                        item.fnValues.map(function (valItem, valIndex) {
                                            let displayValue = valItem.displayValue?valItem.displayValue:valItem.value;
                                            return <ul key={valItem.value + 'ul' + valIndex } ><li>
                                                <LinkContainer to = {window.location.pathname + '/' + valItem.value}>
                                                <Nav.Link key={valItem.value + 'nav' + valIndex }
                                                          onClick={ () =>  {addFilterHandler(item.code, valItem.value, displayCode, displayValue); } }>
                                                    <span>{displayValue}</span>
                                                    <span className='badge'><span>{valItem.count}</span></span>
                                                </Nav.Link>
                                                </LinkContainer>
                                            </li></ul>;
                                        })
                                    }
                                    </Card.Body>

                                </div>;
                            })
                        }
                    </Card>


                }
            </React.Fragment>
        );
    }
}


function mapStateToProps(state) {
    return {
        rootCategoryId: state.rootCategoryId,
        currentCategoryId: state.currentCategoryId,
        categoryNavigationData : state.categoryNavigationData,
        filterParameters : state.filterParameters
    };
}


export default connect(mapStateToProps)(FilteredNav);



