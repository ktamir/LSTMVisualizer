import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import axios from "axios";
import {API_URL} from "../../consts";
import './Insights.scss';
import {CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import {Spin, Card} from "antd";

class Insights extends Component {

    constructor(props) {
        super(props);
        this.state = {lossData: []};
    }

    componentDidMount = async () => {
        await this.fetchInsights();
    };

    fetchInsights = async () => {
        if (this.props.authStore.userToken) {
            const response = await axios.get(API_URL + "/projects/" + this.props.projectId + "/insights",
                {headers: {"x-access-token": this.props.authStore.userToken}});
            if (response.data.length > 0) {
                const {insights} = response.data[0];
                this.setState({
                    data: response.data, lossData: insights.loss_values,
                    optimizer: insights.optimizer, lossFunction: insights.loss_function,
                    accuracy: insights.accuracy
                });
            }
        }
    };

    render() {
        console.log("token: " + this.props.authStore.userToken);
        console.log(this.state.lossData);

        const lossGraphData = this.state.lossData.map((loss_value, index) => ({
            loss: loss_value,
            iteration: `#${index + 1}`
        }));

        console.log(this.state.data);

        return (
            <div>
                <div className="row">
                    <Card>
                        <div className="insight-content">
                            {this.state.data ?
                                <LineChart width={600} height={300} data={lossGraphData}
                                           margin={{top: 5, right: 20, bottom: 5, left: 0}}>
                                    <Line type="monotone" dataKey="loss" stroke="#8884d8"/>
                                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                                    <XAxis dataKey="iteration"/>
                                    <YAxis/>
                                    <Tooltip/>
                                </LineChart>
                                : <Spin/>}
                        </div>
                    </Card>

                    <Card className="text-content">
                        <div className="insight-content">
                            <h3>Optimizer</h3>
                            <h1>{this.state.optimizer}</h1>
                        </div>
                    </Card>

                    <Card className="text-content">
                        <div className="insight-content">
                            <h3>Loss Function</h3>
                            <h1>{this.state.lossFunction}</h1>
                        </div>
                    </Card>
                </div>

                <div className="row">
                    <Card className="text-content" style={{height: 300}}>
                        <div className="insight-content">
                            <h3>Accuracy</h3>
                            <h1>{this.state.accuracy}</h1>
                        </div>
                    </Card>
                </div>
            </div>)
    }
}

export default inject('authStore')(observer(Insights));
