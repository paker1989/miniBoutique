//Component Object
Component({
  externalClasses: ["no-margin"],
  properties: {
    goods: {
      type: Object,
    },
    currency: {
      type: String,
      value: "￥",
    },
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
    // console.log(this.data.goods);
    this.setData({ truncatedTitle: this.data.goods.name });
    this.setData({ formattedPrice: parseInt(this.data.goods.maxprice, 10) });
  },
  moved: function () {},
  detached: function () {},
});
