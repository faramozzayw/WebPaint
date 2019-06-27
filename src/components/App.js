import React, { Component } from 'react';
import './../css/App.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import docCookies from 'doc-cookies';

import Panel from './Panel';
import PanelMobile from './PanelMobile';
import Canvas from './Canvas';
import DisplayError from './DisplayError';

import { enableInfoModal }  from './../store/actions/infoModalActions';

class App extends Component {
	onUnload = e => {
		let  { ctx } = this.props;
		let autosave = docCookies.getItem("autosaveEnable");
		autosave = JSON.parse(autosave);
		if (autosave) {
			let saveImg = ctx.canvas.toDataURL('image/png');
			let name = `Name: Несохраненный  рисунок`;
			let date = `Date: ${Date.now()}`;
			let imgSize = `Size: ${ctx.canvas.width} x ${ctx.canvas.height}`;
			let key = name + date + imgSize;
			localStorage.setItem(`${key}`, saveImg);
		}
	}

	componentDidMount() {
		try {
			let exist = docCookies.hasItem("firstLogin");
			if (exist) {
				docCookies.setItem("firstLogin", "false")
			} else {
				docCookies.setItem("firstLogin", "true");
				docCookies.setItem("autosaveEnable", "false");
				this.props.enableInfoModal();
			}
		} catch (e) {
			console.log("e", e);
			console.log(`Failed with error: ${e}`);
		} finally {
			window.addEventListener('beforeunload', this.onUnload);
		}
	}

	componentDidUmmount() {
		window.removeEventListener("beforeunload", this.onUnload)
	}

	render() {
		const app = !(window.innerWidth < 800) ? 
		(
			<div className="App">
				<Panel />
				<Canvas /> 
			</div>
		) : (
			<div className="App">
				<PanelMobile />
				<Canvas /> 
			</div>
		)

		return (
			<div>
				{app}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isOpen: state.infoModal.isOpen,
		ctx: state.canvasState.ctx,
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		enableInfoModal: enableInfoModal
	}, dispatch);
}

App.propTypes = {
	isOpen: PropTypes.bool.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(App);