import { getProductList } from "./module/productList.js";
import { getCartInfo } from "./module/cartToggleButton.js";
import { CART_COOKIE_KEY } from "./constants/cart.js";
import { setPayInfo } from "./module/payModule.js";
import { makeDOMwithProperties } from "./utils/dom.js";

// 부모 > section tag
// 뒤에 있는 요소 > id : cart-pay-container
// 장바구니 내부에 있는 물품을 가져다가 product-list-con 으로 만들기

// 1. 장바구니에 있는 물품 정보 가져오기
// 2. 장바구니에 있는 물풍 정보를 productList 와 연결
// 3. section 아래의 cart-pay-container 앞에 삽입하기
const cartInfo = getCartInfo() || [];

const section = document.getElementsByTagName("section")[0];
const cartPayContainer = document.getElementById("cart-pay-container");
if (cartInfo.length < 1) {
  const noticeDiv = makeDOMwithProperties("div", {
    innerHTML: "장바구니에 상품이 없습니다.",
    className: "product-list-con",
  });
  section.insertBefore(noticeDiv, cartPayContainer);
} else {
  const productListContainer = getProductList(cartInfo, () =>
    location.reload()
  );

  section.insertBefore(productListContainer, cartPayContainer);
  // A.insertBefore(B, C) > B 가 A 아래의 C 앞에 삽입되는 메서드
}

const cartAllDeleteButton = document.getElementById("remove-all-button");
cartAllDeleteButton.onclick = () => {
  // localStroage 에 있는 장바구니 물품 정보가 전부 삭제
  if (!confirm("장바구니에 있는 물품을 모두 삭제하시겠습니까?")) return;
  // localStorage.clear();
  // localStorage 의 모든 키-값 쌍이 삭제
  localStorage.removeItem(CART_COOKIE_KEY);
  location.reload(); // 새로고침
};

setPayInfo();
