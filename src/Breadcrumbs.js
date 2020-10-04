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

import Breadcrumb from 'react-bootstrap/Breadcrumb'
import {getDisplayName} from './Common.js'

import {connect} from "react-redux";
import {delAfterFilterCommand, delAllFilterCommand, delFilterCommand, setCurrentCategoryCommand} from "./actions";

/**
 * User: Igor Azarny iazarny@yahoo.com
 * Date: 04-Oct-2020
 * Time: 12:10:23
 */
class Breadcrumbs extends React.Component {

    constructor(props) {
        super(props);
        this.onCategoryChange = this.onCategoryChange.bind(this);
    }

    onCategoryChange(crumb) {
        if (crumb.del) {
            this.props.dispatch(delFilterCommand(crumb.it));
        } else if (crumb.filter) {
            this.props.dispatch(delAfterFilterCommand(crumb.it));
        } else {
            this.props.dispatch(setCurrentCategoryCommand(crumb.it));
            this.props.dispatch(delAllFilterCommand());

        }

    }

    render() {
        let categoryChangeHandler = this.onCategoryChange;
        let rows = [];
        rows.push({'it': this.props.rootCategoryId, 'name': this.props.rootCategoryName});

        for (let  i = 0; i < this.props.breadcrumbs.length; i++) {
            rows.push(
                {
                    'it': this.props.breadcrumbs[i].targetId, 'name': getDisplayName(this.props.breadcrumbs[i]), 'filter' : false
                }
            )
        }


        for (let f = 0; f < this.props.filterParameters.length; f++) {
            rows.push(
                {
                    'it': this.props.filterParameters[f].code,
                    'name':  this.props.filterParameters[f].displayCode
                        + ((this.props.filterParameters[f].displayCode==='') ? '': '-')
                        + this.props.filterParameters[f].displayValue, 'filter' : true
                }
            );
            rows.push(
                {
                    'it': this.props.filterParameters[f].code,
                    'name':  '(x)', 'filter' : true, 'del' : true
                }
            )
        }

        // todo delFilterCommand
        return (
            <React.Fragment>
                {
                    <Breadcrumb>
                        {
                            rows.map(function (item, index) {
                                return <Breadcrumb.Item key={'f' + index} className={item.del?'breadcrumb-item-del':'breadcrumb-item'}
                                                        onClick={() => categoryChangeHandler(item)}>{item.name}</Breadcrumb.Item>;

                            })
                        }
                    </Breadcrumb>
                }
            </React.Fragment>
        );
    }
}


function mapStateToProps(state) {
    return {
        rootCategoryId: state.rootCategoryId,
        rootCategoryName: state.rootCategoryName,
        breadcrumbs: state.breadcrumbs,
        filterParameters: state.filterParameters
    };
}

export default connect(mapStateToProps)(Breadcrumbs);



