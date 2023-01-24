import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/main.css'
import SignUpForm from './components/SignUpForm.vue'

const app = createApp(SignUpForm)

app.use(createPinia())

app.mount('#app')
