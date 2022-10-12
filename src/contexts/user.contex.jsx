import { createContext, useEffect, useReducer } from 'react';
import { onAuthStateChangedListner } from '../utils/firebase/firebase.utils';
import createAction from '../utils/reducer/reducer.util';

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
};

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      return {};
  }
};

const INITIAL_STATE = {
  currentUser: null,
};

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const { currentUser } = state;

  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  };

  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const authData = async () => {
      const unsuscribe = onAuthStateChangedListner((user) => {
        setCurrentUser(user);
      });
      return unsuscribe;
    };
    authData().catch();
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
