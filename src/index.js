import ReactDOM from 'react-dom/client';

//redux
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import store from './redux/index';

import './assets/css/_destyle.css';
import App from './App';
import axios from 'axios';

//axios 전역 설정
axios.defaults.withCredentials = true;

//배포 레벨에서는 로거 사용 안함
const enhancer = process.env.NODE_ENV === 'production' ? compose(applyMiddleware()) : composeWithDevTools(applyMiddleware(logger));

const _store = createStore(store, enhancer);
const _persistor = persistStore(_store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={_store}>
    <PersistGate loading={null} persistor={_persistor}>
        <App />
      </PersistGate>
  </Provider>
);