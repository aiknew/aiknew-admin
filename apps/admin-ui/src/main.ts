import { createApp } from 'vue'
import App from './App.vue'
import { bootstrap } from './utils/bootstrap'
import '@/assets/css/main.css'
import '@aiknew/shared-ui-components/style.css'

const app = createApp(App)

bootstrap(app)

app.mount('#app')
