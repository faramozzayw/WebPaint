import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Thickness from './Panel/Thickness';
import ColorPicker from './Panel/ColorPicker';
import ClearButton from './Panel/ClearButton';
import DownloadButton from './Panel/DownloadButton';
import Pipette from './Panel/Pipette';
import Pen from './Panel/Pen';
import Eraser from './Panel/Eraser';
import UploadButton from './Panel/UploadButton'
import FloodFill from './Panel/FloodFill';
//import Storage from './Panel/Storage';
//import SaveToStorage from'./Panel/Storage/SaveToStorage';
import InfoBoxModal from './Panel/InfoBoxModal';

const PanelMobile = ({ penType, infoModal, modalStorage }) => (
	<div>
		<button className="uk-button uk-button-primary uk-width-1-1 panel-mobile border-x-none" type="button" uk-toggle="target: #offcanvas-nav-default">Меню</button>
		<div id="offcanvas-nav-default" uk-offcanvas={`${(infoModal || modalStorage) ? "overlay: false" : "overlay: true"}`}>
			<div className="uk-offcanvas-bar uk-flex uk-flex-column">

				<ul className="uk-nav uk-nav-default uk-nav-center">
					<li className="uk-active uk-margin-top uk-margin-bottom">
						<ColorPicker />
					</li>
					<li className="uk-active uk-margin-top uk-margin-bottom">
						<Thickness />
					</li>
					<li className={`uk-active uk-margin-top uk-margin-bottom ${penType === 'pencil' && 'mobile-active'}`}>
						<Pen />
					</li>
					<li className={`uk-active uk-margin-top uk-margin-bottom ${penType === 'pipette' && 'mobile-active'}`}>
						<Pipette />
					</li>
					<li className={`uk-active uk-margin-top uk-margin-bottom ${penType === 'eraser' && 'mobile-active'}`}>
						<Eraser />
					</li>
					<li className={`uk-active uk-margin-top uk-margin-bottom ${penType === 'paint-bucket' && 'mobile-active'}`}>
						<FloodFill />
					</li>
					<li className="uk-active uk-margin-top uk-margin-bottom">
						<ClearButton />
					</li>
					<li className="uk-active uk-margin-top uk-margin-bottom">
						<DownloadButton />
					</li>
					<li className="uk-active uk-margin-top uk-margin-bottom">
						<UploadButton />
					</li>
					{/*<li className="uk-active uk-margin-top uk-margin-bottom">
						<SaveToStorage />
					</li>
					<li className="uk-active uk-margin-top uk-margin-bottom">
						<Storage />
					</li>*/}
					<li className="uk-active uk-margin-top uk-margin-bottom">
						<InfoBoxModal />
					</li>
				</ul>
		
			</div>
		</div>
	</div>
);

const mapStateToProps = state => {
	return {
		penType: state.canvasState.penType,
		infoModal: state.infoModal.isOpen,
		modalStorage: state.modalStorage.isOpen,
	}
}

PanelMobile.propTypes = {
	penType: PropTypes.string.isRequired,
	infoModal: PropTypes.bool.isRequired,
	modalStorage: PropTypes.bool.isRequired
}

export default connect(mapStateToProps, null)(PanelMobile);