import React from 'react';
import {Row, Col, Button, Icon} from 'antd';
import "./Landing.scss";
import {Link} from "react-router-dom";

export const Landing = () => <div className="landing">
    <div className="landing-header">
        <h3>Bring Your LSTM To Life.</h3>
    </div>

    <div className="landing-content">
        <Row>
            <Col span={8} className="landing-col">
                <Icon type="dashboard" />
                <h3>Gain Visibility Into Your Network</h3>
                <span>Be able to see how predictions were made</span>
            </Col>

            <Col span={8} className="landing-col">
                <Icon type="download" />
                <h3>Easy Install</h3>
                <span>We're offering an SDK to integrate with your PyTorch network and send data</span>
            </Col>

            <Col span={8} className="landing-col">
                <Icon type="bar-chart" />
                <h3>Gain Insight</h3>
                <span>See insights about how your network is performing, so you can make better decisions</span>
            </Col>
        </Row>
    </div>

    <div className="landing-footer">
        <Link to="/login">
            <Button size="large">Get Started</Button>
        </Link>
    </div>
</div>;