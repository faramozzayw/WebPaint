import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UIkit from 'uikit';

class UploadButton extends Component {
	async uploadImgAsCanvas(e) {
		e.persist()
		if(window.File || window.FileReader || window.FileList || window.Blob){
			if (window.confirm("При загрузке фото холст будет очищен, вы уверены?")) {
				let { ctx } = this.props;
				ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
				ctx.fillStyle = '#ffffff';
				await ctx.fill();

				let [file, reader] = [e.target.files[0], new FileReader()];
			
				reader.onload = event => {
					let [dataUri, image] = [event.target.result, new Image()];

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

				reader.onerror = err => {
					console.log(`Error loading file. Code: ${err.target.error.code}`);
					UIkit.notification({
						message: `При загрузке файла произошла ошибка, попробуйте снова.`,
						pos: 'bottom-right',
						timeout: 2000
					});
				}

				reader.readAsDataURL(file);
			}
		} else
			alert("Ваш браузер не поддерживает эту функцию :(");
	};

	render() {
		return (
			<div className="uk-margin-small-top">
				<label
					uk-tooltip="Загрузить фото"
					htmlFor="uploadButton"
					className="uk-icon-link uk-icon-button upload icon"
				></label>
				<input
					type="file"
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

export default connect(mapStateToProps, null)(UploadButton);