<template>
    <Blank v-if="getTemplate === 'blank' || !getTemplate">
        <router-view/>
    </Blank>
    <Default v-if="getTemplate === 'default'">
        <router-view/>
    </Default>
</template>


<script>
import Blank from "@/templates/Blank";
import Default from "@/templates/Default";
import {mapActions} from "vuex";

export default {
    name: "App",
    components: {
        Blank,
        Default
    },
    data() {
        return {
            getTemplate: undefined
        }
    },
    mounted() {
        this.isAuthenticationFromLocalStorage();
    },
    methods: {
        // local storage'den giriş bilgilerini alıp store'a atıyoruz.
        isAuthenticationFromLocalStorage() {
            try {
                let metadata = this.$secureLs.get(process.env.VUE_APP_LS_NAME);
                if (metadata) {
                    this.setAccessToken(metadata?.access_token);
                    this.setUser(metadata?.user);
                    this.setAuthentication(true);
                }

            } catch (e) {
                this.$secureLs.remove(process.env.VUE_APP_LS_NAME);
                this.setAuthentication(false);
            }
        },
        ...mapActions("auth", ["setAuthentication", "setUser", "setAccessToken"]),
    },
    computed: {
        // vuex anlık takip edilen state değerlerini kullanmak için
        getAuthentication() {
            return this.$store.getters["auth/getAuthentication"];
        },
    },
    watch: {
        $route() {
            this.getTemplate = this.$route?.meta?.template;
        },
        // vuex state değerini anlık takip etmek için kullan
        getAuthentication(val) {
            if (val === false) {
                this.$router.push({name: "auth.logout"});
            }
        }
    }
}
</script>

<style lang="scss">
#app {
    width: 100vw;
    min-height: 100vh;
}
</style>
