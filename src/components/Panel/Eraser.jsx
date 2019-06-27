import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { changePenType }  from './../../store/actions/canvasActions';

import { eraser } from './../../modules/PenTypeConsts';

const Eraser = ({ changePenType }) => (
	<div className="uk-margin-small-top">
		<span
			uk-tooltip="Ластик"
			className="uk-icon uk-icon-button uk-icon-image eraser icon" 
			onClick={() => changePenType(eraser)}
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

Eraser.propTypes = {
	changePenType: PropTypes.func.isRequired,
	ctx: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Eraser);