import React, {Component} from 'react';
import {Row, Col, Input, Button, Icon, Form} from 'antd';
import './Login.scss';
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {email: '', password: '', mode: 'login'}
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    };

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    };

    onSubmit = (event) => {
        const {mode} = this.state;
        event.preventDefault();
        if (mode === 'login') {
            this.props.authStore.login(this.state.email, this.state.password);
        } else {
            this.props.authStore.register(this.state.email, this.state.password);
        }
    };

    render() {
        const {mode} = this.state;

        return (
            <div className="login-screen">
                <Row type="flex" justify="space-around" className="login-row" align="middle">
                    <Col key=".0" span="8">
                        <Form className="login-form" onSubmit={this.onSubmit}>
                            {/*<img className="logo" src="/img/logos/logo.png"/>*/}
                            <div className="logo">{mode === "login" ? "Login" : "Register"}</div>
                            <Input placeholder="Username" value={this.state.email} onChange={this.onEmailChange}
                                   prefix={<Icon type="user" className="icon"/>}/>
                            <Input.Password placeholder="Password" onChange={this.onPasswordChange}
                                   value={this.state.password} prefix={<Icon type="lock" className="icon"/>}/>
                            <Button className="login-button" type="primary" size="large" htmlType="submit">{mode === 'login' ? "Log In" : "Register"}</Button>
                            {mode === 'register' && <Link to="/register">Register a new account</Link>}
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default inject('authStore')(observer(Login));
