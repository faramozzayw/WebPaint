import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { enableModal, disableModal }  from './../../../store/actions/modalStorageActions';
import UIkit from 'uikit';
import ImageCard from './ImageCard';
import { 
	sortByDateNewOld, 
	sortByDateOldNew 
} from './../../../modules/Tools';

class StorageModal extends Component {
	state = {
		sortBy: 'По дате(от новых к старым)'
	}

	getStorageElemsMap = () => {
		let arr = [];
		for (let i = 0; i < localStorage.length; i++) {
			let map = new Map();
			let key = localStorage.key(i);
			let item = localStorage.getItem(key);
			map.set(key, item);
			arr.push(map);
		}
		return arr;
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
	

	render() {
		let listMap = this.getStorageElemsMap();

		if (this.state.sortBy === 'По дате(от новых к старым)') 
			listMap = listMap.sort(sortByDateNewOld);
		else if(this.state.sortBy === 'По дате(от старых к новым)')
			listMap = listMap.sort(sortByDateOldNew);

		let list = listMap.map(item => (
			<ImageCard
				key={Math.floor(Math.random() * 100000000)}
				stringKey={item.keys().next().value}
				imgData={item.values().next().value}
		  />
		));

		return (
			<div className="uk-flex uk-flex-column uk-flex-between uk-height-1-1">
				<div>
					<h2 className="uk-heading-line uk-text-center">
						<span>Сохранённые изображения</span>
					</h2>
					<h4>На данный момент сохранено {localStorage.length} {`${localStorage.length === 1? 'изображение' : 'изображений' }`}.</h4>
				<div>
					<form>
						<fieldset class="uk-fieldset">
							<legend class="uk-legend">Сортировать: </legend>
							<div class="uk-margin">
								<select
									class="uk-select uk-width-medium"
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
				<div className="uk-flex uk-flex-around">
					<div className="uk-button-group">
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
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isOpen: state.modalStorage.isOpen,
		reRender: state.modalStorage.reRender
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		enableModal: enableModal,
		disableModal: disableModal
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StorageModal);