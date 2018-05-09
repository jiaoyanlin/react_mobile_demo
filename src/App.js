
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import FirstPage from '@/view/FirstPage'
import { Button } from 'antd-mobile';

import store from '@store';
import { Provider } from 'react-redux';
import { injectReducer } from './redux/reducers';
// 立即注入 Reducer, 这里的App就是全局的store中的一个属性，利用state.app可以去到这里注入的函数
injectReducer('test', require('./redux/reducers/test').default);

class BasicExample extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div>
						<ul>
							<li><Link to="/">Home</Link></li>
							<li><Link to="/about">About</Link></li>
							<li><Link to="/topics">Topics</Link></li>
						</ul>
						<Button>start</Button>
						<Button>end</Button>

						<hr />

						<Route exact path="/" component={Home} />
						<Route path="/about" component={About} />
						<Route path="/topics" component={Topics} />
						<Route path="*" component={FirstPage} />
						<Switch>
						</Switch>
					</div>
				</Router>
			</Provider>
		)
	}
}

const Home = () => (
	<div>
		<h2>Home</h2>
	</div>
)

const About = () => (
	<div>
		<h2>About</h2>
	</div>
)

const Topics = ({ match }) => (
	<div>
		<h2>Topics</h2>
		<ul>
			<li>
				<Link to={`${match.url}/rendering`}>
					Rendering with React
        </Link>
			</li>
			<li>
				<Link to={`${match.url}/components`}>
					Components
        </Link>
			</li>
			<li>
				<Link to={`${match.url}/props-v-state`}>
					Props v. State
        </Link>
			</li>
		</ul>

		<Route path={`${match.url}/:topicId`} component={Topic} />
		<Route exact path={match.url} render={() => (
			<h3>Please select a topic.</h3>
		)} />
	</div>
)

const Topic = ({ match }) => (
	<div>
		<h3>{match.params.topicId}</h3>
	</div>
)

export default BasicExample
