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

const Panel = ({penType, isSelecting}) => (
	<div>
		<nav className="uk-navbar-container uk-flex uk-flex-center" uk-navbar="true">
			<div className="uk-navbar-left">
				<ul className="uk-navbar-nav uk-flex uk-flex-row uk-flex-middle panel">
					<li className="uk-active uk-margin-top uk-margin-bottom uk-margin-left uk-margin-right uk-flex uk-flex-middle">
						<ColorPicker />
					</li>
					<li className="uk-active uk-margin-top uk-margin-bottom uk-margin-left uk-margin-medium-right">
						<Thickness />
					</li>
					<li className={`uk-active uk-margin-top uk-margin-bottom uk-margin-left ${penType === 'pencil' && 'active'}`}>
						<Pen />
					</li>
					<li className={`uk-active uk-margin-top uk-margin-bottom uk-margin-left ${penType === 'pipette' && 'active'}`}>
						<Pipette />
					</li>
					<li className={`uk-active uk-margin-top uk-margin-bottom uk-margin-left ${penType === 'eraser' && 'active'}`}>
						<Eraser />
					</li>
					<li className={`uk-active uk-margin-top uk-margin-bottom uk-margin-left ${penType === 'paint-bucket' && 'active'}`}>
						<FloodFill />
					</li>
					<li className={`uk-active uk-margin-top uk-margin-bottom uk-margin-left ${isSelecting && 'active'}`}>
						<Selection />
					</li>
					<li className="uk-active uk-margin-top uk-margin-bottom uk-margin-left uk-margin-medium-right">
						<ClearButton />
					</li>
					<li className="uk-active uk-margin-top uk-margin-bottom uk-margin-left">
						<DownloadButton />
					</li>
					<li className="uk-active uk-margin-top uk-margin-bottom uk-margin-left">
						<UploadButton />
					</li>
					<li className="uk-active uk-margin-top uk-margin-bottom uk-margin-left">
						<SaveToStorage />
					</li>
					<li className="uk-active uk-margin-top uk-margin-bottom uk-margin-left  uk-margin-medium-right">
						<Storage />
					</li>
					<li className="uk-active uk-margin-top uk-margin-bottom uk-margin-left">
						<InfoBoxModal />
					</li>
				</ul>
			</div>
		</nav>
	</div>
);

const mapStateToProps = state => {
	return {
		penType: state.canvasState.penType,
		isSelecting: state.canvasState.isSelecting
	}
}

Panel.propTypes = {
	penType: PropTypes.string.isRequired,
	isSelecting: PropTypes.bool.isRequired
}

export default connect(mapStateToProps, null)(Panel);