import axios from "axios"
import { URL } from "../config/default.js"

async function httpPost(url, params) {
    return await axios({
        method: "post",
        url: URL + url,
        data: params,
        withCredentials: true,
        timeout:5000,
    })
}

export default httpPost