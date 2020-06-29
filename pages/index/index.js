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

    // seeProductDetails: function (e) {
    //     const { id } = e.currentTarget.dataset;
    //     wx.navigateTo({
    //         url: `/pages/goods/goods?id=${id}`,
    //     });
    // },

    getIndexFloor: function () {
        remote.request(api.getIndexFloor).then((res) => {
            console.log(res);
            if (res.errno == 0) {
                this.setData({ floors: res.data });
            }
        });
    },

    seeMore: function (e) {
        const categoryIndex = e.currentTarget.dataset.index;
        const { floors } = this.data;
        // debugger;
        wx.setStorage({
            key: "categoryId",
            data: floors[categoryIndex].id,
            success: () => {
                wx.switchTab({
                    url: `/pages/category/category`,
                });
            },
        });
    },

    goSearch: function (e) {
        wx.navigateTo({
            url: "/pages/search/search",
        });
    },
});
