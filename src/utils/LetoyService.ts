import axios, {AxiosRequestConfig} from 'axios';
import md5 from 'js-md5';
import 'element-plus/es/components/message/style/css'
import {MessagePlugin} from 'tdesign-vue-next';
import router from "@/router";

export interface Response {
    status: number,
    data: {
        status: number,
        data: object,
        msg: string
    }
}

const axiosRequestConfig: AxiosRequestConfig = {
    headers: {
        "Content-Type": 'application/json;charset=UTF-8',
    },
}
const LetoyService = {
    async authRequest(url: string, params: object, data: object) {
        const axiosRequestConfigAuth: AxiosRequestConfig = {
            headers: {
                "Content-Type": 'application/json;charset=UTF-8',
                "Authorization": sessionStorage.getItem('systemToken') || ""
            },
        }
        axiosRequestConfigAuth.params = params
        const post = () => {
            return new Promise(resolve => {
                axios.post("/api" + url, data, axiosRequestConfigAuth)
                    .then((response: Response) => {
                        if (response.status === 200) {
                            let responseStatus = response.data.status;
                            switch (responseStatus) {
                                case 6:
                                    MessagePlugin.error("请登陆！");
                                    router.push("/");
                                    break;
                            }

                            resolve(response.data);
                        } else {
                            MessagePlugin.error("网络异常！");
                            resolve(null);
                        }
                    });
            });
        };
        return await post();
    },
    async noAuthRequest(url: string, params: object, data: object) {
        const axiosRequestConfigAuth: AxiosRequestConfig = {
            headers: {
                "Content-Type": 'application/json;charset=UTF-8'
            },
        }
        axiosRequestConfigAuth.params = params
        const post = () => {
            return new Promise(resolve => {
                axios.post("/api" + url, data, axiosRequestConfig)
                    .then((response: Response) => {
                        if (response.status === 200) {
                            let responseStatus = response.data.status;
                            switch (responseStatus) {
                                case 6:
                                    MessagePlugin.error("请登陆！");
                                    router.push("/");
                                    break;
                            }
                            resolve(response.data);
                        } else {
                            MessagePlugin.error("网络异常！");
                            resolve(null);
                        }
                    });
            });
        };
        return await post();
    },
    login(username: string, password: string) {
        return this.noAuthRequest('/login', {
            username,
            password: md5(password)
        }, {});
    }
};
export default LetoyService;
