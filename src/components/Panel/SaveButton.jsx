import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { resetCanvasActions }  from './../../store/actions/canvasActions';

class SaveButton extends Component {
	async saveCanvasAsImg(e) {
		let link = this.refs.link;
		if (!this.props.isSelecting) {
			link.href = document.querySelector('#draw').toDataURL('image/png');
		} else if (this.props.isSelecting) {
			await this.props.resetCanvasActions(true);
			let canvas = document.createElement('canvas');
			let ctx = canvas.getContext('2d');

			canvas.width = Math.abs(this.props.selectedObject.width);
			canvas.height = Math.abs(this.props.selectedObject.height);
			
			let imageDate = this.props.ctx.getImageData(
				this.props.selectedObject.startX,
				this.props.selectedObject.startY,
				this.props.selectedObject.width,
				this.props.selectedObject.height
			);

			let link = this.refs.link;
			ctx.putImageData(imageDate, 0, 0);
			link.href = canvas.toDataURL('image/png');
		}
		link.download = 'canvasImage.png';
	};

	render() {
		return (
			<div className="uk-margin-small-top">
				<a
					ref="link"
					id="saveButton" 
					className="uk-icon-link uk-icon-button"
					uk-icon="download"  
					onClick={this.saveCanvasAsImg.bind(this)}
				></a>
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
		resetCanvasActions: resetCanvasActions
	}, dispatch);
}

SaveButton.propTypes = {
	ctx: PropTypes.object.isRequired,
	isSelecting: PropTypes.bool.isRequired,
	selectedObject: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveButton);