import { makeDOMwithProperties } from '../utils/dom.js';
import { getCartToggleButton } from './cartToggleButton.js';

export const getProductCard = ({
  id,
  imgSrc,
  name,
  discountPercent,
  price,
  originalPrice,
}, cartRemoveCallback) => {
  const productCard = makeDOMwithProperties('div', { className: 'product-card'});

  // --- product-image-con ---
  const productImageCon = makeDOMwithProperties('div', { className: 'product-image-con'});

  const productImage = makeDOMwithProperties('img', {
    src: imgSrc,
    alt: '상품 이미지',
  });

  // const cartToggleBtn = makeDOMwithProperties('button', {
  //   type : 'button',
  //   className : 'cart-toggle-btn',
  // });
  // const cartImage = makeDOMwithProperties('img', {
  //   src : 'public/assets/cart.png',
  //   className: 'cart-image'
  // });

  // cartToggleBtn.appendChild(cartImage);

  const cartToggleBtn = getCartToggleButton({
    id,
    imgSrc,
    name,
    discountPercent,
    price,
    originalPrice,
  }, cartRemoveCallback);

  productImageCon.appendChild(productImage);
  productImageCon.appendChild(cartToggleBtn);
  // --- product-image-con ---

  // --- product-description ---
  const productDescription = makeDOMwithProperties('div', {
    className : 'product-description',
  });
  const productName = makeDOMwithProperties('div', {
    className : 'product-name',
    innerHTML: name,
  });


  const productPriceContainer = makeDOMwithProperties('div', {
    className : 'product-price-con',
  });
  const productDiscount = makeDOMwithProperties('div', {
    className : 'product-discount-percent',
    innerHTML: `${discountPercent}%`,
  });
  const productPrice = makeDOMwithProperties('div', {
    className : 'product-price',
    innerHTML: `${price.toLocaleString()}원`,
  });

  const productOriginalPrice = makeDOMwithProperties('div', {
    className : 'product-original-price',
    innerHTML: `${originalPrice.toLocaleString()}원`,
  });

  productPriceContainer.appendChild(productDiscount);
  productPriceContainer.appendChild(productPrice);

  productDescription.appendChild(productName);
  productDescription.appendChild(productPriceContainer);
  productDescription.appendChild(productOriginalPrice);
  // --- product-description ---

  productCard.appendChild(productImageCon);
  productCard.appendChild(productDescription);

  return productCard;
};
