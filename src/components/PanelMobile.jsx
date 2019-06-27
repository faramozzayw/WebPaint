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
import Selection from './Panel/Selection';
import Storage from './Panel/Storage';
import SaveToStorage from'./Panel/Storage/SaveToStorage';
import InfoBoxModal from './Panel/InfoBoxModal';

const PanelMobile = ({ penType, isSelecting }) => (
	<div className="panel-mobile">
		<button className="uk-button uk-button-primary uk-width-1-1" type="button" uk-toggle="target: #offcanvas-nav-default">Меню</button>
		<div id="offcanvas-nav-default" uk-offcanvas="overlay: true">
			<div className="uk-offcanvas-bar uk-flex uk-flex-column">

				<ul className="uk-nav uk-nav-default uk-nav-center uk-margin-auto-vertical">
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
					<li className={`uk-active uk-margin-top uk-margin-bottom ${isSelecting && 'mobile-active'}`}>
						<Selection />
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
					<li className="uk-active uk-margin-top uk-margin-bottom">
						<SaveToStorage />
					</li>
					<li className="uk-active uk-margin-top uk-margin-bottom">
						<Storage />
					</li>
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
		isSelecting: state.canvasState.isSelecting
	}
}

PanelMobile.propTypes = {
	penType: PropTypes.string.isRequired,
	isSelecting: PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(PanelMobile);