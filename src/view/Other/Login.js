import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';

export default class Login extends Component {
    handleLogin = () => {
        sessionStorage.setItem('login', 1)
        this.props.history.replace('/home');
    }
    handleLogout = () => {
        sessionStorage.setItem('login', 0)
        window.location.reload()
    }
    render() {
        let loginStatus = Number(sessionStorage.getItem('login'))
        console.log('----------login:', this.props, loginStatus)
        return (
            <div className="app-wrap-con">
                <NavBar
                    mode="light"
                    // icon={<Icon type="left" />}
                    onLeftClick={() => console.log('onLeftClick')}
                >NavBar</NavBar>
                {
                    loginStatus === 1 ?
                        <button onClick={this.handleLogout}>loginout</button>
                        :
                        <button onClick={this.handleLogin}>login</button>
                }
            </div>
        );
    }
}
