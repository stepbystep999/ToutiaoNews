import $ from 'jquery'

export default {
    data() {
        return {
            articles: [],
            root_url: 'https://www.toutiao.com',
            url_divide: '/',
            comment_id: '/#comment_area',
            lazy: 0,
            max_behot_time: Date.parse(new Date()) / 1000,
            news_api_left: 'http://www.toutiao.com/api/pc/feed/?max_behot_time=',
            news_api_right: '&category=__all__&utm_source=toutiao&widen=1&tadrequire=true&as=A18579E7A8A8E7E&cp=5978A80E578E2E1',
        }
    },

    watch: {
        lazy() {
            if (this.lazy === 1) {
                this.getNewsList()
            }
        }
    },

    methods: {
        lazyload() {
            let vm = this
            $(window).scroll(function () {
                if ($(document).scrollTop() + $(window).height() + 50 > $(document).height()) {
                    vm.lazy = 1
                }
                else {
                    vm.lazy = 0
                }
            })
        },

        pastTime(value) {
            let now_time = Date.parse(new Date()) / 1000 % 1000000000
            let seconds = now_time - value
            return seconds
        },

        pastTimeTag(seconds) {
            let minutes = parseInt(seconds / 60)
            let hours = parseInt(seconds / 3600)
            let days = parseInt(seconds / 86400)
            if(seconds < 60 ) {
                return '刚刚'
            } else if(minutes < 60) {
                return minutes + '分钟前'
            } else if(hours < 24) {
                return hours + '小时前'
            } else {
                return days + '天前'
            }
        },

        getNewsList() {
            let vm = this
            let news_api = vm.news_api_left + (vm.max_behot_time % 1000000000) + vm.news_api_right
            vm.$http.jsonp(news_api, {}, {
                emulateJSON: true
            }).then(function (response) {
                for (let i = 0; i < response.data.data.length; i++) {
                    let past_time = vm.pastTime(response.data.data[i].behot_time)
                    vm.articles.push({
                        behot_time: response.data.data[i].behot_time,
                        single_mode: response.data.data[i].single_mode,
                        source_url: vm.root_url + response.data.data[i].source_url,
                        image_url: response.data.data[i].image_url,
                        title: response.data.data[i].title,
                        tag_url: vm.root_url + vm.url_divide + response.data.data[i].tag_url,
                        chinese_tag: response.data.data[i].chinese_tag,
                        media_url: vm.root_url + response.data.data[i].media_url,
                        media_avatar_url: response.data.data[i].media_avatar_url,
                        source: response.data.data[i].source,
                        comments_url: vm.root_url + response.data.data[i].tag_url + response.data.data[i].comment_id,
                        comments_count: response.data.data[i].comments_count,
                        past_time_tag: vm.pastTimeTag(past_time),
                    })
                }
               vm.max_behot_time = response.data.next.max_behot_time
            }, function (response) {
                console.log(response)
            })
        },
    },
    
    created() {
        this.getNewsList()
        this.lazyload()
    }
}