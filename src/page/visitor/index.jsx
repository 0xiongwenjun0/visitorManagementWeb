import React, { Component } from 'react';
import { InputItem, List, Button, Modal, Picker } from "antd-mobile"
import { getVisitorInfo, updateVisitorInfo } from "../../api/visitor/index"
import "./index.css"

const alert = Modal.alert;

const district = [{
    label:
        (<div>
            <span
                style={{ backgroundColor: '#FF0000' }}
            />
            <span>行人</span>
        </div>),
    value: 'visitor',
}, {
    label:
        (<div>
            <span
                style={{ backgroundColor: '#FF0000' }}
            />
            <span>车辆</span>
        </div>),
    value: 'car',
}]


class Visitor extends Component {
    constructor(props) {
        super(props)
        getVisitorInfo().then(result => {
            if (result.result.result) {
                alert("警告", result.result.result, [{ text: "确认" }])
            } else if (result.result.visitor) {
                this.setState({
                    visitor: {
                        avator: result.result.visitor.avator,
                        name: result.result.visitor.name,
                        id: result.result.visitor.id,
                        type: [result.result.visitor.type],
                    }
                })
            }
        })
    }
    state = {
        visitor: {
            avator: "",
            name: "",
            id: null,
            type: null,
        }
    }
    UpdateVisitorInfo = async () => {
        let { name, id, type, avator } = this.state.visitor
        id = id && +id.toString().split(" ").join("")
        if (!name || !type) {
            alert("警告", "请填写完全信息", [{ text: "确认" }])
            return;
        }
        let result = await updateVisitorInfo({ name, id, avator, type: type[0] })
        if (result.message == "success") {
            alert("", result.result.result, [{
                text: "确认", onPress: () => {
                    if (result.result.sign)
                        this.props.history.push("/")
                }
            }])
        } else {
            alert("警告", "后台错误", [{
                text: "确认"
            }])
        }
    }

    changeName = (value) => {
        this.setState({
            visitor: {
                ...this.state.visitor,
                name: value
            }
        })
    }
    changeId = (value) => {
        this.setState({
            visitor: {
                ...this.state.visitor,
                id: value
            }
        })
    }

    changeColor = (value) => {
        this.setState({
            visitor: {
                ...this.state.visitor,
                type: value
            }
        })
    }

    render() {
        let { avator,
            name,
            id,
            type } = this.state.visitor
        return (
            <div className="mainBox visitorBox">
                <div className="titleBox">
                    <div className="signtitle">
                        个人信息
                    </div>
                </div>
                <div className="listBox infoList">
                    <List>
                        <InputItem
                            // {...getFieldProps('name')}
                            placeholder="X X X"
                            value={name}
                            onChange={this.changeName}
                        >姓名 *</InputItem>
                        <InputItem
                            // {...getFieldProps('id')}
                            type="number"
                            value={id}
                            onChange={this.changeId}
                            moneyKeyboardAlign="left"
                        >身份证号</InputItem>
                        <Picker data={district} cols={1}
                            // {...getFieldProps('type')} 
                            value={type}
                            onChange={this.changeColor}
                            className="type">
                            <List.Item arrow="horizontal">访客类型</List.Item>
                        </Picker>
                    </List>
                    <div className="buttonBox">
                        <div className="signBox">
                            <Button onClick={this.UpdateVisitorInfo}>提交</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Visitor;