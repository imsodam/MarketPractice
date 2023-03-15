import { makeDOMwithProperties } from '../utils/dom.js';
import { getProductList } from './productList.js';

export const getProductSection = (sectionName, productInfoList) => {
  const productListSection = makeDOMwithProperties('section', {
    className: 'product-list-section'
  });

  const sectionTitle = makeDOMwithProperties('div', {
    className: 'section-title'
  });
  const titleHighLight = makeDOMwithProperties('span', {
    className: 'section-title-highlight'
  });
  const title = makeDOMwithProperties('span', {
    innerHTML: sectionName
  });

  sectionTitle.appendChild(titleHighLight);
  sectionTitle.appendChild(title);

  const productListContainer = getProductList(productInfoList);

  productListSection.appendChild(sectionTitle);
  productListSection.appendChild(productListContainer);

  return productListSection;
};
