import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { enableModal }  from './../../store/actions/modalStorageActions';

import Modal from 'react-modal';
import StorageModal from './Storage/StorageModal';

Modal.setAppElement("#root");

const ShowStorage = ({ isOpen, enableModal }) => {
	const clickHandle = () => {
		document.querySelector('.cursor').style.display = 'none';
		enableModal();
	}

	return (
		<div className="uk-margin-small-top">
			<span
				uk-tooltip="Открыть хранилище"
				className="uk-icon uk-icon-button storage"
				onClick={() => clickHandle()}
			></span>
			<Modal
				isOpen={isOpen}
				contentLabel="Show storage Modal"
			>
				<StorageModal />
			</Modal>
		</div>
	);
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

ShowStorage.propTypes = {
	isOpen: PropTypes.bool.isRequired, 
	enableModal: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowStorage);