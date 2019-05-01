import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { changePenType, changeIsSelecting }  from './../../store/actions/canvasActions';

class Selection extends Component {
	render() {
		return (
			<div className="uk-margin-small-top">
				<span 
					className="uk-icon uk-icon-button uk-icon-image selection" 
					onClick={() => this.props.changeIsSelecting(true)}
				></span>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		color: state.penProperty.color,
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		changeIsSelecting: changeIsSelecting
	}, dispatch);
}

Selection.propTypes = {
	changeIsSelecting: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Selection);