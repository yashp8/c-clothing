import { createAction } from '../../utils/reducer/reducer.util';
import USER_ACTION_TYPES from './user.types';

function setCurrentUser(user) {
  return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
}

export default setCurrentUser;
