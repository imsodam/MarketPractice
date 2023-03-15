import { getProductList } from "./module/productList.js";
// 물품 목록을 모두 불러와서 페이지에 띄우기 -> productList.js 에서 getProductList 함수를 실행
import { setFilter } from "./module/productFilter.js";
import { fetchSectionListData } from "./module/fetch.js";

const sectionInfoList = await fetchSectionListData();

const productList = sectionInfoList.reduce((prev, curr) => {
  return [...prev, ...curr?.productList];
}, []);
// const newArray = [...prev, ...curr.productList];
// return newArray; return 문 생략가능
// newArray 는 prev + curr.productList 를 합한 배열이다.
const section = document.getElementsByTagName("section")[0];
const productListDOM = getProductList(productList);
section.appendChild(productListDOM);

setFilter(productList);
