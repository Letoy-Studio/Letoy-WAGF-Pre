import {createVNode, render} from "vue";
import Component from "./src/index.vue";

interface IOptions {
    label: string;
    toast_type?: "success" | "alert" | "warning" | "error" | "loading";
    duration?: number;
    type: string;
    top: boolean;
    showCover: boolean;
}

let exists = false;
let mountNode: HTMLDivElement;
const LTTips = {
    closeLTTips() {
        if (exists) {
            document.body.removeChild(mountNode);
            exists = false;
        }
    },
    createLTTips(options: IOptions) {
        const duration = options.duration || 2000;
        if (exists) {
            document.body.removeChild(mountNode);
            exists = false;
        }
        const app = createVNode(Component, {
            ...options,
            duration,
            show_toast: true,
        });
        const timer = setTimeout(() => {
            document.body.removeChild(mountNode);
            exists = false;
            clearTimeout(timer);
        }, duration);
        mountNode = document.createElement("div");
        exists = true;
        render(app, mountNode);
        document.body.appendChild(mountNode);
    }
}
export default LTTips;
