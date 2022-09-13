import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/modules/modules.js'
import secureLs from '@/services/secureLs.service'
import axios from '@/services/axios.service'

// import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

// import my style
import '@/assets/styles/App.scss'


const app = createApp(App);

app.config.globalProperties.$secureLs = secureLs

app.use(axios)
    .use(store)
    .use(router)
    .mount('#app')
