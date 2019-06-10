import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

class ClearButton extends Component {
	handleClick = () => {
		this.props.ctx.rect(0, 0, this.props.ctx.canvas.width, this.props.ctx.canvas.height);
		this.props.ctx.fillStyle = '#ffffff';
		this.props.ctx.fill();
	};

	render() {
		return (
			<div className="uk-margin-small-top">
				<span 
					id="clearButton" 
					className="uk-icon-link uk-icon-button" 
					uk-icon="trash" 
					onClick={this.handleClick.bind(this)}
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

export default connect(mapStateToProps)(ClearButton);