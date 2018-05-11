import React, { Component } from 'react';
// import { withRouter } from "react-router-dom";
import createContainer from '@/utils/createContainer'
import { NavBar, Icon } from 'antd-mobile';

class Home extends Component {
    shouldComponentUpdate(nextProps) {
        console.log('---------home next:', nextProps, nextProps.location.pathname)
        return (nextProps.location.pathname === '/home' || this.props.location.pathname === '/home')
    }
    navTo (nav) {
        this.props.history.push(nav);
    }
    render() {
        console.log('-------home props:', this.props)
        let { pathname } = this.props.location
        let { nowRoute } = this.props
        return (
            <div className="app-wrap-con" style={{ display: pathname === nowRoute ? 'block' : 'none' }}>
                <NavBar
                    mode="light"
                >home</NavBar>
                <div>this is home page</div>
                <button onClick={this.navTo.bind(this, 'homeInfo')}>nav to homeInfo</button>
                <button onClick={this.navTo.bind(this, 'login')}>nav to login</button>
            </div>
        );
    }
}

export default createContainer(
    ({ test }) => {
        return {
            test: test
        }
    },        // mapStateToProps,
    require('@/redux/actions/test').default,    // mapActionCreators,
    Home
)
