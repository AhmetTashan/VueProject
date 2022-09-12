export default {

    getAuthentication (state) {
        return state.isAuthenticated;
    },

    getUser (state) {
        return state.user;
    },

    getAccessToken (state) {
        return state.accessToken;
    }
}
