import queryService from "@/services/query.service";

class LaravelResourceService extends queryService {

    #id;
    #orderBy;
    #limit;
    #page;

    id(id = 0) {
        if (typeof id !== 'number') {
            console.warn('id(parametre) parametresi sayı olmalıdır.');
            return false;
        }

        this.#id = id.startsWith('/') ? id : '/' + id;
        return this;
    }

    orderBy(orderBy = 'desc', key = 'order_by') {

        if (!(orderBy === 'desc' || orderBy === 'asc')) {
            orderBy = 'desc';
        }

        this._query.push({
            [key]: orderBy
        });
        return this;
    }

    limit(limit = 15, key = 'limit') {

        if (typeof limit !== 'number') {
            console.warn('limit(parametre) parametresi Sayı türünde olmalıdır.');
            return false;
        }

        this._query.push({
            [key]: limit
        });
        return this;
    }

    page(page = 1, key = 'page') {

        if (typeof page !== 'number') {
            console.warn('page(parametre) parametresi Sayı türünde olmalıdır.');
            return false;
        }

        this._query.push({
            [key]: page
        });
        return this;
    }

    #paginate() {

        let path = this._path.split('?');
        let url = path[0];
        url += this.#id !== 0 ? this.#id : '';
        url += path[1] ? '?' + path[1] : '';

        return url;
    }

    // ----------------------------


    /**
     * service.page(1)
     *      .limit(15)
     *      .orderBy('desc')
     *      .findAll()
     * */
    findAll() {

        if (this._path.length === 0) {
            console.warn('Yol boş olamaz.');
            return false;
        }

        let url = this.#paginate();
        const axiosInstance = this._setup();
        return axiosInstance.get(url, this._headers);
    }

    findById() {

        if (this._path.length === 0 || this.#id === 0) {
            console.warn('Yol veya id boş olamaz.');
            return false;
        }

        const axiosInstance = this._setup();
        let url = this._path + this.#id;
        return axiosInstance.get(url, this._headers);
    }

    create() {

        if (this._path.length === 0 || Object.keys(this._data).length === 0) {
            console.warn('Yol veya veri boş olamaz.');
            return false;
        }

        const axiosInstance = this._setup();
        return axiosInstance.post(this._path, this._data, this._headers);
    }

    update() {

        if (this._path.length === 0 || this.#id === 0 || Object.keys(this._data).length === 0) {
            console.warn('Yol, id veya veri boş olamaz.');
            return false;
        }

        const axiosInstance = this._setup();
        let url = this._path + this.#id;
        return axiosInstance.put(url, this._data, this._headers);
    }

    delete() {

        if (this._path.length === 0 || this.#id === 0) {
            console.warn('Yol veya id boş olamaz.');
            return false;
        }

        const axiosInstance = this._setup();
        let url = this._path + this.#id;
        return axiosInstance.delete(url, this._headers);
    }
}

export default LaravelResourceService;
