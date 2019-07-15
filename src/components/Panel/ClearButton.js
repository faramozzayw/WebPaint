import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ClearButton extends Component {
	handleClick = () => {
		let { ctx } = this.props;
		ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.fillStyle = '#ffffff';
		ctx.fill();
	};

	render() {
		return (
			<div className="uk-margin-small-top">
				<span
					uk-tooltip="Очистить холст"
					id="clearButton" 
					className="uk-icon-link uk-icon-button trash icon" 
					onClick={this.handleClick}
				></span>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		ctx: state.canvasState.ctx
	}
}

ClearButton.propTypes = {
	ctx: PropTypes.object.isRequired
}

export default connect(mapStateToProps, null)(ClearButton);