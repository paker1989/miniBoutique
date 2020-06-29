// pages/category/category.js
const api = require("../../server/api");
const remote = require("../../server/index");
const config = require("../../data/config");

Page({
    /**
     * 页面的初始数据
     */
    data: {
        onInitFetch: false,
        onFetchMore: false,
        isNoMore: false,
        currentList: [],
        currentPage: 1,
        categoryId: -1,
        categories: [],
        categorySwiperHeight: "100%",
    },

    onShow: function () {
        const that = this;
        const windowHeight = wx.getSystemInfoSync().windowHeight;
        this.setData({ categorySwiperHeight: windowHeight });
        const id = wx.getStorageSync("categoryId");
        wx.setStorageSync("categoryId", -1);
        if (id !== this.data.categoryId) {
            this.setData({
                isNoMore: false,
                currentList: [],
                currentPage: 1,
                categoryId: id,
                categories: [],
                onInitFetch: true,
            });
            this.fetchCategories();
            this.fetchCatalog(id, () => {
                that.setData({ onInitFetch: false });
            });
        }
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

    fetchCatalog: function (id, cb) {
        const { currentPage, currentList } = this.data;
        this.setData({ onFetchMore: true });
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
                    // console.log(res.data);
                    const { count = 0, data = [] } = res.data;
                    let updatedList = currentList.concat(data);
                    this.setData({
                        currentList: updatedList,
                        totalCount: count,
                        isNoMore: updatedList.length >= count,
                        currentPage: currentPage + 1,
                    });
                }
                this.setData({ onFetchMore: false });
                if (typeof cb === "function") {
                    cb();
                }
            });
    },

    fetchMore: function (e) {
        const { isNoMore, categoryId } = this.data;
        if (!isNoMore && categoryId !== -1) {
            this.fetchCatalog(categoryId);
        }
    },

    // seeProductDetails: function (e) {
    //     const { id } = e.currentTarget.dataset;
    //     wx.navigateTo({
    //         url: `/pages/goods/goods?id=${id}`,
    //     });
    // },

    changeCategory: function (e) {
        const { catId } = e.currentTarget.dataset;
        const { categoryId } = this.data;
        const that = this;
        if (categoryId != catId) {
            this.setData({
                isNoMore: false,
                currentList: [],
                currentPage: 1,
                categoryId: catId,
                onInitFetch: true,
            });
            this.fetchCatalog(catId, () => {
                that.setData({ onInitFetch: false });
            });
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},

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
