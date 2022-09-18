import QueryService from "@/services/query.service";

class DashboardRequest extends QueryService {

    me() {
        return this.path("me")
            .get();
    }

}


export default new DashboardRequest();
