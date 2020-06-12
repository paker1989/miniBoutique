//index.js
//获取应用实例
const api = require("../../server/api");
const remote = require("../../server/index");

Page({
  data: {
    totalNbCnt: 0,
    loading: true,
    categories: [],
    floors: [],
  },
  onLoad: function (options) {
    this.getIndexCatalog();
    this.getIndexFloor();
  },
  getIndexCatalog: function () {
    remote.request(api.getIndexCatalog).then((res) => {
      if (res.errno == 0) {
        this.setData({ categories: res.data });
      }
    });
  },
  seeProductDetails: function (e) {
    console.log(e.currentTarget.dataset);
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/goods/goods?id=${id}`
    });
  },
  getIndexFloor: function () {
    remote.request(api.getIndexFloor).then((res) => {
      console.log(res);
      if (res.errno == 0) {
        this.setData({ floors: res.data });
      }
    });
  },
});
