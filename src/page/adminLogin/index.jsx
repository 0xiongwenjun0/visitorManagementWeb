import React, { Component } from 'react';
import logo from "../../assets/image/logo.png"
import { InputItem, List, Button, Modal } from "antd-mobile"
import { createForm } from 'rc-form';
import { adminSignOn } from "../../api/admin/index"
import "./index.css"

const alert = Modal.alert;
class AdminLogin extends Component {
    submit = () => {
        this.props.form.validateFields(async (error, value) => {
            // console.log(error, value);
            //提交接口
            let { username, password } = value;
            if (username && password) {
                let result = await adminSignOn({
                    username,
                    password
                })
                if (result.message == "success") {
                    alert('警告', result.result.result, [
                        {
                            text: '确认',
                        },
                    ])
                    if (result.result.uuid) {
                        this.history.push("/admin/home")
                    }
                }
                else {
                    alert('警告', "后台错误", [
                        {
                            text: '确认',
                        },
                    ])
                }
            } else {
                alert("警告", username ? "密码不能为空" : "手机号不能为空", [{ text: "确认" }]
                )
            }
        });
    }
    ToSignPage = () => {
        this.props.history.push("/sign")
    }
    render() {
        const { getFieldProps } = this.props.form;
        return (
            <div>
                <div className="mainBox">
                    <div className="titleBox">
                        <div className="title">
                            <img src={logo} alt="" className="app-logo" />
                        </div>
                        <div className="text">
                            <div className="info">
                                校园访客管理系统
                            </div>
                        </div>
                    </div>
                    <div className="formBox">
                        <List renderHeader={() => '账号登录'}>
                            <InputItem
                                {...getFieldProps('username')}
                                type="text"
                            >账号</InputItem>
                            <InputItem
                                {...getFieldProps('password')}
                                type="password"
                            >密码</InputItem>
                            <div className="anyBox">
                                <div className="line">
                                    <div className="forgetPassword" >
                                    </div>
                                </div>
                            </div>
                        </List>
                        <div className="buttonBox">
                            <div className="loginBox">
                                <Button onClick={this.submit}>登录</Button>
                            </div>
                        </div>
                    </div>
                    <div className="backIcon" onClick={() => {
                        this.history.pop()
                    }}>
                        <div className="backImage"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default createForm()(AdminLogin);