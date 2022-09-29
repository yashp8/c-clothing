import React, { Fragment, useContext } from 'react';
import CategoryPreview from '../../components/category-preview/category-preview.components';
import { CategoriesContex } from '../../contexts/categories.contex';

export default function CategoriesPreview() {
  const { categoriesMap } = useContext(CategoriesContex);
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
