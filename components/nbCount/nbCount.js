Component({
    properties: {
        currentNb: {
            type: Number,
            value: 0,
        },
        minNb: {
            type: Number,
            value: 0,
        },
        maxNb: {
            type: Number,
            value: -1, // no limit
        },
    },
    data: {
        // currentNb: 0,
        minDisabled: false,
        maxDisabled: false,
    },
    observers: {
        currentNb: function (currentNb) {
            const { minNb, maxNb } = this.data;
            this.setData({
                maxDisabled: maxNb != -1 && currentNb >= maxNb,
                minDisabled: currentNb <= minNb,
            });
        },
    },
    methods: {
        updateVal: function (e) {
            // console.log(e.dataset.ope);
            const { currentNb } = this.data;
            const operator = e.currentTarget.dataset.ope;
            const disabled = e.currentTarget.dataset.disabled;
            if (disabled) {
                return;
            }
            this.triggerEvent("updateNb", {
                currentNb: operator == "minus" ? currentNb - 1 : currentNb + 1,
            });
            // if (operator == "minus") {
            //     if (currentNb > minNb) {
            //         this.triggerEvent("updateNb", { currentNb: currentNb - 1 });
            //     }
            // } else {
            //     // plus
            //     if (maxNb == -1 || currentNb < maxNb) {
            //         this.triggerEvent("updateNb", { currentNb: currentNb + 1 });
            //     }
            // }
        },

        setBoundry: function (input) {
            const { minNb, maxNb } = this.data;
            // return input >= minNb && (maxNb == -1 || input <= maxNb);
            if (input < minNb) {
                return minNb;
            } else if (input > maxNb) {
                return maxNb;
            } else {
                return input;
            }
        },

        editVal: function (e) {
            const { currentNb } = this.data;
            try {
                let rawInput;
                const newVal = e.detail.value;
                if (newVal.trim().length == 0) {
                    rawInput = 0;
                } else {
                    rawInput = parseInt(e.detail.value);
                }
                const isNoInt = isNaN(rawInput);
                if (isNoInt) {
                    return {
                        value: currentNb,
                    };
                } else {
                    rawInput = this.setBoundry(rawInput);
                    this.triggerEvent("updateNb", { currentNb: rawInput });
                    return {
                        value: rawInput,
                    };
                }
            } catch (e) {
                console.log(e);
            }
        },
    },
    created: function () {},
    attached: function () {},
    ready: function () {
        const { currentNb, minNb, maxNb } = this.data;
        this.setData({
            maxDisabled: maxNb != -1 && currentNb >= maxNb,
            minDisabled: currentNb <= minNb,
        });
    },
    moved: function () {},
    detached: function () {},
});
