const env = require("./env.config").environment;

const rootUrl = env === "test" ? "" : "https://www.hiolabs.com/api";
module.exports = {
  getIndexCatalog: `${rootUrl}/getIndexCatalog`,
  getIndexFloor: `${rootUrl}/getIndexFloor`,
  getGoodsDetail: `${rootUrl}/getGoodsDetail`,
  addToCart: `${rootUrl}/addToCart`,
  getCarts: `${rootUrl}/getCarts`,
  deleteCart: `${rootUrl}/deleteCart`,
  fetchCatalog: `${rootUrl}/catalog/fetchData`
  // getGoodsDetail: 'https://www.hiolabs.com/api/getGoodsDetail'
};
// module.exports = {
//   getIndexCatalog: '/getIndexCatalog'
// }
