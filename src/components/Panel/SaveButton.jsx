import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

class SaveButton extends Component {
	saveCanvasAsImg = e => {
		this.props.ctx.save();

		let link = this.refs.link;
		link.href = document.querySelector('#draw').toDataURL('image/png');
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
		ctx: state.canvasState.ctx
	}
}

SaveButton.propTypes = {
	ctx: PropTypes.object
}

export default connect(mapStateToProps)(SaveButton);