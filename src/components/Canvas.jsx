import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { setContext, updatePipetting }  from './../store/actions/canvasActions';
import { changeColor } from './../store/actions/penActions';

class Canvas extends Component {
	state = {
		isDrawing: false,
		lastX: 0,
		lastY: 0,
		color: null
	};

	getCanvas = () => this.refs.canvas;

	getCanvasContext = () => this.getCanvas().getContext('2d');

	getCursor = () => document.querySelector('.cursor');

	componentDidMount() {
		const canvas = this.getCanvas();
		const ctx = this.getCanvasContext();

		this.props.setContext(ctx);

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight - document.querySelector('.uk-navbar-container').clientHeight;

		ctx.strokeStyle = this.props.color;
		ctx.lineJoin = "round";
		ctx.lineCap = "round";
		ctx.lineWidth = this.props.thickness;
	}

	cursor = e => {
		const cursor = this.getCursor();

		cursor.style.width = `${this.props.thickness + 5}px`;
		cursor.style.height = `${this.props.thickness + 5}px`;

		cursor.style.top = `${e.pageY - Number.parseInt(cursor.style.height)/2}px`;
		cursor.style.bottom = `${e.pageY - Number.parseInt(cursor.style.height)/2}px`;
		cursor.style.left = `${e.pageX - Number.parseInt(cursor.style.width)/2}px`;
		cursor.style.right = `${e.pageX - Number.parseInt(cursor.style.width)/2}px`;
		cursor.style.backgroundColor  = `${this.props.color}`;
	};

	draw = e => {
		this.cursor(e);
		this.props.ctx.lineWidth = this.props.thickness;

		if (this.state.isDrawing) {
			this.props.ctx.beginPath();
			this.props.ctx.strokeStyle = this.props.color;
			this.props.ctx.moveTo(this.state.lastX, this.state.lastY);
			this.props.ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
			this.props.ctx.stroke();

			this.setState({
				lastX: e.nativeEvent.offsetX,
				lastY: e.nativeEvent.offsetY
			})
		}
	}

	pickColor = e => {
		if (this.props.pipettingColor) {
			const x = e.nativeEvent.offsetX;
			const y = e.nativeEvent.offsetY;
	
			const imgData = this.props.ctx.getImageData(x, y, 1, 1);
			console.log("imgData", imgData);
			const pix = imgData.data;
			this.props.changeColor(`rgba(${pix.join(',')})`);
			this.props.updatePipetting(false);
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
					onClick={this.pickColor.bind(this)}
					>
				</canvas>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		color: state.penProperty.color,
		thickness: state.penProperty.thickness,
		ctx: state.canvasState.ctx,
		pipettingColor: state.canvasState.pipettingColor
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		setContext: setContext,
		changeColor: changeColor,
		updatePipetting: updatePipetting
	}, dispatch);
}

Canvas.propTypes = {
	color: PropTypes.string.isRequired,
	thickness: PropTypes.number.isRequired,
	setContext: PropTypes.func.isRequired,
	ctx: PropTypes.object,
	changeColor: PropTypes.func.isRequired,
	updatePipetting: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);