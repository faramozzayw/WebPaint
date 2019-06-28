import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import { 
	resetCanvasActions, 
	resetSelectedObject 
}  from './../../store/actions/canvasActions';

import Vector2 from './../../modules/Vector2';
import { chkObjForNonEmptiness } from './../../modules/Tools' 
import UIkit from 'uikit';

class DownloadButton extends Component {
	link = React.createRef()

	async downloadCanvasAsImg(e) {
		let { 
			isSelecting, 
			resetSelectedObject,
			resetCanvasActions,
			selectedObject
		} = this.props;

		let link = this.link.current;
		if (!isSelecting)
			link.href = document.querySelector('#draw').toDataURL('image/png');
		else if (isSelecting && chkObjForNonEmptiness(selectedObject)) {
			let { ctx } = this.props;

			await resetCanvasActions(true);
			let canvas = document.createElement('canvas');
			let localCtx = canvas.getContext('2d');

			let size = Vector2.getBoxSize(selectedObject.startVector, selectedObject.endVector);
			canvas.width = Math.abs(size.width);
			canvas.height = Math.abs(size.height);
			
			let imageDate = await ctx.getImageData(
				selectedObject.startVector.x,
				selectedObject.startVector.y,
				size.width,
				size.height
			);

			localCtx.putImageData(imageDate, 0, 0);
			link.href = canvas.toDataURL('image/png');
			resetSelectedObject();
			canvas.remove();
		}
		link.download = 'canvasImage.png';
		UIkit.notification({
			message: `${
				isSelecting ? 
				"Фрагмент был сохранён на устройство"
				: "Холст был сохранён на устройство"
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
					ref={this.link}
					id="saveButton" 
					className="uk-icon-link uk-icon-button download icon"
					onClick={this.downloadCanvasAsImg.bind(this)}
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

DownloadButton.propTypes = {
	ctx: PropTypes.object.isRequired,
	isSelecting: PropTypes.bool.isRequired,
	selectedObject: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(DownloadButton);