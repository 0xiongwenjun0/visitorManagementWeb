import httpPost from "../../utils/axios.js"

async function visitorSignOn({ phone, password }) {
    let result = await httpPost("/visitor/signOnVisitor", { phone, password })
    return result.data
}

async function visitorSignIn({ phone, password, name, id, type }) {
    let result = await httpPost("/visitor/signInVisitor", { phone, password, name, visitor_id: id, type })
    return result.data
}

async function getVisitorInfo() {
    let result = await httpPost("/visitor/getVisitorInfo")
    return result.data
}

async function updateVisitorInfo({ avator, name, id, type }) {
    let result = await httpPost("/visitor/updateVisitorInfo", { avator, name, id, type })
    return result.data
}

async function getReason() {
    let result = await httpPost("/reason/getVisitorReason")
    return result.data
}

async function addReason({ reasoninfo }) {
    let result = await httpPost("/reason/addReason", { reasoninfo })
    return result.data
}

async function getReasonList() {
    let result = await httpPost("/reason/getVisitorReasonList")
    return result.data
}

async function getVisitorBlackList() {
    let result = await httpPost("/blacklist/getBlackListhistory")
    return result.data
}



export {
    visitorSignOn,
    visitorSignIn,
    getReason,
    addReason,
    getReasonList,
    getVisitorInfo,
    updateVisitorInfo,
    getVisitorBlackList
}