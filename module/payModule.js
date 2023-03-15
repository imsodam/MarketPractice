import { getCartInfo } from "./cartToggleButton.js";

const DELIVERY_FREE_PRICE = 20000;
const DELIVERY_PRICE = 3000;

const originalPriceDOM = document.getElementById("original-price");
const discountPriceDOM = document.getElementById("discount-price");
const deliveryPriceDOM = document.getElementById("delivery-price");
const totalPriceDOM = document.getElementById("total-price");

// 1. 장바구니에서 물품 정보 얻어오기
// 2. 물품 정보들을 순회하면서 총 가격, 할인된 가격, 배송비, 결제 금액을 계산
// 3. 2번에서 계산된 금액들을 DOM.innerHTML 로 할당하기

export const setPayInfo = () => {
  const cartInfo = getCartInfo();

  // forEach로 먼저 구현해보기

  const { originalPrice, discountPrice } = cartInfo.reduce(
    (prevValue, currValue) => ({
      originalPrice: prevValue.originalPrice + currValue.originalPrice,
      discountPrice:
        prevValue.discountPrice + currValue.originalPrice - currValue.price,
    }),
    {
      originalPrice: 0,
      discountPrice: 0,
    }
  );

  originalPriceDOM.innerHTML = `${originalPrice.toLocaleString()}원`;
  discountPriceDOM.innerHTML = discountPrice
    ? `-${discountPrice.toLocaleString()}원`
    : "0원";

  const payPrice = originalPrice - discountPrice;
  const deliveryPrice = payPrice >= DELIVERY_FREE_PRICE ? 0 : DELIVERY_PRICE;
  deliveryPriceDOM.innerHTML = deliveryPrice
    ? `+${deliveryPrice.toLocaleString()}원`
    : "0원";
    // 할인된 가격 : 원래가격(originalPrice) - 판매가격(price)
  const totalPrice = payPrice + deliveryPrice;
  totalPriceDOM.innerHTML = `${totalPrice.toLocaleString()}원`;
};
