import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import axios from "axios";
import {API_URL} from "../../consts";
import {Card, Spin} from "antd";
import './General.scss';

class General extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount = async () => {
        await this.fetchGeneral();
    };

    fetchGeneral = async () => {
        if (this.props.authStore.userToken) {
            const response = await axios.get(API_URL + "/projects/" + this.props.projectId,
                {headers: {"x-access-token": this.props.authStore.userToken}});
            const general = response.data[0].general_info;
            this.setState({data: response.data, general});
            console.log(general);
        }
    };

    render() {
        console.log("token: " + this.props.authStore.userToken);

        return (
            <div>
                {this.state.data ? <div className="general-data">
                    <div className="row">
                        <Card className="text-content">
                            <div className="insight-content">
                                <h3>Bidrectional State</h3>
                                <h1>{this.state.general.bidirectional_state.toString()}</h1>
                            </div>
                        </Card>

                        <Card className="text-content">
                            <div className="insight-content">
                                <h3>Dropout</h3>
                                <h1>{this.state.general.dropout}</h1>
                            </div>
                        </Card>

                        <Card className="text-content">
                            <div className="insight-content">
                                <h3>Input Size</h3>
                                <h1>{this.state.general.input_size}</h1>
                            </div>
                        </Card>

                        <Card className="text-content">
                            <div className="insight-content">
                                <h3>Hidden Size</h3>
                                <h1>{this.state.general.hidden_size}</h1>
                            </div>
                        </Card>
                    </div>
                    <div className="row">
                        <Card className="text-content">
                            <div className="insight-content">
                                <h3>Number of Layers</h3>
                                <h1>{this.state.general.number_of_layers}</h1>
                            </div>
                        </Card>

                        <Card className="text-content">
                            <div className="insight-content">
                                <h3>Bias State</h3>
                                <h1>{this.state.general.bias_state.toString()}</h1>
                            </div>
                        </Card>

                        <Card className="text-content">
                            <div className="insight-content">
                                <h3>Batch First</h3>
                                <h1>{this.state.general.batch_first.toString()}</h1>
                            </div>
                        </Card>

                        <Card className="text-content">
                            <div className="insight-content">
                                <h3>Has Hidden Output Layer</h3>
                                <h1>{this.state.general.has_hidden_output_layer.toString()}</h1>
                            </div>
                        </Card>

                    </div>

                    <div className="row">
                        <Card className="text-content">
                            <div className="insight-content">
                                <h3>Hidden Output Dropout Layer</h3>
                                <h1>{this.state.general.hidden_output_dropout_layer.toString()}</h1>
                            </div>
                        </Card>
                    </div>
                </div> :
                <Spin/>}
            </div>)
    }
}

export default inject('authStore')(observer(General));
