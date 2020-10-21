import React from 'react';
import { createStore , applyMiddleware  } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"
import reducer from "./reducer";

const persistConfig ={
    key: 'user',
    storage: storage,
    whitelist: ['user']
}
const pReducer = persistReducer(persistConfig, reducer);

const middleware = applyMiddleware(thunk, logger);
const store = createStore(pReducer, middleware); 

const persistor = persistStore(store)

export  { persistor , store };
