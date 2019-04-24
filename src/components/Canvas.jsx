import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { clearCanvas }  from './../store/actions/clearCanvas';

class Canvas extends Component {
	state = {
		isDrawing: false,
		lastX: 0,
		lastY: 0
	}

	getCanvas = () => this.refs.canvas

	getCanvasContext = () => this.getCanvas().getContext('2d')

	getCursor = () => document.querySelector('.cursor');

	componentDidMount() {
		const canvas = this.getCanvas();
		const ctx = this.getCanvasContext();

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		ctx.strokeStyle = this.props.color;
		ctx.lineJoin = "round";
		ctx.lineCap = "round";
		ctx.lineWidth = this.props.thickness;
	}

	componentDidUpdate() {
		if (this.props.clear) {
			const ctx = this.getCanvasContext();
			ctx.clearRect(0,0, window.innerWidth, window.innerHeight);
			this.props.clearCanvas(false);
		}
	}

	cursor = e => {
		const cursor = this.getCursor();

		cursor.style.width = `${this.props.thickness + 5}px`;
		cursor.style.height = `${this.props.thickness + 2}px`;

		cursor.style.top = `${e.pageY - Number.parseInt(cursor.style.height)/2}px`;
		cursor.style.bottom = `${e.pageY - Number.parseInt(cursor.style.height)/2}px`;
		cursor.style.left = `${e.pageX - Number.parseInt(cursor.style.width)/2}px`;
		cursor.style.right = `${e.pageX - Number.parseInt(cursor.style.width)/2}px`;
		cursor.style.borderColor  = `${this.props.color}`;
	}

	draw = e => {
		this.cursor(e);

		const ctx = this.getCanvasContext();
		ctx.lineWidth = this.props.thickness;

		if (this.state.isDrawing) {
			ctx.beginPath();
			ctx.strokeStyle = this.props.color;
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
			<div>
			<div className="cursor"></div>
				<canvas
					id="draw"
					ref="canvas" 
					className="uk-width-1-1"
					onMouseMove={this.draw.bind(this)}
					onMouseDown={e => {
						this.setState({
							isDrawing: true,
							lastX: e.nativeEvent.offsetX,
							lastY: e.nativeEvent.offsetY
						})
					}}
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
			</div>
		);
	}
}

Canvas.propTypes = {
	color: PropTypes.string.isRequired,
	thickness: PropTypes.number.isRequired,
	clear: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
	return {
		color: state.penProperty.color,
		thickness: state.penProperty.thickness,
		clear: state.canvasState.clear
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		clearCanvas: clearCanvas
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);