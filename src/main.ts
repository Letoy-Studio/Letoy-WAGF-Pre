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

// @ts-ignore
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
// VuePress主题以及样式（这里也可以选择github主题）
// @ts-ignore
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';


import Prism from 'prismjs';
// 代码高亮
import 'prismjs/components/prism-json';
// 选择使用主题
VMdPreview.use(vuepressTheme, {
    Prism,
});

const app = createApp(App);
app.config.globalProperties.$LTTips = LTTips;
app.config.globalProperties.$ElTip = ElNotification;
app.use(store).use(TDesign).use(VMdPreview).use(router).mount('#app')
