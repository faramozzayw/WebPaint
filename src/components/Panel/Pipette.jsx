import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { changePenType }  from './../../store/actions/canvasActions';

import { pipette } from './../../modules/PenTypeConsts';

const Pipette = ({ changePenType }) => (
	<div className="uk-margin-small-top">
		<span
			uk-tooltip="Пипетка"
			className="uk-icon uk-icon-button uk-icon-image pipette icon" 
			onClick={() => changePenType(pipette)}
		></span>
	</div>
);

const mapStateToProps = state => {
	return {
		ctx: state.canvasState.ctx,
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		changePenType: changePenType
	}, dispatch);
}

Pipette.propTypes = {
	changePenType: PropTypes.func.isRequired,
	ctx: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Pipette);