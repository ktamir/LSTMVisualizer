import React, {Component} from 'react';
import {Row, Col, Input, Button, Icon, Form} from 'antd';
import './Login.scss';
import {inject, observer} from "mobx-react";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {email: '', password: ''}
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    };

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    };

    onSubmit = (event) => {
        event.preventDefault();
        this.props.authStore.register(this.state.email, this.state.password);
    };

    render() {
        return (
            <div className="login-screen">
                <Row type="flex" justify="space-around" className="login-row" align="middle">
                    <Col key=".0" span="8">
                        <Form className="login-form">
                            {/*<img className="logo" src="/img/logos/logo.png"/>*/}
                            <div className="logo">Register</div>
                            <Input placeholder="Email" prefix={<Icon type="user" className="icon"/>} onChange={this.onEmailChange}/>
                            <Input placeholder="Password" prefix={<Icon type="lock" className="icon"/>} type="password" onChange={this.onPasswordChange}/>
                            <Button className="login-button" type="primary" size="large" onClick={this.onSubmit}>Register</Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default inject('authStore')(observer(Login));
