// import { combineReducers } from 'redux'
// // import channel from './channel'
// // export default combineReducers({ channel })

// const rootReducers = combineReducers({
// })

// export default rootReducers
const initState = {
    txt: "",
    ratio: ""
}
export const reducer = (state = initState, action: any) => {
    const { type, data, ratio } = action
    switch (type) {
        case 'add':
            return Object.assign({}, state, {
                txt: data,
                ratio: ratio
            })
        default:
            return state
    }


}