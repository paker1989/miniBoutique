// pages/ucenter/index.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
    userInfo: {},
    categories: [
      { iconPath: "/images/nav/to-pay.png", text: "待付款", navigateTo: "" },
      {
        iconPath: "/images/nav/to-deliver.png",
        text: "待发货",
        navigateTo: "",
      },
      {
        iconPath: "/images/nav/to-receipt.png",
        text: "待收货",
        navigateTo: "",
      },
    ],
  },

  goAuth: function (e) {
    wx.navigateTo({
      url: "../auth/auth",
    });
  },

  navigateToCategory: function (e) {
    // console.log(e.currentTarget.dataset);
  },

  onReady: function () {
    wx.setNavigationBarTitle({
      title: "用户中心",
    });
  },

  onShow: function() {
    let userInfo = app.globalData.userInfo;
    if (userInfo) {
      // console.log(userInfo);
      this.setData({ userInfo, hasUserInfo: true });
      // this.setData({ userInfo: userInfo });
    }
  },

  // /**
  //  * 生命周期函数--监听页面加载
  //  */
  // onLoad: function (options) {},

  // /**
  //  * 生命周期函数--监听页面初次渲染完成
  //  */
  // onReady: function () {},

  // /**
  //  * 生命周期函数--监听页面显示
  //  */
  // onShow: function () {},

  // /**
  //  * 生命周期函数--监听页面隐藏
  //  */
  // onHide: function () {},

  // /**
  //  * 生命周期函数--监听页面卸载
  //  */
  // onUnload: function () {},

  // /**
  //  * 页面相关事件处理函数--监听用户下拉动作
  //  */
  // onPullDownRefresh: function () {},

  // /**
  //  * 页面上拉触底事件的处理函数
  //  */
  // onReachBottom: function () {},

  // /**
  //  * 用户点击右上角分享
  //  */
  // onShareAppMessage: function () {},
});
