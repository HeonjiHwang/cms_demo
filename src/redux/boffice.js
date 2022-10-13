const initialState = {
    keyInfo : null,
    userInfo : null
}

const KEYINFO = 'BOFFICE/KEYINFO';
const USERINFO = 'BOFFICE/USERINFO';

export const setKeyInfo = keyInfo => ({type:KEYINFO, keyInfo});
export const setUserInfo = userInfo => ({type:USERINFO, userInfo});

const boffice = (state = initialState, action) => {
    switch(action.type){
        case KEYINFO:
            return {
                ...state,
                keyInfo: action.keyInfo
            }
        case USERINFO:
            return {
                ...state,
                userInfo: action.userInfo
            }
        default:
            return state;
    }
}

export default boffice;