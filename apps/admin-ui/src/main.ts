import { createApp } from "vue"
import App from "./App.vue"
import { bootstrap } from "./utils/bootstrap"
import "@/assets/css/main.css"
import "element-plus/theme-chalk/dark/css-vars.css"
import "@/assets/css/css-vars-dark.css"
import "@/assets/css/css-vars.css"

import "./utils/check-update"

const app = createApp(App)

bootstrap(app)

app.mount("#app")
