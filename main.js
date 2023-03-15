import { fetchSectionListData } from './module/fetch.js';
import { getProductSection } from './module/productSection.js';

const sectionInfoList = await fetchSectionListData();

const body = document.getElementsByTagName('body')[0];

sectionInfoList.map((sectionInfo) => {
  const { sectionTitle, productList } = sectionInfo;
  const productSection = getProductSection(sectionTitle, productList);
  body.appendChild(productSection);
});
