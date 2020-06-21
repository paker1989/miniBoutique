// pages/category/category.js
const api = require("../../server/api");
const remote = require("../../server/index");
const config = require("../../data/config");

Page({
    /**
     * 页面的初始数据
     */
    data: {
        onFetching: false,
        currentList: [],
        currentPage: 1,
        categoryId: -1,
        categories: [],
        categorySwiperHeight: '100%'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log("onLoad category");
        // console.log(options);
        const windowHeight = wx.getSystemInfoSync().windowHeight;
        this.setData({ categorySwiperHeight: windowHeight - 100});
        const { id } = options;
        wx.showLoading({
            title: "加载数据",
            mask: true,
        });
        this.setData({ categoryId: id });
        this.fetchCategories();
        this.fetchCatalog(id);

        wx.hideLoading();

        // wx.showNavigationBarLoading();
    },

    fetchCategories: function () {
        const that = this;
        remote.request(api.getIndexCatalog).then((res) => {
            if (res.errno == 0) {
                that.setData({ categories: res.data });
            }
        });
    },

    fetchCatalog: function (id) {
        const {currentPage, currentList} = this.data;
        remote
            .request(api.fetchCatalog, {
                data: {
                    id,
                    page: currentPage,
                    size: config._FETCH_SIZE,
                },
            })
            .then((res) => {
                if (res.errno == 0) {
                    console.log(res.data);
                    let updatedList = currentList.concat(res.data.data);
                    this.setData({currentList: updatedList});
                }
            });
    },

    seeProductDetails: function(e) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        //  console.log('category onshow');
    },

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
