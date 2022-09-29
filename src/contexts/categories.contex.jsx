import { createContext, useEffect, useState } from 'react';
import { getDBDocuments } from '../utils/firebase/firebase.utils';

export const CategoriesContex = createContext({
  categoriesMap: [],
});

export function CategoriesProvider(props) {
  const { children } = props;
  const [categoriesMap, setCategoriesMap] = useState({});
  useEffect(() => {
    async function getCat() {
      const categoryMap = await getDBDocuments();
      setCategoriesMap(categoryMap);
    }
    getCat();
  }, []);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = { categoriesMap };
  return (
    <CategoriesContex.Provider value={value}>
      {children}
    </CategoriesContex.Provider>
  );
}
