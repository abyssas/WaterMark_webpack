// import { combineReducers } from 'redux'
// // import channel from './channel'
// // export default combineReducers({ channel })

// const rootReducers = combineReducers({
// })

// export default rootReducers
const initState = {
    txt: "",
    ratiox: "",
    ratioy: "",
    size: ""
}
export const reducer = (state = initState, action: any) => {
    const { type, data, ratiox, ratioy, size } = action
    switch (type) {
        case 'add':
            return Object.assign({}, state, {
                txt: data,
                ratiox: ratiox,
                ratioy: ratioy,
                size: size
            })
        default:
            return state
    }


}