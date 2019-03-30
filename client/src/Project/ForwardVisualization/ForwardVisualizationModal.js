import React, {Component} from "react";
import {Modal, Tooltip} from "antd";
import Colorize from "../../utils/Colorize";
import './ForwardVisualization.scss';

class ForwardVisualizationModal extends Component {

    render() {
        const {visible, data, onCloseModal} = this.props;
        console.log(data);
        return <Modal
            title="Forward Visualization"
            visible={visible}
            onCancel={onCloseModal}
            onOk={onCloseModal}
            footer={null}
            className="visualization-modal"
        >
            <div className="col">{data && data.hidden_layers[0][0].map((_, idx) => <div><b>{idx}</b></div>)}</div>
            {data && data.text.map((word, idx) => (<div className="col">
                <div className="col-header">
                    <div>{word}</div>
                    <div><b>{data.prediction_label[idx]}</b></div>
                </div>
                {data.hidden_layers[idx].map(hiddenVec => (<div>
                    {hiddenVec.map(item =>
                        <Colorize value={item} min={-1} max={1}>{item.toPrecision(3)}</Colorize>
                    )}
                </div>))}
            </div>))}
        </Modal>
    }
}

export default ForwardVisualizationModal;