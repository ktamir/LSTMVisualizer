import React, {Component} from "react";
import {Modal, Form, Input} from "antd";
import axios from "axios";
import {API_URL} from "../consts";
import {observer, inject} from "mobx-react";

class AddProjectModal extends Component {

    state = {projectName: '', disableButton: false};

    onChangeProjectName = event => this.setState({projectName: event.target.value});

    onSubmit = async () => {
        this.setState({disableButton: true});
        try {
            const response = await axios.post(API_URL + "/projects", {name: this.state.projectName},
                {headers: {"x-access-token": this.props.authStore.userToken}});
            this.setState({disableButton: false, projectName: ''});
            this.props.onCloseModal();
        }
        catch (e) {
            console.log(e);
            this.setState({disableButton: false});
        }
    };

    render() {
        const {visible, data, onCloseModal} = this.props;
        return <Modal
            title="Add a New Project"
            visible={visible}
            onCancel={onCloseModal}
            onOk={this.onSubmit}
            className="add-project-modal"
            okButtonProps={{disabled: this.state.disableButton}}
        >
            <Form onSubmit={this.onSubmit}>
                <div>Project Name</div>
                <Input style={{marginTop: 10}} value={this.state.projectName} onChange={this.onChangeProjectName}/>
            </Form>
        </Modal>
    }
}

export default inject('authStore')(observer(AddProjectModal));