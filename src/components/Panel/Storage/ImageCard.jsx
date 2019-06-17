import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
	reRenderModal, 
	disableModal 
}  from './../../../store/actions/modalStorageActions';
import { parseKey } from './../../../modules/Tools';
import PropTypes from 'prop-types'

class ImageCard extends PureComponent {
	state = {
		showEditForm: false
	}

	onCanvas = () => {
		this.props.ctx.drawImage(this.refs.image, 0, 0);
		this.props.disableModal();
	}

	editName = e => {
		let { stringKey } = this.props;
		let date = localStorage.getItem(stringKey);

		localStorage.removeItem(stringKey);

		let regexName = /(?<=Name: ).*(?=Date)/g;
		stringKey = stringKey.replace(regexName, this.refs.editInput.value);

		localStorage.setItem(stringKey, date);
		this.setState({
			showEditForm: false
		}, this.props.reRenderModal());
	}

	deleteImg = e => {
		localStorage.removeItem(this.props.stringKey);
		this.props.reRenderModal();
	}

	headerClick = e => {
		this.setState((prevState, props) => {
			return {
				showEditForm: !prevState.showEditForm 
			}
		})
	}

	disableEditForm = () => this.setState({ showEditForm: false })

	render() {
		let { stringKey, imgData } = this.props;
		let { showEditForm } = this.state;
		let info = parseKey(stringKey);
		let hidden = !showEditForm ? "uk-hidden" : "";

		return (
			<div className="uk-margin-bottom uk-margin-left uk-card uk-width-medium uk-card-default uk-flex uk-flex-column uk-flex-between">
				<div className="uk-flex uk-flex-column uk-flex-between uk-flex-1">
					<div className="uk-card-media-top uk-card-header">
					<img
						className="image-border"
						src={imgData}
						alt=""
						ref="image"
					/>
					</div>
					<div className="uk-card-body padding">
						<h4 
							className="uk-card-title uk-heading-bullet"
							onClick={this.headerClick.bind(this)}
						>{info.name}</h4>
						<div id="editBox" className={`${hidden} uk-margin-small-bottom`}>
							<input 
								className="uk-input uk-form-width-small uk-form-small" 
								type="text" 
								defaultValue={info.name} 
								ref="editInput"
							/>
							<div className="uk-button-group">
							<span 
								className="uk-icon uk-margin-small-left uk-icon-button check" 
								onClick={this.editName.bind(this)}
							></span>
							<span 
								className="uk-icon uk-margin-small-left uk-icon-button close" 
								onClick={this.disableEditForm.bind(this)}
							></span>
							</div>
						</div>
						<span>Дата создания файла: <br/>{info.date}</span>
						<br/>
						<span>Размеры: {info.size}</span>
					</div>
				</div>
				<div className="uk-button-group uk-width-1-1">
					<button 
						className="uk-button uk-button-primary uk-width-1-2"
						onClick={this.onCanvas.bind(this)}
					>На холст</button>
					<button 
						className="uk-button uk-button-danger uk-width-1-2"
						onClick={this.deleteImg.bind(this)}
					>Удалить</button>
				</div>
			</div> 
		);
	}
}

const mapStateToProps = state => {
	return {
		ctx: state.canvasState.ctx
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		reRenderModal: reRenderModal,
		disableModal: disableModal
	}, dispatch);
}

ImageCard.propTypes = {
	ctx: PropTypes.object.isRequired,
	reRenderModal: PropTypes.func.isRequired,
	disableModal: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageCard);