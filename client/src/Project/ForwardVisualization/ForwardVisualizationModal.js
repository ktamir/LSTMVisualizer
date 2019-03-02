import React, {Component} from "react";
import {Modal} from "antd";
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
            {data && data.text.map((word, idx) => (<div className="col">
                {data.prediction[idx].map(pred => (<div>
                    <Colorize value={pred} min={-2} max={0}>{word}</Colorize>
                </div>))}
            </div>))}
        </Modal>
    }
}

export default ForwardVisualizationModal;