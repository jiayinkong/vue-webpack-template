import { createApp } from 'vue';
import App from './App.vue';
import svgIconRegistered from '@/register/svg_component';

const app = createApp(App);

// 全局组件注册
svgIconRegistered(app);

app.mount('#app');