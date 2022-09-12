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

        if (secureLS().get("_app__metadata") && secureLS().get("_app__metadata").access_token) {
            this.#header = {
                ...this.#header,
                Authorization: `Bearer ${secureLS().get("_app__metadata").access_token}`
            };
        }

        return axios.create({
            baseURL: this.#baseUrl,
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                ...this.#header
            },
        });
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
