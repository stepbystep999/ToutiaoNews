import $ from 'jquery'

export default {
    data() {
        return {
            weathercard: {}
        }
    },

    methods: {
        getWeather() {
            let that = this
            that.$http.jsonp('http://www.toutiao.com/stream/widget/local_weather/data/?city=%E5%8C%97%E4%BA%AC', {}, {
                emulateJSON: true
            }).then(function (response) {
                that.weathercard = {
                    city: response.data.data.city,
                    current_condition: response.data.data.weather.current_condition,
                    low_temperature: response.data.data.weather.low_temperature,
                    high_temperature: response.data.data.weather.high_temperature,
                    wind_direction: response.data.data.weather.wind_direction,
                    wind_level: response.data.data.weather.wind_level,
                    quality_level: response.data.data.weather.quality_level,
                    aqi: response.data.data.weather.aqi,
                    tomorrow_low_temperature: response.data.data.weather.tomorrow_low_temperature,
                    tomorrow_high_temperature: response.data.data.weather.tomorrow_high_temperature,
                    dat_low_temperature: response.data.data.weather.dat_low_temperature,
                    dat_high_temperature: response.data.data.weather.dat_high_temperature,
                }
            }, function (response) {
                console.log(response)
            })
        },

        openWeatherCard() {
            $('.y-weather').css('display', 'block')
        },

        closeWeatherCard() {
            $('.y-weather').css('display', 'none')
        }
    },
    
    created() {
        this.getWeather()
    }
}