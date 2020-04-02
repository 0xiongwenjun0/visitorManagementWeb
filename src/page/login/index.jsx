import React, { Component } from 'react';
import logo from "../../assets/image/logo.png"
import { InputItem, List, Button, Modal } from "antd-mobile"
import { createForm } from 'rc-form';
import { visitorSignOn } from "../../api/visitor/index"
import "./index.css"

const alert = Modal.alert;

class Home extends Component {
    submit = () => {
        this.props.form.validateFields(async (error, value) => {
            // console.log(error, value);
            //提交接口
            let { phone, password } = value;
            if (phone && password) {
                let result = await visitorSignOn({
                    phone: value.phone,
                    password: value.password
                })
                if (result.message == "success") {
                    if (result.result.result)
                        alert('警告', result.result.result, [{ text: '确认' },
                        ])
                    else if (result.result.uuid) {
                        alert("", "欢迎来到本程序", [{ text: '确认' },
                        ])
                        this.props.history.push("/home")
                    }
                }
                else {
                    alert('警告', "后台错误", [{ text: '确认' },
                    ])
                }
            } else {
                alert("警告", phone ? "密码不能为空" : "手机号不能为空", [{ text: "确认" }]
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
                                校园访客系统
                            </div>
                        </div>
                    </div>
                    <div className="formBox">
                        <List renderHeader={() => '账号登录'}>
                            <InputItem
                                {...getFieldProps('phone')}
                                type="phone"
                                placeholder="1xx xxxx xxx"
                            >手机号</InputItem>
                            <InputItem
                                {...getFieldProps('password')}
                                type="password"
                                placeholder="****"
                            >密码</InputItem>
                            <div className="anyBox">
                                <div className="line">
                                    <div className="forgetPassword" >
                                        <a href="" className="forget" onClick={(event) => {
                                            event.preventDefault();
                                            this.props.history.push("/ForgetPassword")
                                        }} >忘记密码？</a>
                                    </div>
                                </div>
                            </div>
                        </List>
                        <div className="buttonBox">
                            <div className="loginBox">
                                <Button onClick={this.submit}>登录</Button>
                            </div>
                            <div className="signBox">
                                <Button onClick={this.ToSignPage}>注册</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default createForm()(Home);