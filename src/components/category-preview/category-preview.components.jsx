import './category-preview.styles.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../product-card/product-card.component';

export default function CategoryPreview(props) {
  const { title, products } = props;
  return (
    <div className='category-preview-container'>
      <h2>
        <Link className='title' to={title}>
          {title.toUpperCase()}
        </Link>
      </h2>
      <div className='preview'>
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
}
