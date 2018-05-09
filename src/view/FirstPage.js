import React, { Component } from 'react';
import logo from './logo.svg';
// import './App.css';

class App extends Component {
  render() {
    console.log('-------props:', this.props)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          第一个页面测试
        </p>
      </div>
    );
  }
}

export default App;
