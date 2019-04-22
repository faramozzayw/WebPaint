import React, { Component } from 'react';
import './../css/App.css';
import Panel from './Panel';
import Canvas from './Canvas';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Panel />
        <Canvas />
      </div>
    );
  }
}

export default App;
