import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

class Canvas extends Component {
	state = {
		isDrawing: false,
		lastX: 0,
		lastY: 0
	}

	getCanvas = () => {
		return this.refs.canvas;
	}

	getCanvasContext = () => {
		return this.getCanvas().getContext('2d');
	}

	componentDidMount() {
		const canvas = this.getCanvas();
		const ctx = this.getCanvasContext();

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		ctx.strokeStyle = "orange";
		ctx.lineJoin = "round";
		ctx.lineCap = "round";
		ctx.lineWidth = 10;
	}

	draw = e => {
		const ctx = this.getCanvasContext();

		if (this.state.isDrawing) {
			ctx.beginPath();
			ctx.strokeStyle = 'orange';
			ctx.moveTo(this.state.lastX, this.state.lastY);
			ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
			ctx.stroke();

			this.setState({
				lastX: e.nativeEvent.offsetX,
				lastY: e.nativeEvent.offsetY
			})
		}
	}

	render() {
		return (
				<canvas 
					ref="canvas" 
					className="uk-width-1-1"
					onMouseMove={this.draw.bind(this)}
					onMouseDown={e => {
						this.setState({
							isDrawing: true,
							lastX: e.nativeEvent.offsetX,
							lastY: e.nativeEvent.offsetY
						})}
					}
					onMouseUp={e => {
						this.setState({
							isDrawing: false
						})
					}}
					onMouseOut={e => {
						this.setState({
							isDrawing: false
						})
					}}
					>
				</canvas>
		);
	}
}

Canvas.propTypes = {
	color: PropTypes.string.isRequired,
	thickness: PropTypes.string.isRequired
}

const mapStateToProps = state => {
	return {
		color: state.penProperty.color,
		thickness: state.penProperty.thickness
	}
}

export default connect(mapStateToProps)(Canvas);