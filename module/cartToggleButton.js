import { makeDOMwithProperties } from "../utils/dom.js";
import { CART_COOKIE_KEY } from "../constants/cart.js";

export const getCartInfo = () =>
  JSON.parse(localStorage.getItem(CART_COOKIE_KEY)) || [];

const isInCart = (productInfo) => {
  // 현재 해당 상품이 장바구니안에 있는지를 판단하여 결과를 반환
  const originalCartInfo =
    JSON.parse(localStorage.getItem(CART_COOKIE_KEY)) || [];
  return !!originalCartInfo.find((cartInfo) => cartInfo.id === productInfo.id);
};

const addCartInfo = (productInfo) => {
  // 장바구니에 해당 물품의 정보를 저장
  const originalCartInfo =
    JSON.parse(localStorage.getItem(CART_COOKIE_KEY)) || [];
  if (
    originalCartInfo.findIndex((cartInfo) => cartInfo.id === productInfo.id) !==
    -1
  )
    return;
  localStorage.setItem(
    CART_COOKIE_KEY,
    JSON.stringify([...originalCartInfo, productInfo])
  );
};

const removeCartInfo = ({ id }) => {
  // 장바구니에서 해당 물품의 정보를 삭제
  const originalCartInfo =
    JSON.parse(localStorage.getItem(CART_COOKIE_KEY)) || [];
  const newOriginalCartInfo = originalCartInfo.filter((info) => info.id !== id);
  localStorage.setItem(CART_COOKIE_KEY, JSON.stringify(newOriginalCartInfo));
};

export const getCartToggleButton = (productInfo, cartRemoveCallback) => {
  let inCart = isInCart(productInfo); // product is in cart

  const toggleCart = (productInfo) => {
    if (inCart) {
      // 이미 장바구니에 들어가 있으면 > 장바구니에서 삭제
      if (!confirm(`[${productInfo.name}]을 장바구니에서 삭제할까요?`)) return; // early return
      removeCartInfo(productInfo);
      cartRemoveCallback?.();

      cartImage.src = "public/assets/cart.png";
    } else {
      // 장바구니에 없으면 > 장바구니에 넣기
      addCartInfo(productInfo);
      if (confirm("장바구니에 담았습니다. 장바구니로 이동할까요?")) {
        location.href = "/cart.html";
      }

      cartImage.src = "public/assets/cartDisabled.png";
    }

    inCart = !inCart;
  };
  const cartToggleBtn = makeDOMwithProperties("button", {
    type: "button",
    className: "cart-toggle-btn",
    onclick: () => {
      toggleCart(productInfo);
    },
  });

  const cartImage = makeDOMwithProperties("img", {
    src: inCart ? "public/assets/cartDisabled.png" : "public/assets/cart.png",
    className: "cart-image",
  });

  cartToggleBtn.appendChild(cartImage);
  return cartToggleBtn;
};
