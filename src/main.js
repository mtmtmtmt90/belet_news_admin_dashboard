import Vue from 'vue'
import App from './App.vue'
import babelPolyfill from 'babel-polyfill'



new Vue({
  el: '#app',
  render: h => h(App)
})
