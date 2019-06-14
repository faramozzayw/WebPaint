import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { changeIsSelecting, resetCanvasActions }  from './../../store/actions/canvasActions';

class Selection extends Component {
	handleClick = () => {
		this.props.changeIsSelecting(true)
		if (this.props.isSelecting) 
			this.props.resetCanvasActions(true)
	}
	render() {
		return (
			<div className="uk-margin-small-top">
				<span 
					className="uk-icon uk-icon-button uk-icon-image selection" 
					onClick={this.handleClick.bind(this)}
				></span>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		color: state.penProperty.color,
		isSelecting: state.canvasState.isSelecting
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		changeIsSelecting: changeIsSelecting,
		resetCanvasActions: resetCanvasActions
	}, dispatch);
}

Selection.propTypes = {
	color: PropTypes.string.isRequired,
	isSelecting: PropTypes.bool.isRequired,
	changeIsSelecting: PropTypes.func.isRequired,
	resetCanvasActions: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Selection);