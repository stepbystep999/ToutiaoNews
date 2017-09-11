import $ from 'jquery'
import Vue from 'vue'

let interval

export default {
    data() {
        return {
            slidecards: [],
            root_url: 'https://www.toutiao.com',
            bannerPos: 0,
            banner: [
                {
                    title: '要闻',
                    itemClass: {
                        'slide-tab-item': true,
                        'slide-tab-item-active': false,
                    },
                },
                {
                    title: '社会',
                    itemClass: {
                        'slide-tab-item': true,
                        'slide-tab-item-active': false,
                    },
                },
                {
                    title: '娱乐',
                    itemClass: {
                        'slide-tab-item': true,
                        'slide-tab-item-active': false,
                    },
                },
                {
                    title: '体育',
                    itemClass: {
                        'slide-tab-item': true,
                        'slide-tab-item-active': false,
                    },
                },
                {
                    title: '军事',
                    itemClass: {
                        'slide-tab-item': true,
                        'slide-tab-item-active': false,
                    },
                },
                {
                    title: '明星',
                    itemClass: {
                        'slide-tab-item': true,
                        'slide-tab-item-active': false,
                    },
                },
            ],
        }
    },

    methods: {
        focusOn(index) {
            this.bannerPos = index
            if (interval) {
                clearInterval(interval)
            }
            this.bannerChange()
        },

        focusOut() {
            this.bannerCircle()
        },

        bannerChange() {
            for (let i = 0; i < this.banner.length; i++) {
                this.$set(this.banner[i].itemClass, 'slide-tab-item-active', false)
                this.$set(this.slidecards[i].listClass, 'slide-item-active', false)
            }
            this.$set(this.banner[this.bannerPos].itemClass, 'slide-tab-item-active', true)
            this.$set(this.slidecards[this.bannerPos].listClass, 'slide-item-active', true)
        },

        bannerCircle() {
            let vm = this
            clearInterval(interval)
            interval = setInterval(function () {
                vm.bannerPos++
                if (vm.bannerPos === vm.banner.length) {
                    vm.bannerPos = 0
                }
                vm.bannerChange()
            }, 2000)
        },

        getBannerList() {
            this.$http.jsonp('http://www.toutiao.com/api/pc/focus/', {}, {
                emulateJSON: true
            }).then((response) => {
                for (let i = 0; i < response.data.data.pc_feed_focus.length; i++) {
                    this.slidecards.push({
                        display_url: this.root_url + response.data.data.pc_feed_focus[i].display_url,
                        image_url: response.data.data.pc_feed_focus[i].image_url,
                        title: response.data.data.pc_feed_focus[i].title,
                        listClass: {
                            'slide-item': true,
                            'slide-item-active': false
                        }
                    })
                }
                this.$set(this.banner[0].itemClass, 'slide-tab-item-active', true)
                this.$set(this.slidecards[0].listClass, 'slide-item-active', true)

                this.bannerCircle()
            }, function (response) {
                console.log(response)
            });
        },
    },

    created() {
        this.getBannerList()
    },
}