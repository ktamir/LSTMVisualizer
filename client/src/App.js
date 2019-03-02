import React, {Component} from 'react';
import logo from './logo.svg';
import {Layout, Menu, Icon} from "antd";
import './App.css';
import 'antd/dist/antd.css';
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Dashboard} from "./Dashboard/Dashboard";
import {inject, observer} from "mobx-react";
import Project from "./Project/Project";
import AppMenu from "./AppMenu/AppMenu";

const {Content, Sider, Header, Footer} = Layout;

const App = () => (
    <Router>
        <Switch>
            <Route path="/login/" component={Login}/>
            <Route path="/register/" component={Register}/>

            <Layout style={{minHeight: '100vh'}}>

                <AppMenu/>

                <Layout>
                    <Header style={{background: '#fff', padding: 0}}>

                    </Header>

                    <Content>
                        <Route path="/dashboard/" component={Dashboard}/>
                        <Route path="/projects/:projectId" component={Project}/>
                    </Content>

                    <Footer style={{textAlign: 'center', width: '100%'}}>
                        LSTM Visualizer ©2019 Created by Tamir, Royi, Gilad and Dotan
                    </Footer>
                </Layout>
            </Layout>
        </Switch>
    </Router>
);

export default inject('authStore')(observer(App));
