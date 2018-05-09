import React, { Component } from 'react';

class WelcomePage extends Component {
  render() {
    console.log('-------WelcomePage:', this.props)
    return (
      <div>
        <p className="App-intro">
          页面测试WelcomePage
        </p>
      </div>
    );
  }
}

export default WelcomePage;
