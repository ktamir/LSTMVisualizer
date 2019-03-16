import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import axios from "axios";
import {API_URL} from "../../consts";
import './Insights.scss';

class Insights extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount = async () => {
        await this.fetchInsights();
    };

    fetchInsights = async () => {
        if (this.props.authStore.userToken) {
            const response = await axios.get(API_URL + "/projects/" + this.props.projectId + "/insights",
                {headers: {"x-access-token": this.props.authStore.userToken}});
            this.setState({data: response.data})
        }
    };

    render() {
        console.log("token: " + this.props.authStore.userToken);
        console.log(this.state.data);

        return <div className="general-data">
            {JSON.stringify(this.state.data)}
        </div>
    }
}

export default inject('authStore')(observer(Insights));
