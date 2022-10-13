import { createAction } from '../../utils/reducer/reducer.util';
import CATEGORIES_ACTION_TYPE from './category.types';

function setCategories(categoriesArray) {
  return createAction(CATEGORIES_ACTION_TYPE.SET_CATEGORIES, categoriesArray);
}
export default setCategories;
