import Vue from 'vue'
import App from './App.vue'
import '@/assets/css/style.css'
import VueDraggableResizable from 'vue-draggable-resizable'
import drr from '@minogin/vue-drag-resize-rotate'
import dr from '@/components/drr'

// optionally import default styles
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

Vue.component('vue-draggable-resizable', VueDraggableResizable)
Vue.component('drr', drr)
Vue.component('dr', dr)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
