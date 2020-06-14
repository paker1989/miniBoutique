Component({
    properties: {
        meta: {
            type: Object,
            value: {},
        },
        isSpecChecked: {
            type: Number,
            value: 0,
        },
        selectedProduct: {
            type: Object,
        },
    },
    data: {
    },
    methods: {},
    observers: {
        isSpecChecked: function (isSpecChecked) {
            if (isSpecChecked == 1 && this.data.selectedProduct) {
                this.setData({
                    selectedPrice: this.data.selectedProduct.retail_price,
                });
            }
        },
    },
    created: function () {},
    attached: function () {
        console.log("meta banner attached");
    },
    ready: function () {
        console.log("ready");
        const meta = this.data.meta;
        this.setData({ retailPrice: meta.retail_price });
    },
    moved: function () {},
    detached: function () {},
});
