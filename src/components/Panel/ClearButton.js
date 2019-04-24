import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clearCanvas }  from './../../store/actions/clearCanvas';

class ClearButton extends Component {
	handleClick = event => this.props.clearCanvas(true);

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
		clear: state.canvasState.clear
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		clearCanvas: clearCanvas
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ClearButton);