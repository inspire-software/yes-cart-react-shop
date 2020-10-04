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
import {getDisplayName} from './Common.js'

import {connect} from "react-redux";
import {delAllFilterCommand, setCurrentCategoryCommand} from "./actions";
import Card from "react-bootstrap/Card";
import {LinkContainer} from "react-router-bootstrap";

/**
 * User: Igor Azarny iazarny@yahoo.com
 * Date: 04-Oct-2020
 * Time: 12:10:23
 */
class CategoryMenu extends React.Component {

    constructor(props) {
        super(props);
        this.onCategoryChange = this.onCategoryChange.bind(this);
    }

    onCategoryChange(categoryId) {
        this.props.dispatch(delAllFilterCommand());
        this.props.dispatch(setCurrentCategoryCommand(categoryId));
    }

    render() {
        let categoryChangeHandler = this.onCategoryChange;
        let rows = [];
        for (var i = 0; i < this.props.currentMenu.length; i++) {
            rows.push(
                {
                    'it': this.props.currentMenu[i].categoryId,
                    'name': getDisplayName(this.props.currentMenu[i]),
                    'uri': this.props.currentMenu[i].uri
                }
            )
        }

        return (
            <React.Fragment>
                {
                    <Card>

                        <Nav className="flex-column">
                            {
                                rows.map(function (item, index) {
                                    return <LinkContainer key={item.name + index} to={'/' + item.uri}>
                                        <Nav.Link onClick={() => categoryChangeHandler(item.it)}>
                                            {item.name}
                                        </Nav.Link>
                                    </LinkContainer>;

                                })
                            }
                        </Nav>
                    </Card>

                }
            </React.Fragment>
        );
    }
}


function mapStateToProps(state) {
    return {
        currentMenu: state.currentMenu,
    };
}


export default connect(mapStateToProps)(CategoryMenu);



