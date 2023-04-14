import axios from 'axios';
import md5 from 'js-md5';
import ElementUI from 'element-ui';

const LetoyService = {
    async authorizationRequest(url, method, params, data) {
        let post = () => {
            return new Promise(resolve => {
                axios({
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        Authorization: sessionStorage.getItem('systemToken')
                    },
                    url: '/api/' + url,
                    method,
                    params,
                    data
                }).then((response) => {
                    if (response.status === 200) {
                        resolve(response.data);
                    } else {
                        ElementUI.Message({
                            message: '网络异常，稍后再试',
                            type: 'warning'
                        });
                        resolve(null);
                    }
                });
            });
        };
        return await post();
    },
    async noAuthorizationRequest(url, method, params, data) {
        let post = () => {
            return new Promise(resolve => {
                axios({
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    url: '/api/' + url,
                    method,
                    params,
                    data
                }).then((response) => {
                    if (response.status === 200) {
                        resolve(response.data);
                    }else{
                        ElementUI.Message({
                            message: '网络异常，稍后再试',
                            type: 'warning'
                        });
                        resolve(null);
                    }
                });
            });
        };
        return await post();
    },

    login(username, password) {
        return this.request(null, '/api/login', 'post', null, {
            username,
            password: md5(password)
        });
    }
};
export default LetoyService;
