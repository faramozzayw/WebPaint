import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { enableModal }  from './../../store/actions/modalStorageActions';

import Modal from 'react-modal';
import StorageModal from './Storage/StorageModal';

Modal.setAppElement("#root");

class Storage extends Component {
	getCursor = () => document.querySelector('.cursor');

	onClickHandle = () => {
		this.getCursor().style.display = 'none';
		this.props.enableModal();
	}

	render() {
		return (
			<div className="uk-margin-small-top">
				<span 
					className="uk-icon uk-icon-button storage"
					onClick={this.onClickHandle.bind(this)}
				></span>
				<Modal
					isOpen={this.props.isOpen}
					contentLabel="Storage Modal"
				>
					<StorageModal />
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isOpen: state.modalStorage.isOpen
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		enableModal: enableModal
	}, dispatch);
}

Storage.propTypes = {
	isOpen: PropTypes.bool.isRequired, 
	enableModal: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Storage);