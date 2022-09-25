import axios from "axios";
import secureLS from "@/services/secureLs.service";


class QueryService {

    #getAuthDataLocalStorage = secureLS.get(process.env.VUE_APP_LS_NAME);
    #baseUrl;
    _path;
    _headers;
    _data = {};
    #query;
    _query = [];

    #getBaseUrl() {
        this.#baseUrl = this.#baseUrl ?? process.env.VUE_APP_API_URL;
        return this.#baseUrl.endsWith("/") ? this.#baseUrl : this.#baseUrl + "/";
    }

    headers(headers) {
        if (headers instanceof Object) {
            this._headers = headers;
        } else {
            console.warn('"headers(parametre)" metodunun parametresi Object türünde olmalıdır.');
            this._headers = {};
        }
        return this;
    }

    path(path) {

        if (typeof path !== 'string') {
            console.warn('"path(parametre)" metodunun parametresi String türünde olmalıdır.');
        }

        this._path = path.startsWith('/') ? path.substr(1) : path;
        this._path += this.#query ?? '';
        return this;
    }

    data(data) {
        if (data instanceof Object) {
            this._data = data;
        } else {
            console.warn('"data(parametre)" metodunun parametresi Object türünde olmalıdır.');
            this._data = {};
        }
        return this;
    }

    baseUrl(baseUrl) {
        this.#baseUrl = baseUrl;
        return this;
    }

    query(query = []) {
        let __query = [
            ...this._query,
            ...query
        ];

        if (__query.length === 0) {
            return this;
        }

        let _arr = [];

        __query.map((obj) => {
            Object.keys(obj).map((key) => {
                _arr.push(key + '=' + obj[key]);
            });
        })

        this.#query = '?' + _arr.join('&');
        return this;
    }

    _setup() {
        this.#getBaseUrl();

        if (this.#getAuthDataLocalStorage && this.#getAuthDataLocalStorage.access_token) {
            this._headers = {
                Authorization: 'Bearer ' + this.#getAuthDataLocalStorage.access_token
            };
        }

        const axiosInstance = axios.create({
            baseURL: this.#baseUrl,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        // bir yanıt aldıktan sonra yapılacaklar
        axiosInstance.interceptors.response.use(
            requestConfig => requestConfig,
            (error) => {

                if (error.response.status === 404) {
                    window.open('/#/404', '_self');
                }

                // token süresi bitmiş veya token geçersiz ise çalış
                if (error.response.status === 401) {
                    if (error.response.data.message === "Unauthenticated.") {
                        window.open("/#/auth/logout", "_self");
                    }
                }

                return Promise.reject(error);
            });

        return axiosInstance;
    }

    // ----------------------------

    get() {
        const axiosInstance = this._setup();
        return axiosInstance.get(this._path, this._headers);
    }

    post() {
        const axiosInstance = this._setup();
        return axiosInstance.post(this._path, this._data, this._headers);
    }

    put() {
        const axiosInstance = this._setup();
        return axiosInstance.put(this._path, this._data, this._headers);
    }

    patch() {
        const axiosInstance = this._setup();
        return axiosInstance.patch(this._path, this._data, this._headers);
    }

    delete() {
        const axiosInstance = this._setup();
        return axiosInstance.delete(this._path, this._headers);
    }

}

export default QueryService;
