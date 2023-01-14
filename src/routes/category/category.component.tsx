import React, { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Params, useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';
import { CartItemType } from '../../store/cart/cart.types';

import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from '../../store/categories/category.selector';

import { CategoryContainer, Title } from './category.styles';

type CategoryRoutesParams = {
  category: string;
};

const Category = () => {
  const { category } = useParams<
    keyof CategoryRoutesParams
  >() as CategoryRoutesParams;
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <Title>{category.toUpperCase()}</Title>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product as CartItemType} />
            ))}
        </CategoryContainer>
      )}
    </Fragment>
  );
};

export default Category;
