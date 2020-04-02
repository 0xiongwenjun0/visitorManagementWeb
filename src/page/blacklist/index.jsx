import React, { Component } from 'react';
import { List, Button, Modal, Picker, Accordion } from "antd-mobile"
import { getVisitorBlackList } from "../../api/visitor/index"
import "./index.css"

function formateTime(date) {
    if (!date instanceof Date) return "数据错误"
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日${date.getHours()}时`
}

const Panel = Accordion.Panel
const alert = Modal.alert

class BlackList extends Component {
    state = {
        historyList: []
    }
    constructor(props) {
        super(props);
        getVisitorBlackList().then(result => {
            if (result.result.result) {
                alert("警告", result.result.result, [{ text: "确认" }])
            } else if (result.result.list) {
                this.setState({
                    historyList: result.result.list
                })
            }
        })
    }
    render() {
        let { historyList } = this.state
        return (
            <div className="mainBox">
                {
                    historyList.length > 0 ? (<div className="listBox"><Accordion>
                        {

                            historyList.map(item => (
                                <Panel header={item.visitortime ? formateTime(item.createtime) : "预约访问"}>
                                    <div className="text">
                                        封禁理由：{item.reason}
                                    </div>
                                </Panel>
                            ))
                        }
                    </Accordion></div>) : (
                            <div className="showPoint"><div className="text">您没有黑名单历史</div></div>
                        )
                }
            </div>
        );
    }
}

export default BlackList;