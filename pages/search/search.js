// pages/search/search.js
const api = require("../../server/api");
const remote = require("../../server/index");

Page({
    /**
     * 页面的初始数据
     */
    data: {
        currentPage: 1,
        searchStr: "",
        sort: 0, // todo
        goodsList: [],
        histories: [],
        showResult: false,
    },

    editSearch: function (e) {
        this.setData({ searchStr: e.detail.value });
    },

    cleanSearch: function (e) {
        if (this.data.searchStr.trim().length > 0) {
            this.setData({ searchStr: "" });
        }
    },

    cancelSearch: function (e) {
        wx.switchTab({
            url: "/pages/index/index",
        });
    },

    cleanHistories: function (e) {
        const that = this;
        remote
            .request(api.deleteSearchHistory, { method: "POST" })
            .then((res) => {
                if (res.errno === 0) {
                    console.log(res);
                    that.setData({
                        histories: res.data.histories,
                    });
                }
            });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const that = this;
        console.log("on load search");
        remote
            .request(api.loadSearchHistory, { method: "POST" })
            .then((res) => {
                if (res.errno === 0) {
                    console.log(res);
                    that.setData({
                        histories: res.data.histories,
                    });
                }
            });
    },

    /**
     * 当focus搜索栏时，重置搜索
     * @param {*} e
     */
    resetSearch: function (e) {
        const { showResult } = this.data;
        if (showResult) {
            this.setData({ showResult: false, goodsList: [] });
        }
    },

    onSearchConfirm: function(e) {
      const that = this;
      const { searchStr } = this.data;
      remote
      .request(api.search, { method: "POST", data: {
        keyword: searchStr, sort: [],  
      }})
      .then((res) => {
          if (res.errno === 0) {
              console.log(res);
              that.setData({
                  goodsList: res.data.goods,
                  showResult: true
              });
          }
      });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
});
