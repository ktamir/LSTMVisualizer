import React, {Component} from 'react';
import {Row, Col, Input, Button, Icon, Form} from 'antd';
import './Login.scss';
import {inject, observer} from "mobx-react";
import {Link, Redirect} from "react-router-dom";

class Logout extends Component {

    componentDidMount() {
        this.props.authStore.logout();
    }

    render() {
        if (this.props.authStore.isAuthenticated === false) {
            return <Redirect to="/login" />;
        }

        return (
            <div>Logging out...</div>
        );
    }
}

export default inject('authStore')(observer(Logout));
