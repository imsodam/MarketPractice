export const fetchSectionListData = async () => {
  try {
    const data = await (await fetch('public/mock/sectionListData.json')).json();
    return data?.sectionInfoList || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
