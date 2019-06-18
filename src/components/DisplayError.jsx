import React from 'react';

const DisplayError = () => (
	<div className="uk-container uk-margin-small-top">
		<div className="uk-card uk-card-default uk-width-1-2@m">
			<div className="uk-card-header">
				<div className="uk-grid-small uk-flex-middle" uk-grid="true">
				  <div className="uk-width-expand uk-flex uk-flex-center">
						<h3 className="uk-card-title uk-margin-remove-bottom">Ваш браузер не поддерживается</h3>
				 	</div>
				</div>
			</div>
			<div className="uk-card-body uk-flex uk-flex-center">
			  <button 
			  	className="uk-button uk-button-danger uk-button-small"
			  	onClick={() => console.log("Больно же")}
			  >Кинуть в faramo_zayw тапок</button>
			</div>
		</div>
	</div>
)

export default DisplayError;