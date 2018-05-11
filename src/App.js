
import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import MyRouter from '@/view/Router'

import store from '@store';
import { Provider } from 'react-redux';
import { injectReducer } from './redux/reducers';
// 立即注入 Reducer, 这里的App就是全局的store中的一个属性，利用state.app可以去到这里注入的函数
injectReducer('test', require('./redux/reducers/test').default);

class App extends Component {
	constructor(props) {
        super(props);
        this.state = {
        };
    }
	render() {
		return (
			<Provider store={store}>
				<Router>
					<MyRouter />
				</Router>
			</Provider>
		)
	}
}

export default App
