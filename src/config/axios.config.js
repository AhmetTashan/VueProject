import axios from "axios";
import secureLS from "@/services/secureLs.service";

class AxiosConfig {

    #baseUrl;

    baseUrl(url) {
        this.#baseUrl = url;
        return this;
    }

    #getBaseUrl() {
        this.#baseUrl = this.#baseUrl ?? process.env.VUE_APP_API_URL;
        return this.#baseUrl.endsWith("/") ? this.#baseUrl : this.#baseUrl + "/";
    }

    // -----------

    #header;

    headers(header) {
        this.#header = header;
        return this;
    }

    // -----------

    #path;

    path(path) {
        this.#path = path.startsWith("/") ? path.substr(1) : path;
        return this;
    }

    // -----------

    #data;

    data(data) {
        this.#data = data;
        return this;
    }


    // -----------

    id(id) {
        this.#path = this.#path.endsWith("/") ? this.#path + id : this.#path + "/" + id;
        return this;
    }


    // eslint-disable-next-line no-dupe-class-members
    #start() {
        this.#getBaseUrl();

        if (secureLS.get(process.env.VUE_APP_LS_NAME) && secureLS.get(process.env.VUE_APP_LS_NAME).access_token) {
            this.#header = {
                ...this.#header,
                Authorization: `Bearer ${secureLS.get(process.env.VUE_APP_LS_NAME).access_token}`
            };
        }

        const axiosInstance = axios.create({
            baseURL: this.#baseUrl,
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                ...this.#header
            },
        });

        axiosInstance.interceptors.response.use(undefined, (error) => {

            const statusCode = error.response ? error.response.status : null;

            if (statusCode === 0) {
                return Promise.reject("Server not found");
            }

            if (statusCode === 404) {
                return Promise.reject("Page not found");
            }

            if (statusCode === 401) {
                if (error.response.data.message === "Unauthenticated.") {
                    window.open("/#/auth/logout", "_self");
                }
            }

            return Promise.reject(error);
        });

        return axiosInstance;
    }

    // -----------

    post() {
        return this.#start().post(this.#path, this.#data);
    }

    get() {
        return this.#start().get(this.#path);
    }

    put() {
        return this.#start().put(this.#path, this.#data);
    }

    delete() {
        return this.#start().delete(this.#path);
    }

    patch() {
        return this.#start().patch(this.#path, this.#data);
    }

}

export default AxiosConfig;
