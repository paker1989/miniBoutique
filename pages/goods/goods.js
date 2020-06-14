// pages/goods/goods.js
const api = require("../../server/api");
const remote = require("../../server/index");
const WxParse = require('../../libs/wxParse/wxParse');

Page({
    /**
     * 页面的初始数据
     */
    data: {
        id: 0,
        loading: true,
        galleries: [],
        autoPlay: false,
        selectedSpec: null,
        selectedProduct: null,
        selectedSpecId: -1,
        specificationList: [],
        nbSelected: 1,
        isSpecChecked: 0,
        isSelectSpec: 0, // toggle spec box
        meta: {},
        addToCartLoading: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log(options.id);
        this.setData({ id: options.id });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // console.log(this.data.loading);
        // this.setData({loading: false});
        const that = this;
        remote
            .request(api.getGoodsDetail, {
                data: { id: that.data.id },
            })
            .then(function (res) {
                if (res.errno === 0) {
                    const data = res.data;
                    const valueList = data.specificationList.valueList;
                    if (valueList && valueList.length === 1) {
                        const selectedSpec = valueList[0];
                        const selectedProduct = data.productList.find(
                            (goods) =>
                                goods.goods_specification_ids == selectedSpec.id
                        );
                        that.setData({
                            isSpecChecked: 1,
                            selectedProduct,
                            selectedSpec,
                            specId: selectedSpec.id,
                        });
                    }
                    // parse description richText
                    const goodsDescription  = data.info.goods_desc;
                    WxParse.wxParse('goodsDetail', 'html', goodsDescription, that);
                    that.setData({
                        galleries: data.gallery,
                        autoPlay: true,
                        meta: data.info,
                        productList: data.productList,
                        specificationList: data.specificationList,
                    });
                } else {
                    wx.showToast({
                        title: res.errMsg || "unknow error",
                        icon: "none",
                    });
                }
            });
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},

    showSpec: function () {
        this.setData({ isSelectSpec: 1 });
        this.animate(
            ".spec-toggle-box",
            [
                { opacity: 0, bottom: "-680px" },
                { opacity: 1, bottom: "-20px", ease: "ease" },
            ],
            400
        );
    },

    hideSpec: function () {
        this.setData({ isSelectSpec: 0 });
        this.animate(
            ".spec-toggle-box",
            [
                { opacity: 1, bottom: "-20px" },
                { opacity: 0, bottom: "-680rpx", ease: "ease-out" },
            ],
            400
        );
    },

    toggleSpecSelection: function (e) {
        // console.log(e.currentTarget);
        const specId = e.currentTarget.dataset.id;
        // const selectedSpec = specificationList.valueList.find(spec => spec.id == specId);
        //判断当前是否有spec选中且是当前的
        const { selectedSpecId, isSpecChecked, productList } = this.data;
        if (isSpecChecked == 1 && selectedSpecId == specId) {
            this.setData({
                isSpecChecked: 0,
                selectedSpecId: -1,
                selectedProduct: null,
                selectedSpec: null,
            });
        } else {
            const productToSelect = productList.find(
                (product) => product.goods_specification_ids == specId
            );
            const specToSelect = this.data.specificationList.valueList.find(
                (spec) => spec.id == specId
            );
            if (productToSelect && specToSelect) {
                this.setData({
                    isSpecChecked: 1,
                    selectedSpecId: specId,
                    selectedProduct: productToSelect,
                    selectedSpec: specToSelect,
                });
            }
        }
    },

    updateNb: function (e) {
        // console.log(e);
        this.setData({ nbSelected: e.detail.currentNb });
    },

    addToCart: function (e) {
        const { selectedProduct, nbSelected } = this.data;
        if (selectedProduct == null) {
            wx.showToast({
                title: "请选择规格",
                icon: "none",
                image: "",
                duration: 1500,
                mask: false,
            });
        }
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
});
