import React, { Component } from 'react';
import { TextareaItem, List, Button, Modal, WhiteSpace, Accordion } from "antd-mobile"
import { getReason, addReason, getReasonList } from "../../api/visitor"
import "./index.css"

const alert = Modal.alert
const Panel = Accordion.Panel

function formateTime(date) {
    if (!date instanceof Date) return "数据错误"
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日${date.getHours()}时`
}

class Reason extends Component {
    state = {
        reasoninfo: "",
        reasonhistory: []
    }
    constructor(props) {
        super(props)
        getReason().then(result => {
            console.log("当前记录", result)
            if (result.result.reason) {
                this.setState({
                    reasoninfo: result.result.reason.reasoninfo
                })
            }
            // if (result.result)
            //     alert("警告", result.result, [{ text: "确认" }]
            //     )
            // else if (result.reason) {
            //     // this.setState({
            //     //     reasoninfo: result.reason
            //     // })
            // }
        })
        getReasonList().then(result => {
            this.setState({
                reasonhistory: result.result.list
            })
        })
    }
    changeReason = (value) => {
        this.setState({
            reasoninfo: value
        })
    }
    submitReason = () => {
        addReason({ reasoninfo: this.state.reasoninfo }).then(result => {
            if (result.result.result)
                alert("", result.result.result, [{ text: "确认" }])
        })
    }
    render() {
        let { reasoninfo, reasonhistory } = this.state
        return (
            <div className="mainBox">
                <div className="reasonBox">
                    <List className="reasonInfo" renderHeader={() => '您的访问目的'}>
                        <TextareaItem
                            onChange={this.changeReason}
                            value={reasoninfo}
                            rows={5}
                            placeholder={"请填写您的访问目的"}
                            count={200}
                        />
                        <div className="buttonBox" style={{ marginTop: 10 }}>
                            <Button className="" onClick={this.submitReason} >提交</Button>
                        </div>
                        <WhiteSpace size="xl" />
                        {reasonhistory.length > 0 ? (<div className>
                        <div className="titleBox">
                            <div className="titleText">
                                您的访问历史
                            </div>
                        </div>
                        <Accordion>
                            {

                                reasonhistory.map(item => (
                                    <Panel header={item.visitortime ? formateTime(item.visitortime) : "预约访问"}>
                                        <div className="text">
                                            访问理由：{item.reasoninfo}
                                        </div>
                                    </Panel>
                                ))
                            }
                        </Accordion></div>) : (<div className="nothing">无历史记录</div>)
                        }

                    </List>
                </div>
            </div>
        );
    }
}

export default Reason;