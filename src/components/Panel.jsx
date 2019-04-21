import React, { Component } from 'react';
import Thickness from './Panel/Thickness';
import ColorPicker from './Panel/ColorPicker';

export default class Panel extends Component {
	render() {
		return (
			<div>
				<nav className="uk-navbar-container" uk-navbar="true">
					<div className="uk-navbar-left">
						<ul className="uk-navbar-nav">
							<li className="uk-active uk-margin-top uk-margin-bottom uk-margin-left uk-margin-right uk-flex uk-flex-middle">
								<ColorPicker />
							</li>
							<li className="uk-active uk-margin-top uk-margin-bottom uk-margin-left uk-margin-right">
								<Thickness />
							</li>
						</ul>
					</div>
				</nav>
			</div>
		);
	}
}