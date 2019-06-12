import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reRenderModal }  from './../../../store/actions/modalStorageActions';

class ImageCard extends PureComponent {
	parseKey = string => {
		let regexName = /(?<=Name: ).*(?=Date)/g;
		let name = string.match(regexName)[0];

		let regexDate = /(?<=Date: )\d+/g;
		let resultRegexDate = /^.*(?= GMT)/g;
		let date = Number.parseInt(string.match(regexDate)[0], 10);
		date = String(new Date(date));
		date = date.match(resultRegexDate)[0];

		let regexSize = /(?<=Size: ).*$/g;
		let size = string.match(regexSize)[0];

		return {
			name: name,
			date: date,
			size: size
		}
	}

	render() {
  		let { stringKey, imgData } = this.props;
  		let info = this.parseKey(stringKey);

    	return (
    	    <div className="uk-margin-bottom uk-margin-left uk-card uk-card-small uk-width-1-3 uk-flex-none uk-card-default">
    	      <div className="uk-card-media-top uk-card-header">
    	        <img src={imgData} alt="" ref="image"/>
						</div>
						<div className="uk-card-body">
							<h4 className="uk-card-title">{info.name}</h4>
							<span>Дата создания файла: <br/>{info.date}</span>
							<br/>
							<span>Размеры: {info.size}</span>
    	      </div>
    	      <div class="uk-button-group uk-width-1-1">
    	      	<button class="uk-button uk-button-primary uk-width-1-2">На холст</button>
    	      	<button 
    	      		class="uk-button uk-button-danger uk-width-1-2"
    	      		onClick={() => {
    	      			localStorage.removeItem(stringKey);
    	      			this.props.reRenderModal();
    	      		}}
    	      	>Удалить</button>
    	      </div>
    	    </div> 
    	);
	}
}

const mapStateToProps = state => {
	return {
		reRender: state.modalStorage.reRender
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		reRenderModal: reRenderModal
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageCard);