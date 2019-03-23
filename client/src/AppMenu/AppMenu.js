import React, {Component} from "react";
import {Layout, Menu, Icon} from "antd";
import {API_URL} from "../consts";
import {observer, inject} from "mobx-react";
import axios from "axios";
import AddProjectModal from "./AddProjectModal";
import {Route, Switch, Redirect, Link} from 'react-router-dom';

import logo from '../logo.png';

const {Sider} = Layout;
const {SubMenu} = Menu;

class AppMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {projects: [], showCreateProjectModal: false};
    }

    componentDidMount = async () => {
        console.log("token: " + this.props.authStore.userToken);
        await this.fetchProjects();
    };

    fetchProjects = async () => {
        const userToken = this.props.authStore.userToken || (localStorage['lstmAuth'] &&
            JSON.parse(localStorage['lstmAuth']).userToken);
        try {
            const response = await axios.get(API_URL + "/projects/",
                {headers: {"x-access-token": userToken}});
            this.setState({...this.state, projects: response.data})
        } catch (e) {
            console.log(e);
        }
    };

    openCreateProjectModal = () => this.setState({...this.state, showCreateProjectModal: true});

    closeCreateProjectModal = () => {
        this.setState({...this.state, showCreateProjectModal: false}, async () => await this.fetchProjects());
    };

    handleClick = (e) => {
        if (e.key === "5") {
            this.openCreateProjectModal();
        }
    };

    render() {
        if (this.props.authStore.isAuthenticated === false) {
            console.log("Redirected to login...");
            return <Redirect to='/login'/>
        }

        return (
            <Sider
                trigger={null}
                className="menu"
            >
                <div className="menu-header" style={{color: 'white', textAlign: 'center', marginTop: 25}}>
                    <img src={logo} height={46} width={114}/>
                </div>
                <Menu
                    key="Menu"
                    mode="inline"
                    theme="dark"
                    style={{padding: "16px 0", width: "100%"}}
                    onClick={this.handleClick}
                >

                    <Menu.Item key="1">
                        <Link to="/dashboard">
                            <Icon type="dashboard"/>
                            <span>Dashboard</span>
                        </Link>
                    </Menu.Item>

                    <SubMenu key="2" title={<span><Icon type="project"/><span>Projects</span></span>}>
                        <Menu.Item key="5"><Icon type="plus"/>Create</Menu.Item>
                        {this.state.projects.map((project, idx) => (
                            <Menu.Item key={6 + idx}>
                                <Link to={`/projects/${project._id}`}>
                                    {project.name}
                                </Link>
                            </Menu.Item>))}
                    </SubMenu>

                    <Menu.Item key="3">
                        <Link to="/about">
                            <Icon type="pie-chart"/>
                            <span>About</span>
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="4">
                        <Link to="/help">
                            <Icon type="question-circle"/>
                            <span>Help</span>
                        </Link>
                    </Menu.Item>
                </Menu>
                <AddProjectModal visible={this.state.showCreateProjectModal}
                                 onCloseModal={this.closeCreateProjectModal}/>
            </Sider>
        )
    }
}

export default inject('authStore')(observer(AppMenu));