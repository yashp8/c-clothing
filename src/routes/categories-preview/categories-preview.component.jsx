import React, { Fragment, useContext } from 'react';
import { useSelector } from 'react-redux';
import CategoryPreview from '../../components/category-preview/category-preview.components';
import { selectCategoriesMap } from '../../store/categories/category.select';
// import { CategoriesContex } from '../../contexts/categories.contex';

export default function CategoriesPreview() {
  const categoriesMap = useSelector(selectCategoriesMap);

  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </Fragment>
  );
}
