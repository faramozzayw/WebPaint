import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

class UploadButton extends Component {
	uploadImgAsCanvas = e => {
		if (window.confirm("При загрузке фото холст будет очищен, вы уверены?")) {
			alert("Да свершится предначертанное");
			this.props.ctx.rect(0, 0, this.props.ctx.canvas.width, this.props.ctx.canvas.height);
			this.props.ctx.fillStyle = '#ffffff';
			this.props.ctx.fill();

			let file = e.target.files[0];
			let reader = new FileReader();
			let image = new Image();

			reader.onload = e => {
				image.src = e.target.result
				this.props.ctx.drawImage(image, 0, 0);
			};

			reader.readAsDataURL(file);
		}
	};

	render() {
		return (
			<div className="uk-margin-small-top">
				<label 
					htmlFor="uploadButton"
					className="uk-icon-link uk-icon-button"
					uk-icon="upload" 
				></label>
				<input
					type="file"
					ref="link"
					id="uploadButton" 
					className="uk-hidden"
					onChange={this.uploadImgAsCanvas.bind(this)}
				></input>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		ctx: state.canvasState.ctx
	}
}

UploadButton.propTypes = {
	ctx: PropTypes.object
}

export default connect(mapStateToProps)(UploadButton);