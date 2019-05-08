import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { changeColor }  from './../../store/actions/penActions';

class ColorPicker extends Component {
	handleChange = event => this.props.changeColor(event.target.value);

	render() {
		return (
			<div className="uk-flex uk-flex-column">
				<label htmlFor="colorPicker">Цвет:</label>
				<input 
					type="color" 
					id="colorPicker" 
					onChange={this.handleChange.bind(this)} 
				/>
			</div>
		);
	}
}

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