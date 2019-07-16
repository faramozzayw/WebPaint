import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { disableInfoModal }  from './../store/actions/infoModalActions';

const InfoBox = ({ disableInfoModal }) => (
	<div id="info-box">
		<div className="uk-margin-medium-bottom">
			<h1 className="uk-heading-divider uk-flex uk-flex-between uk-margin-small-left uk-margin-small-right">
			Краткая справка:
				<span 
					className="uk-icon uk-margin-left uk-icon-button close icon uk-overlay" uk-overlay-icon="true" 
					onClick={() => disableInfoModal()}
				></span>
			</h1>
			
		</div>
		<ul>
			<li className="uk-flex uk-flex-auto uk-margin-small-bottom info-li">
				<span className="uk-icon uk-icon-button uk-icon-image uk-text-middle pencil icon"></span>
				<span className="info-text uk-margin-small-left uk-margin-small-top uk-text-middle ">Ручка. Используется для того, чтобы рисовать линии</span>
			</li>

			<li className="uk-flex uk-flex-auto uk-margin-small-bottom info-li">
				<span className="uk-icon uk-icon-button uk-icon-image uk-text-middle pipette icon"></span>
				<span className="info-text uk-margin-small-left uk-margin-small-top uk-text-middle">Пипетка. Даёт возможность получить цвет в определённой точке холста</span>
			</li>

			<li className="uk-flex uk-flex-auto uk-margin-small-bottom info-li">
				<span className="uk-icon uk-icon-button uk-icon-image uk-text-middle eraser icon"></span>
				<span className="info-text uk-margin-small-left uk-margin-small-top uk-text-middle">Ластик. Ластик используется для очистки произвольного фрагмента</span>
			</li>

			<li className="uk-flex uk-flex-auto uk-margin-small-bottom info-li">
				<span className="uk-icon uk-icon-button uk-icon-image uk-text-middle paint-bucket icon"></span>
				<span className="info-text uk-margin-small-left uk-margin-small-top uk-text-middle">Заливка. Можно использовать для заливки области</span>
			</li>
			<li className="uk-flex uk-flex-auto uk-margin-small-bottom info-li">
				<span className="uk-icon uk-icon-button uk-icon-image uk-text-middle selection icon"></span>
				<span className="info-text uk-margin-small-left uk-margin-small-top uk-text-middle">Выделение. Выделив часть холста можно сохранить её либо на компьютер, либо в хранилище</span>
			</li>
			<li className="uk-flex uk-flex-auto uk-margin-small-bottom info-li">
				<span className="uk-icon uk-icon-button uk-icon-image uk-text-middle trash icon"></span>
				<span className="info-text uk-margin-small-left uk-margin-small-top uk-text-middle">Очищает холст</span>
			</li>

			<li className="uk-flex uk-flex-auto uk-margin-small-bottom info-li">
				<span className="uk-icon uk-icon-button uk-icon-image uk-text-middle download icon"></span>
				<span className="info-text uk-margin-small-left uk-margin-small-top uk-text-middle">Скачивание. Скачивает либо холст, либо фрагмент холста, выделенный с использованием <i>Выделение</i></span>
			</li>

			<li className="uk-flex uk-flex-auto uk-margin-small-bottom info-li">
				<span className="uk-icon uk-icon-button uk-icon-image uk-text-middle upload icon"></span>
				<span className="info-text uk-margin-small-left uk-margin-small-top uk-text-middle">Загрузка. Загружает выбранное изображение(<span className="uk-text-warning">изображене будет сжато, если его размеры будут больше размеров холста</span>)</span>
			</li>

			<li className="uk-flex uk-flex-auto uk-margin-small-bottom info-li">
				<span className="uk-icon uk-icon-button uk-icon-image uk-text-middle cloud-upload icon"></span>
				<span className="info-text uk-margin-small-left uk-margin-small-top uk-text-middle">Сохранение. Сохранение либо холст, либо фрагмент холста, выделенный с использованием <i>Выделение</i> в Хранилище</span>
			</li>

			<li className="uk-flex uk-flex-auto uk-margin-small-bottom info-li">
				<span className="uk-icon uk-icon-button uk-icon-image uk-text-middle storage icon"></span>
				<span className="uk-margin-small-left uk-margin-small-top uk-text-middle">Хранилище. Открывает окно, где храняться сохранённые изображения</span>
			</li>
			<li className="uk-flex uk-flex-auto uk-margin-small-bottom info-li">
				<span className="uk-icon uk-icon-button uk-icon-image uk-text-middle info icon"></span>
				<span className="uk-margin-small-left uk-margin-small-top uk-text-middle">Справка. Открывает окно с краткой справкой</span>
			</li>
			<li className="uk-flex uk-flex-auto uk-margin-small-bottom">
				<h3>Хранилище</h3>
			</li>
			<li className="uk-flex uk-flex-auto uk-margin-small-bottom">
				<span className="uk-margin-small-left uk-margin-small-top uk-text-middle">Хранилище - место, куда можно сохранить изображения без скачивания их на компьютер, а также место, куда сохраняются изображения при обновлени/закрытии вкладки. Можно удалить все изображения, скачать их, включить/выключить сохранение изображения при обновлени/закрытии вкладки(если включено автосохранение). Имя изображения можно изменить кликнув на него</span>
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

InfoBox.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	disableInfoModal: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoBox);