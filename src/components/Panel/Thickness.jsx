import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeThickness }  from './../../store/actions/penActions';

const Thickness = ({changeThickness}) =>  (
	<div>
		<label className="thickness">Толщина шрифта:
			<select 
					className="uk-select" 
					onChange={e => changeThickness(e.target.value)}
				>
				<option value="1">
					1
				</option>
				<option value="2">
					2
				</option>
				<option value="4">
					4
				</option>
				<option value="8">
					8
				</option>
				<option value="16">
					16
				</option>
				<option value="32">
					32
				</option>
				<option value="64">
					64
				</option>
			</select>
		</label>
	</div>
);

const mapStateToProps = state => {
	return {
		thickness: state.penProperty.thickness
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		changeThickness: changeThickness
	}, dispatch);
}

Thickness.propTypes = {
	thickness: PropTypes.number.isRequired,
	changeThickness: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Thickness);