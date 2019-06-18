import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { changeColor }  from './../../store/actions/penActions';

const ColorPicker = ({ changeColor }) => (
	<div className="uk-flex uk-flex-column">
		<label htmlFor="colorPicker">Цвет:</label>
		<input 
			type="color" 
			id="colorPicker" 
			onChange={e => this.props.changeColor(e.target.value)} 
		/>
	</div>
);

const mapStateToProps = state => {
	return {
		color: state.penProperty.color
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		changeColor: changeColor
	}, dispatch);
}

ColorPicker.propTypes = {
	color: PropTypes.string.isRequired,
	changeColor: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorPicker);