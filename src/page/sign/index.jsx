import React, { Component } from 'react';
import { InputItem, List, Button, Modal, Picker } from "antd-mobile"
import { createForm } from 'rc-form';
import { visitorSignIn } from "../../api/visitor/index"
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


class Sign extends Component {
    Comeback = () => {
        this.props.history.goBack()
    }
    SignVisitor = () => {
        this.props.form.validateFields(async (error, value) => {
            let { phone, password, againpassword, name, id, type } = value
            phone = +phone.toString().split(" ").join("")
            id = id && +id.toString().split(" ").join("")
            if (password !== againpassword) {
                alert("警告", "两次密码不一致", [{ text: "确认" }])
                return;
            }
            if (!phone || !password || !againpassword || !name || !type) {
                alert("警告", "请填写完全信息", [{ text: "确认" }])
                return;
            }
            let result = await visitorSignIn({ phone, password, name, id, type: type[0] })
            console.log(result)
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
        })
    }

    render() {
        const { getFieldProps } = this.props.form;
        return (
            <div className="mainBox">
                <div className="titleBox">
                    <div className="signtitle">
                        欢迎注册访客系统
                    </div>
                </div>
                <div className="listBox signList">
                    <List renderHeader={() => '账号注册'}>
                        <InputItem
                            {...getFieldProps('name')}
                            placeholder="X X X"
                        >姓名 *</InputItem>
                        <InputItem
                            {...getFieldProps('phone')}
                            type="phone"
                            placeholder="1xx 1234 1234"
                        >手机号 *</InputItem>
                        <InputItem
                            {...getFieldProps('id')}
                            type="number"
                            clear
                            moneyKeyboardAlign="left"
                        >身份证号</InputItem>
                        <InputItem
                            {...getFieldProps('password')}
                            type="password"
                            placeholder="****"
                        >密码 *</InputItem>
                        <InputItem
                            {...getFieldProps('againpassword')}
                            type="password"
                            placeholder="****"
                        >确认密码 *</InputItem>
                        <Picker data={district} cols={1} {...getFieldProps('type')} className="type">
                            <List.Item arrow="horizontal">访客类型</List.Item>
                        </Picker>
                    </List>
                    <div className="buttonBox">
                        <div className="signBox">
                            <Button onClick={this.SignVisitor}>注册</Button>
                        </div>
                    </div>
                </div>
                <div className="backIcon" onClick={this.Comeback}>
                    <div className="backImage"></div>
                </div>
            </div>
        );
    }
}

export default createForm()(Sign);