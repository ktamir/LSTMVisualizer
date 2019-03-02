import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import axios from "axios";
import {API_URL} from "../consts";
import {Table, Divider} from "antd";
import './Project.scss';
import ForwardVisualizationModal from "./ForwardVisualization/ForwardVisualizationModal";

class Project extends Component {

    constructor(props) {
        super(props);
        this.state = {showModal: false, modalData: null};
    }

    componentDidUpdate = async () => {
        console.log("token: " + this.props.authStore.userToken);
        if (!this.state.data && this.props.authStore.userToken) {
            const response = await axios.get(API_URL + "/projects/" + this.props.match.params.projectId + "/forwards",
                {headers: {"x-access-token": this.props.authStore.userToken}});
            this.setState({data: response.data})
        }
    };

    showModal = (modalData) => this.setState({...this.state, showModal: true, modalData});

    onCloseModal = () => this.setState({...this.state, showModal: false, modalData: null});

    render() {
        const columns = [{
            title: 'Iteration',
            dataIndex: 'data_by_iteration.iteration',
            key: 'iteration',
        }, {
            title: 'Label',
            key: 'label',
            render: (text, record) => record.data_by_iteration.text.join(' ')
        }, {
            title: 'Actions',
            key: 'show',
            render: (text, record) => (
                <span>
                  <a onClick={() => this.showModal(record.data_by_iteration)}>Show Visualization</a>
                </span>)
        }];

        console.log("token: " + this.props.authStore.userToken);
        console.log(this.state.data);

        return <div className="project">
            <h2 className="title">Data for project ID {this.props.match.params.projectId}</h2>
            <Table className="forwards-table" dataSource={this.state.data} columns={columns}/>
            <ForwardVisualizationModal
                visible={this.state.showModal}
                onCloseModal={this.onCloseModal}
                data={this.state.modalData}/>
        </div>
    }
}

export default inject('authStore')(observer(Project));