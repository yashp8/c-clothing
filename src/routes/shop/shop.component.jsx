import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getDBDocuments } from '../../utils/firebase/firebase.utils';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.components';
// eslint-disable-next-line import/named
import setCategories from '../../store/categories/category.action';
import './shop.styles.scss';

export default function Shop() {
  const dispath = useDispatch();

  useEffect(() => {
    async function getCat() {
      const categoriesArray = await getDBDocuments();
      dispath(setCategories(categoriesArray));
    }
    getCat();
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  );
}
