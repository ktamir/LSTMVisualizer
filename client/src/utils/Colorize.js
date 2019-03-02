import React, {Component} from "react";

export default class Colorize extends Component {
    render() {
        const {min, max, value} = this.props;
        const range = max - min;
        const area = range / 4;

        const firstArea = [255, 0, 0];
        const secondArea = [255, 255, 0];
        const thirdArea = [0, 255, 0];
        const fourthArea = [0, 255, 255];
        const fifthArea = [0, 0, 255];

        const firstAreaValue = max;
        const secondAreaValue = max - area;
        const thirdAreaValue = max - area * 2;
        const fourthAreaValue = max - area * 3;
        const fifthAreaValue = min;

        let color;

        if (value <= firstAreaValue && value > secondAreaValue) {
            color = firstArea;
            color[1] += 255 * ((firstAreaValue - value) / area);
        } else if (value <= secondAreaValue && value > thirdAreaValue) {
            color = secondArea;
            color[0] -= 255 * ((secondAreaValue - value) / area);
        } else if (value <= thirdAreaValue && value > fourthAreaValue) {
            color = thirdArea;
            color[2] += 255 * ((thirdAreaValue - value) / area);
        } else if (value <= fourthAreaValue && value >= fifthAreaValue) {
            color = fourthArea;
            color[1] -= 255 * ((fourthAreaValue - value) / area);
        } else if (value < fifthAreaValue) {
            color = fifthArea;
        } else if (value > firstArea) {
            color = firstArea;
        }

        return <div style={{backgroundColor: `rgb(${color[0]},${color[1]},${color[2]})`}}>{this.props.children}</div>
    }
}