import React, { Component } from 'react';
import logo from './logo.svg';
import './FirstPage.less';
import createContainer from '@/utils/createContainer'

class App extends Component {
  componentDidMount() {
    // this.props.fetchAdminuserinfo({
    //   phone: 'my fesjdfoishojj'
    // })
    this.props.addTest('哈哈哈哈')
  }
  render() {
    console.log('-------props:', this.props)
    return (
      <div className="less-test">
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
// export default App

export default createContainer(
  ({ app }) => {
      return {
      }
  },        // mapStateToProps,
  require('@/redux/actions/test').default,    // mapActionCreators,
  App // 木偶组件
)
