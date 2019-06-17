import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import { 
	resetCanvasActions, 
	resetSelectedObject 
}  from './../../store/actions/canvasActions';

import { Vector2 } from './../../modules/Vector2';
import UIkit from 'uikit';

class SaveButton extends Component {
	async saveCanvasAsImg(e) {
		let { isSelecting } = this.props;
		let link = this.refs.link;
		if (!isSelecting) 
			link.href = document.querySelector('#draw').toDataURL('image/png');
		else if (isSelecting) {
			let { selectedObject } = this.props;
			await this.props.resetCanvasActions(true);
			let canvas = document.createElement('canvas');
			let ctx = canvas.getContext('2d');

			let size = Vector2.getBoxSize(selectedObject.startVector, selectedObject.endVector);
			canvas.width = Math.abs(size.width);
			canvas.height = Math.abs(size.height);
			
			let imageDate = await this.props.ctx.getImageData(
				selectedObject.startVector.x,
				selectedObject.startVector.y,
				size.width,
				size.height
			);

			ctx.putImageData(imageDate, 0, 0);
			link.href = canvas.toDataURL('image/png');
			this.props.resetSelectedObject();
			canvas.remove();
		}
		link.download = 'canvasImage.png';
		UIkit.notification({
			message: `${
				isSelecting ? 
				"Фрагмент был сохранён на компьютер"
				: "Холст был сохранён на компьютер"
			}`,
			pos: 'bottom-right',
			timeout: 2500
		});
	};

	render() {
		return (
			<div className="uk-margin-small-top">
				<a
					uk-tooltip="Скачать холст"
					href="canvasDownload"
					ref="link"
					id="saveButton" 
					className="uk-icon-link uk-icon-button download"
					onClick={this.saveCanvasAsImg.bind(this)}
				> </a>
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
		resetSelectedObject: resetSelectedObject
	}, dispatch);
}

SaveButton.propTypes = {
	ctx: PropTypes.object.isRequired,
	isSelecting: PropTypes.bool.isRequired,
	selectedObject: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveButton);