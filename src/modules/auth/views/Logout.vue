<script>
export default {
    name: "Logout",
    methods: {
        logout: function () {
            this.$secureLs.remove(process.env.VUE_APP_LS_NAME);
            this.$store.dispatch("auth/setAuthentication", undefined);
            this.$store.dispatch("auth/setAccessToken", undefined);
            this.$store.dispatch("auth/setUser", {});
            this.$router.push({name: "auth.login"});
        }
    },
    created() {
        this.logout();
    }
}
</script>

<template>
    <div>
        <h1>Çıkış Yapılıyor...</h1>
    </div>
</template>

<style lang="scss" scoped>

</style>