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
        searchResult: [],
        histories: [],
        showResult: false
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {},

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
