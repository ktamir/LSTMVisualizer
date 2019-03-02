import React, {Component} from "react";
import {Layout, Menu, Icon} from "antd";
import {API_URL} from "../consts";
import {observer, inject} from "mobx-react";
import axios from "axios";
import AddProjectModal from "./AddProjectModal";

const {Sider} = Layout;
const {SubMenu} = Menu;

class AppMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {projects: [], showCreateProjectModal: false};
    }

    async componentDidMount() {
        console.log("token: " + this.props.authStore.userToken);
        const userToken = this.props.authStore.userToken || JSON.parse(localStorage['lstmAuth']).userToken;
        const response = await axios.get(API_URL + "/projects/",
            {headers: {"x-access-token": userToken}});
        this.setState({...this.state, projects: response.data})

    };

    openCreateProjectModal = () => this.setState({...this.state, showCreateProjectModal: true});

    closeCreateProjectModal = () => this.setState({...this.state, showCreateProjectModal: false});

    handleClick = (e) => {
        if (e.key === "5") {
            this.openCreateProjectModal();
        }
    };

    render() {
        console.log("aa");
        return <Sider
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
                onClick={this.handleClick}
            >
                <Menu.Item key="1">
                    <Icon type="dashboard"/>
                    <span>Dashboard</span>
                </Menu.Item>
                <SubMenu key="2" title={<span><Icon type="project" /><span>Projects</span></span>}>
                    <Menu.Item key="5"><Icon type="plus" />Create</Menu.Item>
                    {this.state.projects.map((project, idx) => (<Menu.Item key={6 + idx}>{project.name}</Menu.Item>))}
                </SubMenu>
                <Menu.Item key="3">
                    <Icon type="pie-chart"/>
                    <span>About</span>
                </Menu.Item>
                <Menu.Item key="4">
                    <Icon type="question-circle"/>
                    <span>Help</span>
                </Menu.Item>
            </Menu>
            <AddProjectModal visible={this.state.showCreateProjectModal} onCloseModal={this.closeCreateProjectModal}/>
        </Sider>
    }
}

export default inject('authStore')(observer(AppMenu));