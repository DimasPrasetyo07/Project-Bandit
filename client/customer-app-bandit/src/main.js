import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import vue3GoogleLogin from 'vue3-google-login'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"


// import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()
pinia.use(({store}) => {
    store.router = markRaw(router)
})


app.use(router)
app.use(pinia)
app.use(vue3GoogleLogin, {
    clientId: '298425873892-gr6ea7q0hldg3mj646mbkn4ghrhuorva.apps.googleusercontent.com'
  })

app.mount('#app')
