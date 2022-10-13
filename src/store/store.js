import { compose, applyMiddleware, createStore } from 'redux';
// import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import rootReducer from './roor-reducer';

const middleWares = [logger];

const composedEnhancers = compose(applyMiddleware(...middleWares));

const store = createStore(rootReducer, undefined, composedEnhancers);

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: composedEnhancers,
// });

export default store;
