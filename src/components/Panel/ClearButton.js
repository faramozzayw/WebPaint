import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

class ClearButton extends Component {
	handleClick = () => {
		const canvas = document.querySelector('#draw');
		this.props.ctx.clearRect(0,0, window.innerWidth, window.innerHeight);
		this.props.ctx.rect(0, 0, canvas.width, canvas.height);
		this.props.ctx.fillStyle = '#ffffff';
		this.props.ctx.fill()
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
	ctx: PropTypes.object
}

export default connect(mapStateToProps)(ClearButton);