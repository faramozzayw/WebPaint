import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { changePenType }  from './../../store/actions/canvasActions';

import { pencil } from './../../modules/PenTypeConsts';

const Pen = ({ changePenType }) => (
	<div className="uk-margin-small-top">
		<span
			uk-tooltip="Ручка"
			className="uk-icon uk-icon-button pencil" 
			onClick={() => changePenType(pencil)}
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

Pen.propTypes = {
	changePenType: PropTypes.func.isRequired,
	ctx: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Pen);