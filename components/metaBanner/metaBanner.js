Component({
  properties: {
    meta: {
      type: Object,
      value: {},
    },
    specId: {
      type: Number,
      value: -1,
    },
    isSpecChecked: {
      type: Number,
      value: 0,
    },
    // selectedProduct: {
    //   type: Object,
    // }
    // retailPrice: {
    //   type: String,
    //   value: '0'
    // }
  },
  data: {
    // retailPrice: '',
  },
  methods: {},
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
