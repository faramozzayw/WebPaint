import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UIkit from 'uikit';

class UploadButton extends Component {
	async uploadImgAsCanvas(e) {
		e.persist()
		if(!window.File || !window.FileReader || !window.FileList || !window.Blob){
			alert("Ваш браузер не поддерживает эту функцию :(");
			return;
		}

		if (window.confirm("При загрузке фото холст будет очищен, вы уверены?")) {
			let { ctx } = this.props;
			ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
			ctx.fillStyle = '#ffffff';
			await ctx.fill();

			let [ file, reader ] = [ e.target.files[0], new FileReader() ];
			
			reader.onload = e => {
				let [ dataUri, image ] = [ e.target.result, new Image()];

				image.onload = () => {
					if (image.height <= window.innerHeight && image.width <= window.innerWidth) 
						ctx.drawImage(image, 0, 0);

					else if (image.height > window.innerHeight) 
						ctx.drawImage(image, 0, 0, image.width, window.innerHeight);

					else if (image.width > window.innerWidth) 
						ctx.drawImage(image, 0, 0, window.innerWidth, image.height);
					}

				image.src = dataUri;
				UIkit.notification({
					message: `Файл был удачно загружен`,
					pos: 'bottom-right',
					timeout: 2000
				});
			}

			reader.onerror = e => {
				console.log(`Error loading file. Code: ${e.target.error.code}`);
				UIkit.notification({
					message: `При загрузке файла произошла ошибка, попробуйте снова.`,
					pos: 'bottom-right',
					timeout: 2000
				});
			}

			reader.readAsDataURL(file);
		}
	};

	render() {
		return (
			<div className="uk-margin-small-top">
				<label 
					htmlFor="uploadButton"
					className="uk-icon-link uk-icon-button upload"
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
	ctx: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(UploadButton);