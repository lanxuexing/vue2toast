import { createApp } from 'vue'
import App from './App.vue'
import Toast from '../src/index'
import './main.css'

const app = createApp(App)
app.use(Toast)
app.mount('#app')
