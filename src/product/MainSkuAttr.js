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
import {API_URL, CORS_PROXY, getAttributeGroupDisplayName, getAttributeGroupDisplayVals, getGetData} from '../Common.js'

/**
 * User: Igor Azarny iazarny@yahoo.com
 * Date: 04-Oct-2020
 * Time: 12:10:23
 */
class MainSkuAttr extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            attr: {}
        };
    }

    //https://demo.yes-cart.org/api/rest/products/79/supplier/Main  <-- without grouping
    //https://demo.yes-cart.org/api/rest/products/87/attributes <-- All , what we need
    componentDidMount() {
        let grpUrl = CORS_PROXY + API_URL + `/products/${this.props.id}/attributes`;
        if (!this.props.isProduct) {
            grpUrl = CORS_PROXY + API_URL + `/skus/${this.props.id}/attributes`;
        }
        fetch(grpUrl, getGetData())
            .then(res => res.json())
            .then((groups) => {
                this.setState({attr: groups});
            })
            .catch(console.log);
    }

    componentDidUpdate(preProps, prevState, currentSnapshot) {
        if (this.props.id !== preProps.id || this.props.isProduct !== preProps.isProduct) {
            this.componentDidMount();
        }
    }


    render() {
        let attrSummaryInfo = [];
        if (this.state.attr && this.state.attr.groups) {
            this.state.attr.groups.map((g, gixd) => {
                let grpName = getAttributeGroupDisplayName(g);
                let av = [];
                g.attributes.map((a, aidx) => {
                    if (a.values.length > 0) { // we have some val for this attribute
                        av.push(
                            {
                                name: getAttributeGroupDisplayName(a),
                                val: getAttributeGroupDisplayVals(a.values[0])
                            }
                        )
                    }
                });
                if (av.length > 0) {
                    attrSummaryInfo.push(
                        {name: grpName, attr: av}
                    )
                }
            });
        }

        return (
            <React.Fragment>
                {
                    attrSummaryInfo.map((g, gidx) => {
                        return <div key={'gr' + g.name + gidx} className={'sku-attributes-holder'}>
                            <div className={'attr-head'}>{g.name}</div>
                            {
                                g.attr.map((a, aidx) => {
                                    return <div key={a.name + aidx} className={'single-attr-block'}>
                                        <ul>
                                            <li >
                                                <span>{a.name}</span>
                                                <span className={'attr-right'}>{a.val}</span>
                                            </li>
                                        </ul>
                                    </div>
                                })
                            }
                        </div>;
                    })
                }
            </React.Fragment>
        );
    }
}

export default MainSkuAttr;

