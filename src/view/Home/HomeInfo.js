import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';

export default class HomeInfo extends Component {
    navTo (nav) {
        this.props.history.push(nav);
    }
    render() {
        return (
            <div className="app-wrap">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >homeInfo</NavBar>
                homeInfo
            </div>
        );
    }
}
