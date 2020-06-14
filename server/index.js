const env = require("./env.config").environment;

const getMockJson = function (url, options) {
    let data;
    const urlSplit = url.split("/");
    const path = urlSplit[urlSplit.length - 1];
    // console.log(path);
    switch (path) {
        case "getIndexCatalog":
            data = require("../data/mock/index-categories.mock.js").cats;
            break;
        case "getIndexFloor":
            data = require("../data/mock/index-floor.mock.js").data.response;
            break;
        case "getGoodsDetail":
            data = require("../data/mock/goods-detail.mock.js").data;
            break;
        case "addToCart":
            const { userId, goodsId, productId, nbAdded } = options.data;
            console.log(options.data);
            wx.getStorage({
                key: "addedCart",
                success: (result) => {
                    const alreadyAdded = result.data || {};
                    const currentNb = alreadyAdded[`${goodsId}-${productId}`];
                    alreadyAdded[`${goodsId}-${productId}`] = currentNb
                        ? currentNb + nbAdded
                        : nbAdded;
                    wx.setStorage({
                        key: "addedCart",
                        data: alreadyAdded,
                        success: () => {
                            return new Promise(function (resolve, reject) {
                                resolve({ errno: 0 });
                            });
                        },
                    });
                },
            });
            break;
        case "getCarts": 
            console.log('get Carts');
            data = require("../data/mock/cart/getCart.mock").data;
            break;
    }

    return new Promise(function (resolve, reject) {
        resolve({ data, errno: 0 });
    });
};

const request = function (url, options = {}) {
    if (env === "test") {
        return getMockJson(url, options);
    }

    const { data = {}, method = "GET" } = options;
    return new Promise(function (resolve, reject) {
        wx.request({
            url,
            data,
            header: { "content-type": "application/json" },
            method,
            // responseType: 'text',
            success: (res) => {
                if (res.statusCode === 200) {
                    resolve(res);
                } else {
                    reject(res);
                }
            },
            fail: (err) => {
                reject(err);
            },
            // complete: ()=>{}
        });
    });
};

module.exports = {
    request,
};
