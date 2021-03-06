import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { changePenType }  from './../../store/actions/canvasActions';

import { paintBucket } from './../../modules/PenTypeConsts';

const FloodFill  = ({ changePenType }) => (
	<div className="uk-margin-small-top">
		<span
			uk-tooltip="Заливка цветом"
			className="uk-icon uk-icon-button paint-bucket icon" 
			onClick={() => changePenType(paintBucket)}
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

FloodFill.propTypes = {
	changePenType: PropTypes.func.isRequired,
	ctx: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(FloodFill);