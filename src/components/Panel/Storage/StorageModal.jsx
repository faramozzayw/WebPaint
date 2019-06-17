import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types'

import docCookies from 'doc-cookies';

import { 
	enableModal, 
	disableModal
}  from './../../../store/actions/modalStorageActions';

import UIkit from 'uikit';
import ImageCard from './ImageCard';
import { 
	sortByDateNewOld, 
	sortByDateOldNew,
	getStorageElemsMap
} from './../../../modules/Tools';

class StorageModal extends Component {
	state = {
		sortBy: 'По дате(от новых к старым)'
	}

	clearHandle = () => {
		if (localStorage.length !== 0) {
			localStorage.clear();
			UIkit.notification({
				message: 'Хранилище было очищено.',
				pos: 'bottom-right',
				timeout: 2500
			});
			this.forceUpdate();
		} else 
			UIkit.notification({
				message: 'Хранилище пустое!',
				pos: 'bottom-right',
				timeout: 2500
			});
	}

	handleChange = event => this.setState({ sortBy: event.target.value })

	autosaveControlClick = () => {
		let str = "autosaveEnable";
		let autosave = docCookies.getItem(str);
		if(autosave !== null) {
			docCookies.setItem(str, (!JSON.parse(autosave)).toString());
			this.forceUpdate();
		}
	}

	downloadAllImg = () => {
		let list = getStorageElemsMap();
		if(list.length === 0) {
			UIkit.notification({
				message: 'Хранилище пустое!',
				pos: 'bottom-right',
				timeout: 2500
			});
			return;
		}
		let link = document.createElement('a');
		let regexName = /(?<=Name: ).*(?=Date)/g;

		for(let elem of list) {
			
			let key = elem.keys().next().value
			let name = key.match(regexName)[0];
			link.download = `${name}.png`;
			link.href = elem.values().next().value;
			link.click();
		}
		link.remove();
	}

	render() {
		let listMap = getStorageElemsMap();
		let { sortBy } = this.state;
		if (sortBy === 'По дате(от новых к старым)') 
			listMap = listMap.sort(sortByDateNewOld);
		else if(sortBy === 'По дате(от старых к новым)')
			listMap = listMap.sort(sortByDateOldNew);

		let list = listMap.map(item => (
			<ImageCard
				key={Math.floor(Math.random() * 100000000)}
				stringKey={item.keys().next().value}
				imgData={item.values().next().value}
			/>
		));

		const autosave = JSON.parse(docCookies.getItem("autosaveEnable"));

		return (
			<div className="uk-flex uk-flex-column uk-flex-between uk-height-1-1">
				<div>
					<h2 className="uk-heading-line uk-text-center">
						<span>Сохранённые изображения</span>
					</h2>
					<h4>На данный момент сохранено {localStorage.length} {`${localStorage.length === 1 ? 'изображение' : 'изображений' }`}.</h4>
				<div>
					<form>
						<fieldset className="uk-fieldset">
							<legend className="uk-legend">Сортировать: </legend>
							<div className="uk-margin">
								<select
									className="uk-select uk-width-medium"
									onChange={this.handleChange.bind(this)}
									value={this.state.sortBy}
								>
									<option value="По дате(от новых к старым)">По дате(от новых к старым)</option>
									<option value="По дате(от старых к новым)">По дате(от старых к новым)</option>
								</select>
							</div>
						</fieldset>
					</form>
				</div>
				</div>
				<div className="uk-padding uk-flex uk-flex-around uk-flex-row uk-flex-wrap uk-flex-wrap-stretch">
					{list}
				</div>
				<div className="uk-flex uk-flex-around uk-button-group">
						<button
							onClick={this.downloadAllImg.bind(this)}
							className="uk-button uk-margin-right uk-margin-bottom uk-button-default"
						>Скачать всё</button>

						<button
							onClick={this.autosaveControlClick.bind(this)}
							className="uk-button uk-margin-left uk-margin-bottom uk-button-secondary"
						>{`${autosave ? "Выключить" : "Включить"} автосохранение`}</button>

						<button
							onClick={this.clearHandle.bind(this)}
							className="uk-button uk-margin-right uk-margin-bottom uk-button-danger"
						>Удалить всё</button>

						<button
							onClick={() => this.props.disableModal()}
							className="uk-button uk-margin-left uk-margin-bottom uk-button-primary"
						>Закрыть</button>

					
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isOpen: state.modalStorage.isOpen,
		reRender: state.modalStorage.reRender,
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		enableModal: enableModal,
		disableModal: disableModal,
	}, dispatch);
}

StorageModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	reRender: PropTypes.number.isRequired,
	enableModal: PropTypes.func.isRequired,
	disableModal: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(StorageModal);