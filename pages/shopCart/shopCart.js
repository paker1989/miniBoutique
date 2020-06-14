// pages/shopCart/shopCart.js
const api = require("../../server/api");
const remote = require("../../server/index");

Page({
    /**
     * 页面的初始数据
     */
    data: {},

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
    onShow: function () {
        const that = this;
        remote.request(api.getCarts).then(function (res) {
            if (res.errno == 0) {
                that.setData({ cartList: res.data.cartList });
                // console.log(res.data);
            } else {
                wx.showToast({
                    title: "有一些问题. 请下拉刷新",
                    icon: "none",
                });
            }
        });
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
