import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { disableInfoModal }  from './../store/actions/infoModalActions';

const InfoBox = ({disableInfoModal}) => (
	<div>
		<div className="uk-margin-medium-bottom">
			<h1 className="uk-heading-divider uk-flex uk-flex-between uk-margin-small-left uk-margin-small-right">
			Краткая информация:
				<span 
					className="uk-icon uk-margin-left uk-icon-button close uk-overlay" uk-overlay-icon="true" 
					onClick={() => disableInfoModal()}
				></span>
			</h1>
			
		</div>
		<ul>
			<li className="uk-flex uk-flex-auto uk-margin-small-bottom">
				<span className="uk-icon uk-icon-button uk-icon-image uk-text-middle pencil"></span>
				<span className="uk-margin-small-left uk-margin-small-top uk-text-middle ">Ручка. Используется для того, чтобы рисовать линии</span>
			</li>

			<li className="uk-flex uk-flex-auto uk-margin-small-bottom">
				<span className="uk-icon uk-icon-button uk-icon-image uk-text-middle pipette"></span>
				<span className="uk-margin-small-left uk-margin-small-top uk-text-middle">Пипетка. Даёт возможность получить цвет в определённой точке холста</span>
			</li>

			<li className="uk-flex uk-flex-auto uk-margin-small-bottom">
				<span className="uk-icon uk-icon-button uk-icon-image uk-text-middle eraser"></span>
				<span className="uk-margin-small-left uk-margin-small-top uk-text-middle">Ластик. Ластик используется для очистки произвольного фрагмента</span>
			</li>

			<li className="uk-flex uk-flex-auto uk-margin-small-bottom">
				<span className="uk-icon uk-icon-button uk-icon-image uk-text-middle paint-bucket"></span>
				<span className="uk-margin-small-left uk-margin-small-top uk-text-middle">Заливка. Можно использовать для заливки области</span>
			</li>
			<li className="uk-flex uk-flex-auto uk-margin-small-bottom">
				<span className="uk-icon uk-icon-button uk-icon-image uk-text-middle selection"></span>
				<span className="uk-margin-small-left uk-margin-small-top uk-text-middle">Выделение. Выделив часть холста можно сохранить её либо на компьютер, либо в хранилище</span>
			</li>
			<li className="uk-flex uk-flex-auto uk-margin-small-bottom">
				<span className="uk-icon uk-icon-button uk-icon-image uk-text-middle trash"></span>
				<span className="uk-margin-small-left uk-margin-small-top uk-text-middle">Очищает холст</span>
			</li>

			<li className="uk-flex uk-flex-auto uk-margin-small-bottom">
				<span className="uk-icon uk-icon-button uk-icon-image uk-text-middle download"></span>
				<span className="uk-margin-small-left uk-margin-small-top uk-text-middle">Скачивание. Скачивает либо холст, либо фрагмент холста, выделенный с использованием <i>Выделение</i></span>
			</li>

			<li className="uk-flex uk-flex-auto uk-margin-small-bottom">
				<span className="uk-icon uk-icon-button uk-icon-image uk-text-middle upload"></span>
				<span className="uk-margin-small-left uk-margin-small-top uk-text-middle">Загрузка. Загружает выбранное изображение(<span className="uk-text-warning">изображене будет сжато, если его размеры будут больше размеров холста</span>)</span>
			</li>

			<li className="uk-flex uk-flex-auto uk-margin-small-bottom">
				<span className="uk-icon uk-icon-button uk-icon-image uk-text-middle cloud-upload"></span>
				<span className="uk-margin-small-left uk-margin-small-top uk-text-middle">Сохранение. Сохранение либо холст, либо фрагмент холста, выделенный с использованием <i>Выделение</i> в Хранилище</span>
			</li>

			<li className="uk-flex uk-flex-auto uk-margin-small-bottom">
				<span className="uk-icon uk-icon-button uk-icon-image uk-text-middle storage"></span>
				<span className="uk-margin-small-left uk-margin-small-top uk-text-middle">Хранилище. Открывает окно, где храняться сохранённые изображения</span>
			</li>

		</ul>
	</div>
);

const mapStateToProps = state => {
	return {
		isOpen: state.infoModal.isOpen,
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		disableInfoModal: disableInfoModal
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoBox);