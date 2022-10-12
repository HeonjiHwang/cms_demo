import { combineReducers } from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import boffice from './boffice';

const persistConfig = {
    key:'info',
    storage,
    whitelist:['boffice']
}

const store = combineReducers({
    boffice
})

export default persistReducer(persistConfig, store);