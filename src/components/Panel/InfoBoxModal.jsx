import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { enableInfoModal }  from './../../store/actions/infoModalActions';

import Modal from 'react-modal';
import InfoBox from './../InfoBox';

Modal.setAppElement("#root");

class InfoBoxModal extends Component {
	getCursor = () => document.querySelector('.cursor');

	clickHandle = () => {
		this.getCursor().style.display = 'none';
		this.props.enableInfoModal();
	} 
	render() {
		return (
			<div className="uk-margin-small-top">
				<span 
					className="uk-icon uk-icon-button info"
					onClick={this.clickHandle.bind(this)}
				></span>
				<Modal
					isOpen={this.props.isOpen}
					contentLabel="Storage Modal"
				>
					<InfoBox />
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isOpen: state.infoModal.isOpen,
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		enableInfoModal: enableInfoModal
	}, dispatch);
}

InfoBoxModal.propTypes = {
	isOpen: PropTypes.bool,
	enableInfoModal: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoBoxModal);