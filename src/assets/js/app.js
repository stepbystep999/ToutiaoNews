import newsheader from '../../components/newsheader.vue'
import newsnav from '../../components/newsnav.vue'
import newscarousel from '../../components/newscarousel.vue'
import newslist from '../../components/newslist.vue'

export default {
    name: 'app',
    data() {
        return {
            
        }
    },
    
    components: { newsheader, newsnav, newscarousel, newslist }
}