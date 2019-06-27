import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import { 
	setContext, 
	changeIsSelecting, 
	updateSelectedObject, 
	resetCanvasActions,
	resetSelectedObject
} from './../store/actions/canvasActions';

import {
	pencil,
	pipette,
	eraser,
	paintBucket,
	none
} from './../modules/PenTypeConsts';

import { 
	changeColor, 
	changePipetteColor
} from './../store/actions/penActions';

import { 
	hexToRGB,
	floodFillImageData,
	/*chkObjForEmptiness,*/
	chkObjForNonEmptiness,
	/*loadWebAssembly*/ 
} from './../modules/Tools';

import Vector2 from './../modules/Vector2';

class Canvas extends Component {
	state = {
		isDrawing: false,
		lastX: 0,
		lastY: 0,
		selectStartX: undefined,
		selectStartY: undefined,
		beforeImageData: undefined,
		selectStart: false
	};

	canvas = React.createRef();

	getCanvas = () => this.canvas.current;
	getCanvasContext = () => this.getCanvas().getContext('2d');
	getCursor = () => document.querySelector('.cursor');

	componentDidMount() {
		const canvas = this.getCanvas();
		const ctx = this.getCanvasContext();
		let { 
			setContext,
			color,
			thickness
		} = this.props;
		setContext(ctx);

		canvas.width = window.innerWidth;
		canvas.height = window.innerWidth > 800 
		? window.innerHeight - document.querySelector('.uk-navbar-container').clientHeight 
		: window.innerHeight;

		this.setState({
			beforeImageData: ctx.getImageData(0, 0, canvas.width, canvas.height)
		});

		ctx.strokeStyle = color;
		ctx.lineJoin = "round";
		ctx.lineCap = "round";
		ctx.lineWidth = thickness;
		ctx.rect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = '#ffffff';
		ctx.fill();
	}

	cursor = e => {
		const cursor = this.getCursor();

		let { 
			penType, 
			thickness, 
			pipetteColor, 
			color 
		} = this.props;

		if (penType !== none) {
			cursor.style.display = 'block';
			cursor.style.width = `${thickness + 5}px`;
			cursor.style.height = `${thickness + 5}px`;
	
			cursor.style.top = `${e.pageY - Number.parseInt(cursor.style.height)/2}px`;
			cursor.style.left = `${e.pageX - Number.parseInt(cursor.style.width)/2}px`;
	
			if (penType === pencil) 
				cursor.style.backgroundColor  = `${color}`;
			else if(penType === paintBucket){
				cursor.style.backgroundColor  = `${color}`;
				cursor.style.width = `16px`;
				cursor.style.height = `16px`;
			} else if (penType === pipette) {
				cursor.style.backgroundColor  = `${pipetteColor}`;
				cursor.style.width = `8px`;
				cursor.style.height = `8px`;
			} else if (penType === eraser) 
				cursor.style.backgroundColor = '#ffffff';

		} else 
			cursor.style.display = 'none';
	};

	draw = e => {
		this.cursor(e);
		let  {
			ctx, penType, 
			thickness, color,
			pipetteColor 	
		} =  this.props;

		ctx.lineWidth = thickness;
		if (this.state.isDrawing && penType !== paintBucket) {
			ctx.beginPath();
			ctx.setLineDash([0]);

			if (penType === pencil)
				ctx.strokeStyle = color;
			else if (penType === pipette)
				ctx.strokeStyle = pipetteColor;
			else if (penType === eraser)
				ctx.strokeStyle = '#ffffff';

			ctx.moveTo(this.state.lastX, this.state.lastY);
			ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
			ctx.stroke();
			
			this.setState({
				lastX: e.nativeEvent.offsetX,
				lastY: e.nativeEvent.offsetY
			})
		}
	};

	pickColor = e => {
		const [x, y] = [e.nativeEvent.offsetX, e.nativeEvent.offsetY];
		const imgData = this.props.ctx.getImageData(x, y, 1, 1);
		const pixel = imgData.data;
		this.props.changePipetteColor(`rgba(${pixel.join(',')})`);
	};

	floodFill = e => {
		let color = hexToRGB(this.props.color);
		let imageData = this.props.ctx.getImageData(0, 0, this.getCanvas().width, this.getCanvas().height);
		let startPoint = {
			x: e.nativeEvent.offsetX,
			y: e.nativeEvent.offsetY
		}
		const imgData = this.props.ctx.getImageData(startPoint.x, startPoint.y, 1, 1)
		const backgroundColor = {
			r: imgData.data[0],
			g: imgData.data[1],
			b: imgData.data[2]
		}
		
		this.props.ctx.putImageData(floodFillImageData(imageData, color, startPoint, backgroundColor), 0, 0);
	};

	onClickHandle = e => {
		if (this.props.penType === pipette) this.pickColor(e);
		else if (this.props.penType === paintBucket) this.floodFill(e);
	};

	selectingDraw = e => {
		this.cursor(e);
		let  { ctx } =  this.props;
		let { 
			lastX, lastY, 
			selectStartX, selectStartY,
			selectStart,
			beforeImageData
		} = this.state;

		ctx.lineWidth = 1;
		if (selectStart) {
			this.setState({
				lastX: e.nativeEvent.offsetX,
				lastY: e.nativeEvent.offsetY
			}, () => {
				let width = lastX - selectStartX;
				let height = lastY - this.state.selectStartY;
				ctx.setLineDash([4, 4]);

				ctx.lineDashOffset = 0;
					ctx.strokeRect(selectStartX, selectStartY, width, height);
				});

			ctx.putImageData(beforeImageData, 0, 0);
		}
	}

	onMouseMoveEvent = e => {
		let canvas = this.getCanvas();
		if (this.props.isSelecting) {
			this.selectingDraw(e);
			canvas.style.cursor = 'crosshair';
		} else {
			this.draw(e);
			canvas.style.cursor = 'none';
		}
	}

	onMouseDownEvent = e => {
		let  { ctx, isSelecting, selectedObject } =  this.props;
		let {  
			selectStartX, selectStartY,
			selectStart, beforeImageData
		} = this.state;

		if (isSelecting) {
			if (chkObjForNonEmptiness(selectedObject)) 
				this.props.ctx.putImageData(this.state.beforeImageData, 0, 0);

			let canvas = this.getCanvas();
			let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

			this.setState({
				selectStartX: selectStartX === undefined ? e.nativeEvent.offsetX : selectStartX,
				selectStartY: selectStartY === undefined ? e.nativeEvent.offsetY : selectStartY,
				beforeImageData: !selectStart ? imageData : beforeImageData,
				selectStart: true
			});
		} else {
			this.setState({
				isDrawing: isSelecting ? false : true,
				lastX: e.nativeEvent.offsetX,
				lastY: e.nativeEvent.offsetY,
			});
		}
	}

	onMouseUpEvent = e => {
		let {
			selectStartX, selectStartY,
			lastX, lastY,
			beforeImageData
		} = this.state;
		let {
			ctx, updateSelectedObject,
			isSelecting
		} =  this.props;

		if (isSelecting) {
			let width = lastX - selectStartX;
			let height = lastY - selectStartY;
			let selectObject = {
				startVector: new Vector2(selectStartX, selectStartY),
				endVector: new Vector2(lastX, lastY)
			}
			updateSelectedObject(selectObject);
			ctx.setLineDash([4, 4]);
			ctx.putImageData(beforeImageData, 0, 0);
			ctx.strokeRect(selectStartX, selectStartY, width, height);

			this.setState({
				selectStartX: undefined,
				selectStartY: undefined,
				selectStart: false,
			});
		} else {
			this.setState({
				isDrawing: false
			});
		}
	}

	onMouseOutEvent = e => {
		this.setState({
			isDrawing: false
		});
	}

	render() {
		if (this.props.resetCanvas) {
			this.props.ctx.putImageData(this.state.beforeImageData, 0, 0);
			this.props.resetCanvasActions(false);
		}

		return (
			<div id="draw-container">
				<div className="cursor"></div>
				<canvas
					id="draw"
					ref={this.canvas} 
					className="uk-width-1-1"
					onMouseMove={this.onMouseMoveEvent.bind(this)}
					//onTouchMove={e => {
					//	console.log(e.touches[0]);
					//}}

					onMouseDown={this.onMouseDownEvent.bind(this)}
					//onTouchStart={this.onMouseDownEvent.bind(this)}

					onMouseUp={this.onMouseUpEvent.bind(this)}
					onMouseOut={this.onMouseOutEvent.bind(this)}
					//onTouchEnd={this.onMouseUpEvent.bind(this)}
					//onTouchCancel={this.onMouseOutEvent.bind(this)}


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
		penType: state.canvasState.penType,
		isSelecting: state.canvasState.isSelecting,
		resetCanvas: state.canvasState.resetCanvas,
		selectedObject: state.canvasState.selectedObject
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		setContext: setContext,
		changeColor: changeColor,
		changePipetteColor: changePipetteColor,
		changeIsSelecting: changeIsSelecting,
		updateSelectedObject: updateSelectedObject,
		resetCanvasActions: resetCanvasActions,
		resetSelectedObject: resetSelectedObject
	}, dispatch);
}

Canvas.propTypes = {
	color: PropTypes.string.isRequired,
	thickness: PropTypes.number.isRequired,
	setContext: PropTypes.func.isRequired,
	ctx: PropTypes.object.isRequired,
	changeColor: PropTypes.func.isRequired,
	changePipetteColor: PropTypes.func.isRequired,
	isSelecting: PropTypes.bool.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);