import React, {Component} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {inject, observer} from "mobx-react";
import AppContainer from "./AppContainer/AppContainer";
import Logout from "./Auth/Logout";
import {Landing} from "./Landing/Landing";

const App = () => (
    <Router>
        <Switch>
            <Route path="/login/" component={Login}/>
            <Route path="/register/" component={Register}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/" component={Landing} />

            <AppContainer />
        </Switch>
    </Router>
);

export default inject('authStore')(observer(App));
