import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { configureStore, getDefaultMiddleware, applyMiddleware } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer from './slices/user'
import tracingReducer from './slices/tracing'

const rootReducer = combineReducers({
    user: userReducer,
    tracing: tracingReducer
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'tracing']
};

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false
  }),
  
}, applyMiddleware(ReduxThunk));
const persistor = persistStore(store);
const useSelector = useReduxSelector;
const useDispatch = () => useReduxDispatch();
export { store, persistor, useSelector, useDispatch }