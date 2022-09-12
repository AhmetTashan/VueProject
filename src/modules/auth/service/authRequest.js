import AxiosConfig from "@/config/axios.config";

class AuthRequest extends AxiosConfig {

    csrfCookie() {
        return this.path("/csrf-cookie")
            .get();
    }

    login(data) {
        return this.path("auth/login")
            .data(data)
            .post();
    }

    register(data) {
        return this.path("auth/register")
            .data(data)
            .post();
    }

    logout() {
        return this.path("auth/logout")
            .get();
    }
}

export default new AuthRequest();
