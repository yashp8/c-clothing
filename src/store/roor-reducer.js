import { combineReducers } from 'redux';
import { categoriesReducer } from './categories/category.reducer';
import userReducer from './user/user.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
});

export default rootReducer;
