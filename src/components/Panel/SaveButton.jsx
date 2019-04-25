import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

class SaveButton extends Component {
	saveCanvasAsImg = e => {
		this.props.ctx.save();

		let link = this.refs.link;
		link.href = this.props.canvas.toDataURL('image/png');
		link.download = 'canvasImage.png';
		link.click();

		this.props.ctx.restore();
	};

	render() {
		return (
			<div className="uk-margin-small-top">
				<a
					ref="link"
					id="saveButton" 
					className="uk-button uk-button-danger" 
					onClick={this.saveCanvasAsImg.bind(this)}
				>Сохранить холст</a>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		canvas: state.canvasState.canvas,
		ctx: state.canvasState.ctx
	}
}

SaveButton.propTypes = {
	ctx: PropTypes.object,
	canvas: PropTypes.object
}

export default connect(mapStateToProps)(SaveButton);