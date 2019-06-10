import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { enableModal }  from './../../store/actions/modalStorageActions';

class Storage extends Component {
	render() {
		return (
			<div className="uk-margin-small-top">
				<span 
					className="uk-icon uk-icon-button storage"
					onClick={() => this.props.enableModal()}
				></span>
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
		enableModal: enableModal
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Storage);