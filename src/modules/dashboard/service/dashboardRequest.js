import AxiosConfig from "@/config/axios.config";

class DashboardRequest extends AxiosConfig {

    me() {
        return this.path("me")
            .get();
    }

}


export default new DashboardRequest();
