import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import UIkit from 'uikit';

class SaveToStorage extends Component {
	handleClick = () => {
		let saveImg = this.props.ctx.canvas.toDataURL('image/png');
		let name = `Name: Рисунок №${localStorage.length + 1}`;
		let date = `Date: ${Date.now()}`;
		let size = `Size: ${this.props.ctx.canvas.width} x ${this.props.ctx.canvas.height}`
		let key = name + date + size;
		try {
			localStorage.setItem(`${key}`, saveImg);
			UIkit.notification({
				message: 'Изображение было сохранено в хранилище.',
				pos: 'bottom-right',
				timeout: 2500
			});
		} catch(e) {
			console.log("Storage failed: " + e);
		}
	}

	render() {
		return (
			<div className="uk-margin-small-top">
				<span 
					className="uk-icon uk-icon-button cloud-upload" 
					onClick={this.handleClick.bind(this)}
				></span>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		ctx: state.canvasState.ctx
	}
}

SaveToStorage.propTypes = {
	ctx: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(SaveToStorage);