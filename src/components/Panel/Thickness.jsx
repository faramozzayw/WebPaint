import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeThickness }  from './../../store/actions/thicknessChange';

class Thickness extends Component {
	handleChange = event => this.props.changeThickness(event.target.value);

	render() {
		return (
			<div>
				<label>Толщина шрифта:
					<select className="uk-select" onChange={this.handleChange.bind(this)}>
						<option value="6px">
							6px
						</option>
						<option value="12px">
							12px
						</option>
						<option value="18px">
							18px
						</option>
						<option value="24px">
							24px
						</option>
					</select>
				</label>
			</div>
		);
	}
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Thickness);