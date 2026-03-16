import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/main.css'

if ('paintWorklet' in CSS) {
  CSS.paintWorklet.addModule('/squircle.js').then(() => {
    document.documentElement.classList.add('squircle-ready')
    if (navigator.userAgent.includes('Edg/')) {
      document.documentElement.classList.add('squircle-edge')
    }
  })
}

createApp(App).mount('#app')
