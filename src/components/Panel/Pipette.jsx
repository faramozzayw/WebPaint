import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { updatePipetting }  from './../../store/actions/canvasActions';

class Pipette extends Component {
	handleClick = () => this.props.updatePipetting(true);

	render() {
		return (
			<div className="uk-margin-small-top">
				<span 
				class="uk-margin-small-right uk-icon-button" uk-icon="pencil" onClick={this.handleClick.bind(this)}></span>
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
		updatePipetting: updatePipetting
	}, dispatch);
}


Pipette.propTypes = {
	updatePipetting: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Pipette);