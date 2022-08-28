import Vue from 'vue';
import App from './App.vue';
import store from './plugins/store/store';
import router from './plugins/router';
import fontIcon from 'bd-font-icons';
import comptsPC from './components/index';
import GeminiScrollbar from 'vue-gemini-scrollbar';
import VCharts from 'v-charts';
import echarts from 'echarts';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import './assets/css/reset.css';
import 'swiper/dist/css/swiper.css';
import './assets/css/common.scss';
import './plugins/element.js';
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(fontIcon);
Vue.use(comptsPC);
Vue.use(GeminiScrollbar);
Vue.use(VCharts);
Vue.use(VueAwesomeSwiper);
Vue.use(Vant);

Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;

// sessionStorage.setItem('X-SystemId', '1016')
// sessionStorage.setItem('X-NG-SessionId', '0011ead9-af5b-41b7-b93d-ad9a95be9366')
// sessionStorage.setItem('X-NG-UserId', '9990035')
// sessionStorage.setItem('X-NG-UserInfo','{"userInfo":{"userId": "99998555"}}')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
