import LaravelResourceService from "@/services/laravel.resource.service";

class PostRequest extends LaravelResourceService {

    constructor() {
        super();
        this.path("posts");
    }

}


export default new PostRequest;
