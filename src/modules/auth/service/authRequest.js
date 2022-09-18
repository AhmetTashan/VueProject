import QueryService from "@/services/query.service";

class AuthRequest extends QueryService {

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
