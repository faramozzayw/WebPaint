import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { changePenType }  from './../../store/actions/canvasActions';

class FloodFill extends Component {
	render() {
		return (
			<div className="uk-margin-small-top">
				<span 
					className="uk-margin-small-right uk-icon uk-icon-button" 
					uk-icon="paint-bucket" 
					onClick={() => this.props.changePenType('paint-bucket')}
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
		changePenType: changePenType
	}, dispatch);
}

FloodFill.propTypes = {
	changePenType: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(FloodFill);