
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import { Home, HomeInfo } from '@/view/Home'
import { About } from '@/view/About'
import { Topics } from '@/view/Topics'
import { Me } from '@/view/Me'
import { Login } from '@/view/Other'
// import { Button } from 'antd-mobile';
import { MyTabBar } from '@components';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	componentWillReceiveProps(nextProps) {
		let pathName = this.props.location.pathname
		let pathNameNew = nextProps.location.pathname
		if (pathNameNew !== pathName) {
			console.log('------------路由改变', pathName, pathNameNew)
			this._navToLogin(nextProps)
		}
	}
	componentWillMount() {
		this._navToLogin(this.props)
	}
	// 判断是否登录，未登录则跳转到登录页面
	_navToLogin(props) {
		if (props.location.pathname.indexOf('login') === -1 && !sessionStorage.getItem('login')) { // 非登录页面
			props.history.replace('/login');
		}
	}
	render() {
		console.log('-------app:', this.props)
		let showRoute = ['/home', '/about', '/topics', '/me']
		let {location, history} = this.props
		return (
			<div className="app-wrap">
				<div className="app-wrap" style={{display: showRoute.indexOf(location.pathname) === -1 ? 'none' : 'flex'}}>
					<Home nowRoute='/home' location={{...location}} history={{...history}} />
					<About nowRoute='/about' location={{...location}} history={{...history}} />
					<Topics nowRoute='/topics' location={{...location}} history={{...history}} />
					<Me nowRoute='/me' location={{...location}} history={{...history}} />
					<MyTabBar showRoute={showRoute} />
				</div>
				<Switch>
					<Route path="/login" component={Login} />
					<Route path="/homeInfo" component={HomeInfo} />
				</Switch>
			</div>
		)
	}
}

export default withRouter(App)
