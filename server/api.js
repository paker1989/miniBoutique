const env = require("./env.config").environment;

const rootUrl = env === "test" ? "" : "https://www.hiolabs.com/api";
module.exports = {
  getIndexCatalog: `${rootUrl}/getIndexCatalog`,
  getIndexFloor: `${rootUrl}/getIndexFloor`,
  getGoodsDetail: `${rootUrl}/getGoodsDetail`,
  // test: `${rootUrl}/catalog/index`
};
// module.exports = {
//   getIndexCatalog: '/getIndexCatalog'
// }
