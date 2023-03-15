import { makeDOMwithProperties } from "../utils/dom.js";
import { getProductList } from "./productList.js";

const minPriceFilter = document.getElementById("price-min-filter");
const maxPriceFilter = document.getElementById("price-max-filter");
const discountFilter = document.getElementById("discount-filter");
const filterButton =
  document.getElementsByClassName("product-filter-con")[0]?.lastElementChild;

// 필터 버튼 클릭 > min, max, discount 값을 받아옴 > 값을 이용하여 해당하는 물품 추출> 다시 화면에 나타냄
const MAX_PRICE = 10e10;

const formatToPrice = (event) => { // 입력창에서 벗어날 때
  const value = event.target.value;
  const result = Number(value);
  if (isNaN(result)) {
    alert("숫자를 입력해주세요.");
    return;
  }

  event.target.value = `${result.toLocaleString()}원`;
};

const convertPriceToNumber = (originalValue) => {
  const result = Number(
    String(originalValue).replace("원", "").replace(",", "")
  );
  return isNaN(result) ? 0 : result;
};
const convertPercentToNumber = (originalValue) => {
  const result = Number(String(originalValue).replace("%", ""));
  return isNaN(result) ? 0 : result;
};

const setFilterEvent = () => {
  // 필터 입력창 > 사용자가 클릭 > 숫자
  // 필터 입력창 이외의 부분 > 사용자가 클릭 > 입력창에서 벗어남 > '원', '%'가 붙은 format된 형태
  minPriceFilter.onfocus = (event) => {
    // 입력창을 클릭했을 때
    event.target.value = convertPriceToNumber(event.target.value);
  };
  minPriceFilter.onblur = formatToPrice; 
  maxPriceFilter.onfocus = (event) => {
    event.target.value = convertPriceToNumber(event.target.value);
  };
  maxPriceFilter.onblur = formatToPrice;
  discountFilter.onblur = (event) => {
    const value = event.target.value;
    const result = Number(value);
    if (isNaN(result)) {
      alert("숫자를 입력해주세요.");
      event.target.value = 0;
      return;
    }
    if (result > 100 || result < 0) {
      alert("0 이상 100 이하의 숫자를 입력해주세요.");
      event.target.value = 0;
      return;
    }
    event.target.value = `${event.target.value}%`;
  };
  discountFilter.onfocus = (event) => {
    event.target.value = convertPercentToNumber(event.target.value);
  };
};

const setButtonEvent = (productList) => {
  filterButton.onclick = () => {
    const maxPrice = convertPriceToNumber(maxPriceFilter.value) || MAX_PRICE; // ??와 || 의 차이점
    const minPrice = convertPriceToNumber(minPriceFilter.value);
    const discountRate = convertPercentToNumber(discountFilter.value);

    const newProductList = productList.filter((productInfo) => {
      const { price, discountPercent } = productInfo;
      return (
        price >= minPrice &&
        price <= maxPrice &&
        discountRate <= discountPercent
      );
    });
    const section = document.getElementsByTagName("section")[0];
    const originalProductListDOM =
      document.getElementsByClassName("product-list-con")[0];
    section.removeChild(originalProductListDOM);

    if (newProductList.length > 0) {
      // 화면에 표시될 물품이 있음
      const productListDOM = getProductList(newProductList);
      section.appendChild(productListDOM);
    } else {
      const emptyProductListDOM = makeDOMwithProperties("div", {
        className: "product-list-con empty",
        innerHTML: "조건에 해당하는 상품이 없습니다.",
      });
      section.appendChild(emptyProductListDOM);
    }
  };
};

export const setFilter = (productList) => {
  setFilterEvent();
  setButtonEvent(productList);
};
