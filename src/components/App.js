import React, { Component } from 'react';
import './../css/App.css';
import Panel from './Panel';
import Canvas from './Canvas';
import DisplayError from './DisplayError';

class App extends Component {
  render() {
  	const app = !(window.innerWidth < 800) ? 
    (
      <div className="App">
		  	<Panel />
		  	<Canvas /> 
		  </div>
    ) : <DisplayError />;

    return (
    	<div>
    		{app}
    	</div>
    );
  }
}

export default App;
