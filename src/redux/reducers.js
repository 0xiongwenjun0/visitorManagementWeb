import { combineReducers } from "redux"
import {
    LOGIN_IN, LOGIN_OUT, PUSH_TICKET, //PUSHDATE, SHOW,HIDDEN
} from "./typeofaction";

function Sign(signstate = { sign: false, username: "" }, action) {
    switch (action.type) {
        case LOGIN_IN: return { sign: true };
        case LOGIN_OUT: return { sign: false };
        default: return signstate;
    }
}

function Ticket(info = [], action) {
    switch (action.type) {
        case PUSH_TICKET: return action.ticket
        default: return info
    }
}

// function Date(date = new Date(), action) {
//     switch (action.type) {
//         case PUSHDATE: return action.date
//         default: return date
//     }
// }
// function Calendar(show = false, action) {
//     switch (action.type) {
//         case SHOW: return true
//         case HIDDEN: return false
//         default: return false
//     }
// }

export default combineReducers({ Sign, Ticket })