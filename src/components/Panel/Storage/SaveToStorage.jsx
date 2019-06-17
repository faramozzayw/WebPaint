import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import UIkit from 'uikit';
import { bindActionCreators } from 'redux';
import { resetCanvasActions }  from './../../../store/actions/canvasActions';
import { Vector2 } from './../../../modules/Vector2';

class SaveToStorage extends Component {
	async handleClick() {
		let { ctx, isSelecting } = this.props;
		let saveImg;
		let name = `Name: Рисунок №${localStorage.length + 1}`;
		let date = `Date: ${Date.now()}`;
		let key, imgSize;

		if (!isSelecting) {
			imgSize = `Size: ${ctx.canvas.width} x ${ctx.canvas.height}`;
			saveImg = ctx.canvas.toDataURL('image/png');
		} else {
			let { selectedObject } = this.props;
			await this.props.resetCanvasActions(true);
			let canvas = document.createElement('canvas');
			let context = canvas.getContext('2d');

			let size = Vector2.getBoxSize(selectedObject.startVector, selectedObject.endVector);
			imgSize = `Size: ${Math.abs(size.width)} x ${Math.abs(size.height)}`;
			canvas.width = Math.abs(size.width);
			canvas.height = Math.abs(size.height);

			let imageDate = await ctx.getImageData(
				selectedObject.startVector.x,
				selectedObject.startVector.y,
				size.width,
				size.height
			);
			context.putImageData(imageDate, 0, 0);
			saveImg = canvas.toDataURL('image/png');
			canvas.remove();
		}

		key = name + date + imgSize;
		try {
				localStorage.setItem(`${key}`, saveImg);
				UIkit.notification({
					message: `${isSelecting ? 
						'Фрагмент был сохранён в хранилище.' 
						: 'Холст был сохранён в хранилище.'
					}`,
					pos: 'bottom-right',
					timeout: 2500
				});
			} catch(e) {
				console.log("Storage failed: " + e);
			}
	}

	render() {
		return (
			<div className="uk-margin-small-top">
				<span
					uk-tooltip="Сохранить в хранилище"
					className="uk-icon uk-icon-button cloud-upload" 
					onClick={this.handleClick.bind(this)}
				></span>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		ctx: state.canvasState.ctx,
		isSelecting: state.canvasState.isSelecting,
		selectedObject: state.canvasState.selectedObject
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		resetCanvasActions: resetCanvasActions,
		//resetSelectedObject: resetSelectedObject
	}, dispatch);
}

SaveToStorage.propTypes = {
	ctx: PropTypes.object.isRequired,
	resetCanvasActions: PropTypes.func.isRequired,
	isSelecting: PropTypes.bool.isRequired,
	selectedObject: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveToStorage);