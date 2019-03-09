import React, {Component} from 'react';
import {Row, Col, Input, Button, Icon, Form} from 'antd';
import './Login.scss';
import {inject, observer} from "mobx-react";
import {Link, Redirect} from "react-router-dom";

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
        this.props.authStore.login(this.state.email, this.state.password);
    };

    render() {
        if (this.props.authStore.isAuthenticated === true) {
            return <Redirect to="/dashboard" />;
        }

        return (
            <div className="login-screen">
                <Row type="flex" justify="space-around" className="login-row" align="middle">
                    <Col key=".0" span="8">
                        <Form className="login-form" onSubmit={this.onSubmit}>
                            {/*<img className="logo" src="/img/logos/logo.png"/>*/}
                            <div className="logo">Login</div>
                            <Input placeholder="Username" value={this.state.email} onChange={this.onEmailChange}
                                   prefix={<Icon type="user" className="icon"/>}/>
                            <Input.Password placeholder="Password" onChange={this.onPasswordChange}
                                   value={this.state.password} prefix={<Icon type="lock" className="icon"/>}/>
                            <Button className="login-button" type="primary" size="large" htmlType="submit">Log In</Button>
                            <Link to="/register" className="register-link">Register a new account</Link>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default inject('authStore')(observer(Login));
