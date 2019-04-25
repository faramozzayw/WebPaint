import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

class ClearButton extends Component {
	handleClick = () => {
		this.props.ctx.clearRect(0,0, window.innerWidth, window.innerHeight);
	};

	render() {
		return (
			<div className="uk-margin-small-top">
				<button id="clearButton" className="uk-button uk-button-danger" onClick={this.handleClick.bind(this)}>Очистить холст!</button>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		clear: state.canvasState.clear,
		ctx: state.canvasState.ctx
	}
}

ClearButton.propTypes = {
	ctx: PropTypes.object,
	canvas: PropTypes.object
}

export default connect(mapStateToProps)(ClearButton);