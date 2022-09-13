import axios from "axios";
import secureLS from "@/services/secureLs.service";

let config = {
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    withCredentials: true,
}


const _axios = axios.create(config);


export default {
    install: (app) => {

        Object.defineProperty(app.config.globalProperties, "$axios", {
            get() {
                _axios.interceptors.request.use((config) => {

                    const ls = this.$secureLs.get(process.env.VUE_APP_LS_NAME);
                    if (ls && ls.access_token) {
                        config.headers.Authorization = 'Bearer ' + ls.access_token;
                    }
                    return config;
                });


                _axios.interceptors.response.use(undefined, (error) => {

                    if (error.response.status === 401) {
                        if (error.response.data.message === "Unauthenticated.") {
                            this.$router.push({name: "auth.logout"});
                        }
                    }
                    return Promise.reject(error);
                });
                return _axios;
            }
        });
    }
};