import { createContext, useEffect, useState } from 'react';
import { onAuthStateChangedListner } from '../utils/firebase/firebase.utils';

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  // eslint-disable-next-line react/jsx-no-constructed-context-values
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
