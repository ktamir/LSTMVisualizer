import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import axios from "axios";
import {API_URL} from "../consts";

class Project extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidUpdate = async () => {
        console.log("token: " + this.props.authStore.userToken);
        if (!this.state.data && this.props.authStore.userToken) {
            const response = await axios.get(API_URL + "/projects/" + this.props.match.params.projectId + "/forwards",
                {headers: {"x-access-token": this.props.authStore.userToken}});
            this.setState({data: response.data})
        }
    };

    render() {
        console.log("token: " + this.props.authStore.userToken);
        return <div>
            <h3>Project ID {this.props.match.params.projectId}</h3>

        </div>
    }
}

export default inject('authStore')(observer(Project));