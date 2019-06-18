import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { enableInfoModal }  from './../../store/actions/infoModalActions';

import Modal from 'react-modal';
import InfoBox from './../InfoBox';

Modal.setAppElement("#root");

const InfoBoxModal = ({ isOpen, enableInfoModal }) => {
	const clickHandle = () => {
		document.querySelector('.cursor').style.display = 'none';
		enableInfoModal();
	}
	
	return (
		<div className="uk-margin-small-top">
			<span
				uk-tooltip="Помощь"
				className="uk-icon uk-icon-button info"
				onClick={() => clickHandle()}
			></span>
			<Modal
				isOpen={isOpen}
				contentLabel="Storage Modal"
			>
				<InfoBox />
			</Modal>
		</div>
	);
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