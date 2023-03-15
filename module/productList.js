import { makeDOMwithProperties } from '../utils/dom.js';
import { getProductCard } from './productCard.js';

export const getProductList = (productInfoList, cartRemoveCallback) => {
  const productListContainer = makeDOMwithProperties('div', {
    className: 'product-list-con'
  });

  productInfoList.forEach((productInfo) => {
    const { id, imgSrc, name, discountPercent, price, originalPrice } = productInfo;
    productListContainer.appendChild(
      getProductCard({
        id,
        imgSrc,
        name,
        discountPercent,
        price,
        originalPrice
      }, cartRemoveCallback)
    );
  });

  return productListContainer;
};
