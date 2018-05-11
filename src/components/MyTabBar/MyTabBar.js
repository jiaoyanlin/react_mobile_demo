import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { TabBar } from 'antd-mobile';

const TabBarItem = TabBar.Item

class MyTabBar extends Component {
    navTo = (nav) => {
        this.props.history.replace(nav);
    }
    render() {
        let { showRoute, location } = this.props
        let show = showRoute.indexOf(location.pathname) === -1
        return (
            <TabBar
                unselectedTintColor="#666"
                tintColor="#0dc137"
                barTintColor="white"
                noRenderContent={true}
                hidden={show}
            >
                <TabBarItem
                    title="Home"
                    key="Home"
                    icon={{ uri: require('./images/wechat.png') }}
                    selectedIcon={{ uri: require('./images/wechat_act.png') }}
                    selected={showRoute[0] === location.pathname}
                    // badge={1}
                    onPress={() => { this.navTo(showRoute[0]) }}
                >
                </TabBarItem>
                <TabBarItem
                    icon={{ uri: require('./images/contact.png') }}
                    selectedIcon={{ uri: require('./images/contact_act.png') }}
                    title="About"
                    key="About"
                    selected={showRoute[1] === location.pathname}
                    onPress={() => { this.navTo(showRoute[1]) }}
                >
                </TabBarItem>
                <TabBarItem
                    icon={{ uri: require('./images/report.png') }}
                    selectedIcon={{ uri: require('./images/report_act.png') }}
                    title="Topics"
                    key="Topics"
                    selected={showRoute[2] === location.pathname}
                    onPress={() => { this.navTo(showRoute[2]) }}
                >
                </TabBarItem>
                <TabBarItem
                    icon={{ uri: require('./images/me.png') }}
                    selectedIcon={{ uri: require('./images/me_act.png') }}
                    title="Me"
                    key="Me"
                    selected={showRoute[3] === location.pathname}
                    onPress={() => { this.navTo(showRoute[3]) }}
                >
                </TabBarItem>
            </TabBar>
        );
    }
}

export default withRouter(MyTabBar);
