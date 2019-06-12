import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { enableModal, disableModal }  from './../../../store/actions/modalStorageActions';
import UIkit from 'uikit';
import ImageCard from './ImageCard';

class StorageModal extends Component {
	state = {
		listMap: undefined,
		length: NaN
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

	componentWillMount() {
		this.setState({
			listMap: this.getStorageElemsMap(),
			length: localStorage.length
		})
	}

	clearHandle = () => {
		if (localStorage.length !== 0) {
			localStorage.clear();
			UIkit.notification({
				message: 'Хранилище было очищено.',
				pos: 'bottom-right',
				timeout: 2500
			});
		} else 
			UIkit.notification({
				message: 'Хранилище пустое!',
				pos: 'bottom-right',
				timeout: 2500
			});
	}


	render() {
		let list = this.state.listMap.map(item => (
			<ImageCard
		  	name={item.keys().next().value}
		  	imgData={item.values().next().value}
		  />
		));

		return (
			<div className="uk-container">
				<div>
					<h2 className="uk-heading-line uk-text-center">
						<span>Сохранённые изображения</span>
					</h2>
					<h4>На данный момент сохранено {this.state.length} {`${this.state.length === 1? 'изображение' : 'изображений' }`}.</h4>
				</div>
				<div className="uk-padding uk-flex uk-flex-around uk-flex-row uk-flex-wrap uk-flex-wrap-stretch">
					{list}
				</div>
				<div className="uk-flex uk-flex-between">
					<button 
						onClick={this.clearHandle.bind(this)}
						className="uk-button uk-button-danger"
					>Удалить всё</button>
					<button 
						onClick={this.getStorageElemsMap.bind(this)}
						className="uk-button uk-button-danger"
					>Элементы</button>
					<button 
						onClick={() => this.props.disableModal()}
						className="uk-button uk-button-primary"
					>Закрыть</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isOpen: state.modalStorage.isOpen
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		enableModal: enableModal,
		disableModal: disableModal
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StorageModal);