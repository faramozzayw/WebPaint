import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import { 
	setContext, 
	changeIsSelecting, 
	updateSelectedObject, 
	resetCanvasActions,
	resetSelectedObject,
	changePenType
} from './../store/actions/canvasActions';

import {
	pencil,
	pipette,
	eraser,
	paintBucket,
	none
} from './../modules/PenTypeConsts';

import { changeColor } from './../store/actions/penActions';

import { 
	hexToRGB,
	floodFillImageData,
	chkObjForNonEmptiness,
} from './../modules/Tools';

import Vector2 from './../modules/Vector2';

class Canvas extends Component {
	state = {
		mobile: false,
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

		this.setState({
			beforeImageData: ctx.getImageData(0, 0, canvas.width, canvas.height),
			mobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
		}, () => {
			canvas.width = window.innerWidth;
			canvas.height = !this.state.mobile
			? window.innerHeight - document.querySelector('.uk-navbar-container').clientHeight 
			: window.innerHeight - document.querySelector('.panel-mobile').clientHeight;
			
			ctx.strokeStyle = color;
			ctx.lineJoin = "round";
			ctx.lineCap = "round";
			ctx.lineWidth = thickness;
			ctx.rect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = '#ffffff';
			ctx.fill();
		});
	}

	cursor = e => {
		const cursor = this.getCursor();

		let { 
			penType, 
			thickness, 
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

			else if(penType === paintBucket) {
				cursor.style.backgroundColor  = `${color}`;
				cursor.style.width = `16px`;
				cursor.style.height = `16px`;

			} else if (penType === pipette) {
				cursor.style.backgroundColor  = `${color}`;
				cursor.style.width = `8px`;
				cursor.style.height = `8px`;

			} else if (penType === eraser) 
				cursor.style.backgroundColor = '#ffffff';

		} else 
			cursor.style.display = 'none';
	};

	pickColor = e => {
		let { mobile } = this.state;
		let { changeColor, changePenType, ctx } = this.props;

		let x, y;
		if (!mobile)
			[x, y] = [e.nativeEvent.offsetX, e.nativeEvent.offsetY];
		else if(mobile) {
			x = e.changedTouches[0].clientX;
			let py = Math.floor(e.changedTouches[0].clientY) - document.querySelector('.panel-mobile').clientHeight;
			if(py >= 0)
				y = py;
		}
		const imgData = ctx.getImageData(x, y, 1, 1);
		const pixel = imgData.data;
		changeColor(`rgba(${pixel.join(',')})`);
		changePenType(pencil);
	};

	floodFill = e => {
		let { color, ctx } = this.props;
		let rgbColor = hexToRGB(color);
		let imageData = ctx.getImageData(0, 0, this.getCanvas().width, this.getCanvas().height);
		let startPoint = {};

		let { mobile } = this.state;

		if(!mobile) {
			startPoint = {
				x: e.nativeEvent.offsetX,
				y: e.nativeEvent.offsetY
			}
		} else if(mobile) {
			let x = e.changedTouches[0].clientX;
			let y = Math.floor(e.changedTouches[0].clientY) - document.querySelector('.panel-mobile').clientHeight;
			if(y >= 0) {
				startPoint = {
					x: x,
					y: y
				}
			}
		}

		const imgData = ctx.getImageData(startPoint.x, startPoint.y, 1, 1)
		const backgroundColor = {
			r: imgData.data[0],
			g: imgData.data[1],
			b: imgData.data[2]
		}
		
		ctx.putImageData(floodFillImageData(imageData, rgbColor, startPoint, backgroundColor), 0, 0);
	};

	draw = e => {
		this.cursor(e);
		
		let {
			ctx, penType, 
			thickness, color 	
		} =  this.props;
		let { lastX, lastY, isDrawing } = this.state;
		let { offsetX, offsetY } = e.nativeEvent;

		ctx.lineWidth = thickness;
		if (isDrawing && penType !== paintBucket) {
			ctx.beginPath();
			ctx.setLineDash([0]);

			if (penType === pencil || penType === pipette)
				ctx.strokeStyle = color;
			else if (penType === eraser)
				ctx.strokeStyle = '#ffffff';

			ctx.moveTo(lastX, lastY);
			ctx.lineTo(offsetX, offsetY);
			ctx.stroke();
				
			this.setState({
				lastX: offsetX,
				lastY: offsetY
			});
		}
	};

