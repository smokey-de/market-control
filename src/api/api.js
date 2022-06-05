import axios from 'axios'
import {URL} from './config'
import {Base64} from "js-base64";


const request  = axios.create({
    baseURL: URL,
});

const subscribe = (history = null) => {
    request.interceptors.request.use((config) => {
        let token = localStorage.getItem('BotToken');

        if (token) {
            config.headers["Authorization"] = ["Bearer", Base64.decode(token)].join(" ")
        }

        return config
    });

    request.interceptors.response.use(
        (config) => config,
        (error) => {
            if (error?.response?.status === 401) {
                localStorage.clear();
                sessionStorage.clear();
                history.push('/auth');
                // alert('Login yoki parol xato')
            }
            if (error.response?.data) {
            }
            throw error
        }
    )
};

export default {request, subscribe}