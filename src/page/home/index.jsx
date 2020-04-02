import React, { Component } from 'react';
import { Drawer, List, NavBar, Icon } from "antd-mobile"
import {
    Route, Switch
} from 'react-router-dom';
import Reason from "../reason"
import Visitor from "../visitor"
import BlackList from "../blacklist"
import avator from "../../assets/image/geren.svg"
import saomiao from "../../assets/image/saomiao.svg"
import "./index.css"

const menuList = [{
    text: "访问历史",
    key: "Reason",
    url: "/home/reason",
}, {
    text: "校园信息",
    key: "schoolinfo",
    url: "/home/schoolinfo",
},{
    text: "校园地图",
    key: "map",
    url: "/home/map",
}, {
    text: "个人信息",
    key: "visitorinfo",
    url: "/home/visitor",
}, {
    text: "黑名单记录",
    key: "blacklist",
    url: "/home/blacklist",
}]

class Home extends Component {
    state = {
        open: false,
    }
    onOpenChange = (...args) => {
        this.setState({ open: !this.state.open });
    }
    showList = (url) => {
        return () => {
            this.props.history.push(url)
            this.onOpenChange()
        }
    }
    getUserMedia = () => {
        console.log("启动摄像头")
    }
    render() {
        // fix in codepen
        const sidebar = menuList.map(item => (<List>
            <List.Item onClick={this.showList(item.url)} key={item.key}
                multipleLine
            >{item.text}</List.Item>
        </List>));

        return (<div className="mainBox">
            <div className="headBox">
                <NavBar icon={
                    (<div className="iconImageBox"><img src={avator} className="imageicon" /></div>)}
                    onLeftClick={this.onOpenChange}
                    rightContent={[(<div className="imageIconBox" onClick={this.getUserMedia} ><img src={saomiao} className="imageicon" ></img></div>)]
                    } >
                    <div className="title" onClick={() => {
                        this.props.history.push("/home")
                    }}>
                        菜单
                    </div>
                </NavBar>
            </div>
            <div className="contentBox">
                <Switch>
                    <Route exact path="/home/reason" component={Reason} />
                    <Route exact path="/home/visitor" component={Visitor} />
                    <Route exact path="/home/blacklist" component={BlackList} />
                </Switch>
            </div>
            <Drawer
                className="my-drawer"
                style={{ minHeight: document.documentElement.clientHeight }}
                enableDragHandle
                contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
                sidebar={sidebar}
                open={this.state.open}
                onOpenChange={this.onOpenChange}
            >
            </Drawer>
        </div>);
    }
}

export default Home;