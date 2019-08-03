import Vue from 'vue'
import App from './App.vue'
import '@/assets/css/style.css'
import '@/assets/css/bootstrap.min.css'
import VueDraggableResizable from 'vue-draggable-resizable'
import drr from '@minogin/vue-drag-resize-rotate'
import dr from '@/components/drr'
import helper from '@/assets/js/helper'

import VueHtml2Canvas from 'vue-html2canvas';


Vue.use(VueHtml2Canvas);


// optionally import default styles
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

// Vue.prototype.$Magnet = Magnet
Vue.component('vue-draggable-resizable', VueDraggableResizable)
Vue.component('drr', drr)
Vue.component('dr', dr)

// 



Vue.config.productionTip = false


new Vue({
  data: () => ({
    bColor: '#ffffff',
    bgImg: '',
    inputImages: []
  }),
  render: h => h(App),
}).$mount('#app')
