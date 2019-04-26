import React, { Component } from 'react';
import Thickness from './Panel/Thickness';
import ColorPicker from './Panel/ColorPicker';
import ClearButton from './Panel/ClearButton';
import SaveButton from './Panel/SaveButton';
import Pipette from './Panel/Pipette';
import Pen from './Panel/Pen';

export default class Panel extends Component {
	render() {
		return (
			<div>
				<nav className="uk-navbar-container uk-flex uk-flex-center" uk-navbar="true">
					<div className="uk-navbar-left">
						<ul className="uk-navbar-nav uk-flex uk-flex-row uk-flex-middle">
							<li className="uk-active uk-margin-top uk-margin-bottom uk-margin-left uk-margin-right uk-flex uk-flex-middle">
								<ColorPicker />
							</li>
							<li className="uk-active uk-margin-top uk-margin-bottom uk-margin-left uk-margin-right">
								<Thickness />
							</li>
							<li className="uk-active uk-margin-top uk-margin-bottom uk-margin-left uk-margin-right" title="Пипетка">
								<Pen />
							</li>
							<li className="uk-active uk-margin-top uk-margin-bottom uk-margin-left uk-margin-right" title="Пипетка">
								<Pipette />
							</li>
							<li className="uk-active uk-margin-top uk-margin-bottom uk-margin-left uk-margin-right">
								<ClearButton />
							</li>
							<li className="uk-active uk-margin-top uk-margin-bottom uk-margin-left uk-margin-right">
								<SaveButton />
							</li>
						</ul>
					</div>
				</nav>
			</div>
		);
	}
}