import React, { Component } from 'react';

export default class Me extends Component {
    render() {
        let { pathname } = this.props.location
        let { nowRoute } = this.props
        return (
            <div className="app-wrap-con" style={{ display: pathname === nowRoute ? 'block' : 'none' }}>
                me
            </div>
        );
    }
}
