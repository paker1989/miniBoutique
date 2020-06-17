// pages/shopCart/shopCart.js
const api = require("../../server/api");
const remote = require("../../server/index");

Page({
    /**
     * 页面的初始数据
     */
    data: {
        isCheckAll: false,
        noShopCart: false,
        // sumPrice:
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
    onShow: function () {
        const that = this;
        remote.request(api.getCarts).then(function (res) {
            if (res.errno == 0) {
                const { cartList, cartTotal } = res.data;
                const hasUnChecked = cartList.some((item) => item.checked != 1);
                that.setData({
                    cartList,
                    isCheckAll: !hasUnChecked && cartList.length > 0,
                    cartTotal,
                    noShopCart: cartList.length == 0
                });
                // console.log(res.data);
            } else {
                wx.showToast({
                    title: "有一些问题. 请下拉刷新",
                    icon: "none",
                });
            }
        });
    },

    touchStart: function (e) {
        console.log('touch Start');
        const cartList = this.data.cartList;
        cartList.forEach((c) => {
            if (c.isTouchMove) {
                c.isTouchMove = false;
            }
        });
        this.setData({
            startX: e.changedTouches[0].clientX,
            startY: e.changedTouches[0].clientY,
            cartList,
        });
    },

    handleTouch: function (e) {
        const moveX = e.changedTouches[0].clientX;
        const moveY = e.changedTouches[0].clientX;
        const { startX, startY } = this.data;
        const angle = this.angle(startX, startY, moveX, moveY);
        if (Math.abs(angle) > 30) {
            return;
        }
        const gindex = e.currentTarget.dataset.gindex;
        const cartList = this.data.cartList;
        cartList[gindex].isTouchMove = true;
        this.setData({ cartList });
    },

    angle: function (startX, startY, moveX, moveY) {
        const deltaY = moveY - startY;
        const deltaX = moveX - startX;
        // Math.atan 返回反正切值(radian: 弧度)，乘以(180/Math.PI)得到角度。
        return Math.atan(deltaY / deltaX) * (180 / Math.PI);
    },

    deleteCart: function(e) {
        console.log(e.currentTarget.dataset.gindex);
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
