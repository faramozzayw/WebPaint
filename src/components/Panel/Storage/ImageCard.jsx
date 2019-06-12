import React, { PureComponent } from 'react';

class ImageCard extends PureComponent {
	parseKey = string => {
		let regexName = /(?<=Name: ).*(?=Date)/g;
		let name = string.match(regexName)[0];

		let regexDate = /(?<=Date: )\d+/g;
		let resultRegexDate = /^.*(?= GMT)/g;
		let date = string.match(regexDate)[0];
		console.log("date", new Date(date * 1000));
		//date = date.match(resultRegexDate)[0];

		return {
			name: name,
			date: date
		}
	}

	render() {
  		let { name, imgData } = this.props;
  		let info = this.parseKey(name);

    	return (
    	    <div className="uk-margin-bottom uk-margin-left uk-card uk-card-small uk-width-1-3 uk-flex-none uk-card-default">
    	      <div className="uk-card-media-top uk-card-header">
    	        <img src={imgData} alt="" ref="image"/>
    	      </div>
    	      <div className="uk-card-body">
    	        <h4 className="uk-card-title">{info.name}</h4>
    	        <span>Дата создания файла: <br/>{info.date}</span>
    	      </div>
    	    </div> 
    	);
	}
}

export default ImageCard;