	touchMoveEventLister = e => {
		let {
			ctx, penType, 
			thickness, color 	
		} =  this.props;
		let { lastX, lastY, isDrawing } = this.state;

		ctx.lineWidth = thickness;
		if (isDrawing && penType !== paintBucket) {
			ctx.beginPath();
			ctx.setLineDash([0]);

			if (penType === pencil || penType === pipette)
				ctx.strokeStyle = color;
			else if (penType === eraser)
				ctx.strokeStyle = '#ffffff';

			let x = e.touches[0].clientX;
			let y = Math.floor(e.touches[0].clientY) - document.querySelector('.panel-mobile').clientHeight;
			if(y >= 0) {
				ctx.moveTo(lastX, lastY);
				ctx.lineTo(x, y);
				ctx.stroke();
				
				this.setState({
					lastX: x,
					lastY: y
				});
			}
		}
	};

	touchStartEventLister = e => {
		let { penType } = this.props;
		let	x = e.changedTouches[0].clientX;
		let	y = Math.floor(e.changedTouches[0].clientY) - document.querySelector('.panel-mobile').clientHeight;

		if(penType === pencil || penType === eraser) {
			if(y >= 0) {
				this.setState({
					isDrawing: true,
					lastX: x,
					lastY: y,
				});
			}
		}
	};

	touchEndEventLister = e => {
		let { penType } = this.props;
		if (penType === pipette) 
			this.pickColor(e);
		else if (penType === paintBucket)
			this.floodFill(e);
	};

	onClickHandle = e => {
		let { penType } = this.props;
		if (penType === pipette) 
			this.pickColor(e);
		else if (penType === paintBucket) 
			this.floodFill(e);
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
				let height = lastY - selectStartY;
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
		} else if (this.state.isDrawing) {
			this.draw(e);
			canvas.style.cursor = 'none';
		} else
			this.cursor(e);
	}

	onMouseDownEvent = e => {
		let  { ctx, isSelecting, selectedObject } =  this.props;
		let {  
			selectStartX, selectStartY,
			selectStart, beforeImageData
		} = this.state;
		let { offsetX, offsetY } = e.nativeEvent;

		if (isSelecting) {
			if (chkObjForNonEmptiness(selectedObject)) 
				ctx.putImageData(beforeImageData, 0, 0);

			let canvas = this.getCanvas();
			let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

			this.setState({
				selectStartX: selectStartX === undefined ? offsetX : selectStartX,
				selectStartY: selectStartY === undefined ? offsetY : selectStartY,
				beforeImageData: !selectStart ? imageData : beforeImageData,
				selectStart: true
			});
		} else {
			this.setState({
				isDrawing: isSelecting ? false : true,
				lastX: offsetX,
				lastY: offsetY,
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
				{ !this.state.mobile ? (
					<canvas
					id="draw"
					ref={this.canvas} 
					className="uk-width-1-1"

					onMouseMove={this.onMouseMoveEvent.bind(this)}
					onMouseDown={this.onMouseDownEvent.bind(this)}
					onMouseUp={this.onMouseUpEvent.bind(this)}
					onMouseOut={this.onMouseOutEvent.bind(this)}
					onClick={this.onClickHandle.bind(this)}

				></canvas>) 
				: (<canvas
					id="draw"
					ref={this.canvas} 
					className="uk-width-1-1"

					onTouchMove={this.touchMoveEventLister.bind(this)}
					onTouchStart={this.touchStartEventLister.bind(this)}
					onMouseOut={this.onMouseOutEvent.bind(this)}
					onTouchEnd={this.touchEndEventLister.bind(this)}
					onTouchCancel={this.onMouseOutEvent.bind(this)}

				></canvas>)}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		color: state.penProperty.color,
		thickness: state.penProperty.thickness,
		ctx: state.canvasState.ctx,
		penType: state.canvasState.penType,
		isSelecting: state.canvasState.isSelecting,
		resetCanvas: state.canvasState.resetCanvas,
		selectedObject: state.canvasState.selectedObject
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		setContext: setContext,
		changeIsSelecting: changeIsSelecting,
		updateSelectedObject: updateSelectedObject,
		resetCanvasActions: resetCanvasActions,
		resetSelectedObject: resetSelectedObject,
		changePenType: changePenType,
		changeColor: changeColor
	}, dispatch);
}

Canvas.propTypes = {
	color: PropTypes.string.isRequired,
	thickness: PropTypes.number.isRequired,
	setContext: PropTypes.func.isRequired,
	ctx: PropTypes.object.isRequired,
	changeColor: PropTypes.func.isRequired,
	isSelecting: PropTypes.bool.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);