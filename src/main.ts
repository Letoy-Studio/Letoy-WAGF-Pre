import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import LTTips from "@/LTUI/LTTips";
import 'element-plus/es/components/loading/style/css'
import 'element-plus/es/components/notification/style/css'
import TDesign from 'tdesign-vue-next';
import {ElNotification} from 'element-plus'
import 'tdesign-vue-next/es/style/index.css';

const app = createApp(App);
app.config.globalProperties.$LTTips = LTTips;
app.config.globalProperties.$ElTip = ElNotification;
app.use(store).use(TDesign).use(router).mount('#app')
