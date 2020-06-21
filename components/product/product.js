//Component Object
Component({
  externalClasses: ["no-margin", "ext-product-cls"],
  properties: {
    goods: {
      type: Object,
    },
    currency: {
      type: String,
      value: "￥",
    },
    price: {
      type: String | Number,
    },
    image: {
      type: String,
      value: 'placeholder'
    }
  },
  data: {
    // image: this.goods.image,
    truncatedTitle: "", // p-e to remove
    formattedPrice: 0,
  },
  methods: {},
  created: function () {},
  attached: function () {},
  ready: function () {
    // console.log(this.data);
    this.setData({ truncatedTitle: this.data.goods.name });
    this.setData({ formattedPrice: Number(this.data.price).toFixed(2) });
  },
  moved: function () {},
  detached: function () {},
});
