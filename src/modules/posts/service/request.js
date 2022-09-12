import axiosConfig from "@/config/axios.config";

class Request {

    getAll() {
        return axiosConfig.get("/posts");
    }

    getById(id) {
        return axiosConfig.get("/posts/" + id);
    }

    create(data) {
        return axiosConfig.post("/posts", data);
    }

    update(id, data) {
        return axiosConfig.put("/posts/" + id, data);
    }

    delete(id) {
        return axiosConfig.delete("/posts/" + id);
    }

    findByTitle(title) {
        return axiosConfig.get("/posts/findByTitle/" + title);
    }

}


export default new Request();
