import httpPost from "../../utils/axios.js"

async function adminSignOn({ username, password }) {
    let result=  await httpPost("/admin/signOnAdmin", { username, password })
    return result.data
}


export {
    adminSignOn
}