import React, { Component } from 'react';
import './../css/App.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';

import Panel from './Panel';
import Canvas from './Canvas';
import DisplayError from './DisplayError';

import { enableInfoModal }  from './../store/actions/infoModalActions';

class App extends Component {
	componentDidMount() {
		let regex = /(?<=firstLogin=).*/g;

		try {
			let exist = regex.test(document.cookie);
			if (exist) 
				document.cookie = document.cookie.replace(regex, 'false');
			else {
				document.cookie = "firstLogin=true";
				this.props.enableInfoModal();
			}
		} catch (e) {
			console.log(`Failed with error: ${e}`);
		}
	}

	render() {
		const app = !(window.innerWidth < 800) ? 
		(
			<div className="App">
				<Panel />
				<Canvas /> 
			</div>
		) : <DisplayError />;

		return (
			<div>
				{app}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isOpen: state.infoModal.isOpen
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		enableInfoModal: enableInfoModal
	}, dispatch);
}

App.propTypes = {
	isOpen: PropTypes.bool.isRequired, 
	enableInfoModal: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);