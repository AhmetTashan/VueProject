export default {
    isAuthenticated: (state, payload) => state.isAuthenticated = payload,
    user: (state, data) => state.user = data,
    accessToken: (state, token) => state.accessToken = token
}
