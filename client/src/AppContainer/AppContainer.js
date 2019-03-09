import React, {Component} from 'react';
import Project from "../Project/Project";
import {Dashboard} from "../Dashboard/Dashboard";
import AppMenu from "../AppMenu/AppMenu";
import {Layout, Menu, Dropdown} from "antd";
import {Route, Switch, Redirect, Link} from 'react-router-dom';
import {observer, inject} from "mobx-react";
import {Avatar} from 'react-avatar';
import "./AppContainer.scss";
import {Help} from "../Help/Help";
import {About} from "../About/About";

const {Content, Sider, Header, Footer} = Layout;

const UserMenu = (
    <Menu>
        <Menu.Item key="0">
            <Link to="/logout">Log Out</Link>
        </Menu.Item>
    </Menu>
);

class AppContainer extends Component {

    render = () => {
        const userEmail = this.props.authStore.email || (localStorage["lstmAuth"] && JSON.parse(localStorage["lstmAuth"]).email);
        return (
            <Layout style={{minHeight: '100vh'}}>

                <AppMenu/>

                <Layout>
                    <Header style={{background: '#fff', padding: 0}}>

                        <Dropdown overlay={UserMenu} trigger={['click']}>
                            <div className="user-title">
                                <Avatar name={userEmail} round={true} size={40}/>
                                <span className="user-email">{userEmail}</span>
                            </div>
                        </Dropdown>

                    </Header>

                    <Content>
                        <Route path="/dashboard/" component={Dashboard}/>
                        <Route path="/projects/:projectId" component={Project}/>
                        <Route path="/about" component={About}/>
                        <Route path="/help" component={Help}/>
                    </Content>

                    <Footer style={{textAlign: 'center', width: '100%'}}>
                        LSTM Visualizer ©2019 Created by Tamir Kfir, Royi Rassin, Gilad Bison and Dotan Menachem
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}

export default inject('authStore')(observer(AppContainer));
