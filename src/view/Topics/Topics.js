import React, { Component } from 'react';

export default class Topics extends Component {
    render() {
        let { pathname } = this.props.location
        let { nowRoute } = this.props
        return (
            <div className="app-wrap-con" style={{ display: pathname === nowRoute ? 'block' : 'none' }}>
                topics
            </div>
        );
    }
}
