import { createApp } from 'vue'
import App from './App.vue'
import { bootstrap } from './utils/bootstrap'
import '@aiknew/shared-ui-components/style.css'
import '@aiknew/shared-ui-form/style.css'
import '@aiknew/shared-ui-filer/style.css'
import '@aiknew/shared-ui-table/style.css'
import '@/assets/css/main.css'

const app = createApp(App)

bootstrap(app)

app.mount('#app')
