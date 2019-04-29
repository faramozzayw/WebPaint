import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { setContext }  from './../store/actions/canvasActions';
import { changeColor, changePipetteColor } from './../store/actions/penActions';

const hexToRGB = hex => {
    return {
        r: Number.parseInt(hex.slice(1, 3), 16),
        g: Number.parseInt(hex.slice(3, 5), 16),
        b: Number.parseInt(hex.slice(5, 7), 16)
    }
}

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
		ctx.miterLimit = 1.0;
		ctx.rect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = '#ffffff';
		ctx.fill()
	}

	cursor = e => {
		const cursor = this.getCursor();

		cursor.style.width = `${this.props.thickness + 5}px`;
		cursor.style.height = `${this.props.thickness + 5}px`;

		cursor.style.top = `${e.pageY - Number.parseInt(cursor.style.height)/2}px`;
		cursor.style.left = `${e.pageX - Number.parseInt(cursor.style.width)/2}px`;

		if (this.props.penType === 'pencil' || this.props.penType === 'paint-bucket') {
			cursor.style.backgroundColor  = `${this.props.color}`;
		} else if (this.props.penType === 'pipette') {
			cursor.style.backgroundColor  = `${this.props.pipetteColor}`;
		} else if (this.props.penType === 'eraser') {
			cursor.style.backgroundColor = '#ffffff';
		}
	};

	

	draw = e => {
		this.cursor(e);
		this.props.ctx.lineWidth = this.props.thickness;
		if (this.state.isDrawing) {
			if (this.props.penType === 'pencil') {
				this.props.ctx.beginPath();
				this.props.ctx.strokeStyle = this.props.color;
				this.props.ctx.moveTo(this.state.lastX, this.state.lastY);
				this.props.ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
				this.props.ctx.stroke();

				this.setState({
					lastX: e.nativeEvent.offsetX,
					lastY: e.nativeEvent.offsetY
				})
			} else if (this.props.penType === 'pipette') {
				this.props.ctx.beginPath();
				this.props.ctx.strokeStyle = this.props.pipetteColor;
				this.props.ctx.moveTo(this.state.lastX, this.state.lastY);
				this.props.ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
				this.props.ctx.stroke();

				this.setState({
					lastX: e.nativeEvent.offsetX,
					lastY: e.nativeEvent.offsetY
				})
			} else if (this.props.penType === 'eraser') {
				this.props.ctx.beginPath();
				this.props.ctx.strokeStyle = '#ffffff';
				this.props.ctx.moveTo(this.state.lastX, this.state.lastY);
				this.props.ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
				this.props.ctx.stroke();

				this.setState({
					lastX: e.nativeEvent.offsetX,
					lastY: e.nativeEvent.offsetY
				})
			}
		}
	};

	pickColor = e => {
		const [x, y] = [e.nativeEvent.offsetX, e.nativeEvent.offsetY];
	
		const imgData = this.props.ctx.getImageData(x, y, 1, 1);
		const pix = imgData.data;
		this.props.changePipetteColor(`rgba(${pix.join(',')})`);
	};

	floodFill = e => {
		let color = hexToRGB(this.props.color);
		let imageData = this.props.ctx.getImageData(0, 0, this.getCanvas().width, this.getCanvas().height);
		let [width, height] = [imageData.width, imageData.height];
		let [x, y] = [e.nativeEvent.offsetX, e.nativeEvent.offsetY];
		
		let stack = [[x, y]];
		let pixel;
		let [red, green, blue] = [0, 0, 0];

		const imgData = this.props.ctx.getImageData(x, y, 1, 1)
		const backgroundColor = {
			r: imgData.data[0],
			g: imgData.data[1],
			b: imgData.data[2]
		}

		while (stack.length > 0) {   
			pixel = stack.pop();

			if (pixel[0] < 0 || pixel[0] >= width) continue;
			if (pixel[1] < 0 || pixel[1] >= height) continue;
				
			red = pixel[1] * 4 * width + pixel[0] * 4;
			green = red + 1;
			blue = green + 1;
			const pointColor = {
				r: imageData.data[red],
				g: imageData.data[green],
				b: imageData.data[blue]
			}

			if ((pointColor.r !== color.r || pointColor.g !== color.g || pointColor.b !== color.b)
				&& (pointColor.r === backgroundColor.r && pointColor.g === backgroundColor.g && pointColor.b === backgroundColor.b)) {
				imageData.data[red] = color.r;
				imageData.data[green] = color.g;
				imageData.data[blue] = color.b;
				
				stack.push([
					pixel[0] - 1,
					pixel[1]
				  ]);
				stack.push([
					pixel[0] + 1,
					pixel[1]
				  ]);
				stack.push([
					pixel[0],
					pixel[1] - 1
				  ]);
				stack.push([
					pixel[0],
					pixel[1] + 1
				]);
			}
    }
		this.props.ctx.putImageData(imageData, 0, 0)
	};

	onClickHandle = e => {
		if (this.props.penType === 'pipette') this.pickColor(e);
		else if (this.props.penType === 'paint-bucket') this.floodFill(e);
	};

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
					onClick={this.onClickHandle.bind(this)}
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
		pipetteColor: state.penProperty.pipetteColor,
		penType: state.canvasState.penType
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		setContext: setContext,
		changeColor: changeColor,
		changePipetteColor: changePipetteColor
	}, dispatch);
}

Canvas.propTypes = {
	color: PropTypes.string.isRequired,
	thickness: PropTypes.number.isRequired,
	setContext: PropTypes.func.isRequired,
	ctx: PropTypes.object,
	changeColor: PropTypes.func.isRequired,
	changePipetteColor: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);