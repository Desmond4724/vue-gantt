import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

app.mixin({
  computed: {
    console: () => console
  }
})

app.use(store)
app.use(router)
app.mount('#app')

