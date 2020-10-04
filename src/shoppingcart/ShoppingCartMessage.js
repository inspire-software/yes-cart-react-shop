import React from "react";
import './ShoppingCartBuyItemForm.css'
import {connect} from "react-redux";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ShoppingCartCommand from "./ShoppingCartCommand";
import {API_URL, CORS_PROXY, getPostData} from "../Common";
import {setCartCommand} from "../actions";
import Card from "react-bootstrap/Card";

/**
 * User: Igor Azarny iazarny@yahoo.com
 * Date: 04-Oct-2020
 * Time: 12:10:23
 */
class ShoppingCartMessage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ message: event.target.value});
    }

    handleSubmit(event) {
        var commanData = {
            parameters: {
                [ShoppingCartCommand.CMD_SETORDERMSG] : this.state.message
            }
        };
        fetch(CORS_PROXY + API_URL + '/cart', getPostData(commanData))
            .then(res => res.json())
            .then((resp) => {
                this.props.dispatch(setCartCommand(resp));
                this.setState({ message: ''});
            })
            .catch(console.log);
        event.preventDefault();
    }

    render() {
        console.info("ShoppingCartMessage::render", this.props.cart);

        return <Container>
            <br/>
            <Card>
                <Card.Header>
                    Order message
                </Card.Header>
                <Card.Body>
                    <div>
                        {
                            this.props.cart.orderInfo.orderMessage
                        }
                    </div>
                    <div>
                        <Form inline onSubmit={this.handleSubmit}>
                            <Form.Control value={this.state.message}
                                          onChange={this.handleChange}
                                          type="string" />
                            <Button  type="submit" variant="outline-success">Edit</Button>
                        </Form>
                    </div>

                </Card.Body>
            </Card>
        </Container>
    }


}


function mapStateToProps(state) {
    return {
        cart: state.cart,
    };
}


export default connect(mapStateToProps)(ShoppingCartMessage);


