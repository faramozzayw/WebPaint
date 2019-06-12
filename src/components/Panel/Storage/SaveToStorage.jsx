import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
// import { bindActionCreators } from 'redux';

class SaveToStorage extends Component {
	handleClick = () => {
		let saveImg = this.props.ctx.canvas.toDataURL('image/png');
		let name = `Name: Рисунок №${localStorage.length + 1}`;
		let date = `Date: ${Date.now()}`;
		console.log("date", date);
		let key = name + date;
		try {
			localStorage.setItem(`${key}`, saveImg);
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

/*const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		changePenType: changePenType
	}, dispatch);
}*/

SaveToStorage.propTypes = {
	ctx: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(SaveToStorage);