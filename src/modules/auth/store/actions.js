export default {

    setAuthentication(context, payload) {
        context.commit('isAuthenticated', payload);
    },

    setUser(context, user) {
        context.commit('user', user);
    },

    setAccessToken(context, accessToken) {
        context.commit('accessToken', accessToken);
    }

}
