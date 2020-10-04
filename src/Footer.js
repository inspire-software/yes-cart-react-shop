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
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import './Common.css'
import './App.css';
import Container from "react-bootstrap/Container";
/**
 * User: Igor Azarny iazarny@yahoo.com
 * Date: 04-Oct-2020
 * Time: 12:10:23
 */
class Footer extends React.Component {


    render() {

        return <React.Fragment>
            <Container>
                <Row>
                    <Col xs={12} md={3}>
                    </Col>
                    <Col xs={12} md={3}>
                        <a href="/content/sitemap" rel="bookmark"><span>Site map</span></a><br/>
                        <a href="/content/sitemap" rel="bookmark"><span>Site map</span></a><br/>
                        <a href="/content/sitemap" rel="bookmark"><span>Site map</span></a><br/>
                    </Col>
                    <Col xs={12} md={3}>
                        <a href="/content/sitemap" rel="bookmark"><span>Site map</span></a><br/>
                        <a href="/content/sitemap" rel="bookmark"><span>Site map</span></a><br/>
                        <a href="/content/sitemap" rel="bookmark"><span>Site map</span></a><br/>

                    </Col>
                    <Col xs={12} md={3}>
                    </Col>
                </Row>
            </Container>


        </React.Fragment>;
    }

}


export default (Footer);
