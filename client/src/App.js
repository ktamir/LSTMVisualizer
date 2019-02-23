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

const {Content, Sider, Header, Footer} = Layout;

const App = () => (
    <Router>
        <Switch>
            <Route path="/login/" component={Login}/>
            <Route path="/register/" component={Register}/>

            <Layout style={{minHeight: '100vh'}}>

                <Sider
                    trigger={null}
                    className="menu"
                >
                    <div className="menu-header" style={{color: 'white', textAlign: 'center', marginTop: 25}}>
                        LSTM Visualizer
                    </div>
                    <Menu
                        key="Menu"
                        mode="inline"
                        theme="dark"
                        style={{padding: "16px 0", width: "100%"}}
                    >
                        <Menu.Item key="1">
                            <Icon type="dashboard"/>
                            <span>Dashboard</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="project"/>
                            <span>Projects</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="pie-chart"/>
                            <span>About</span>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Icon type="question-circle"/>
                            <span>Help</span>
                        </Menu.Item>
                    </Menu>
                </Sider>

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
