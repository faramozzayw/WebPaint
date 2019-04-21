import React, { Component } from 'react';

export default class Thickness extends Component {
	render() {
		return (
			<div>
				<label>Толщина шрифта:
					<select className="uk-select">
						<option>
							6px
						</option>
						<option>
							12px
						</option>
						<option>
							18px
						</option>
						<option>
							24px
						</option>
					</select>
				</label>
			</div>
		);
	}
}
