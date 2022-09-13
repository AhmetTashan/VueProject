<script>
import DashboardRequest from "../service/dashboardRequest";

export default {
    name: "Dashboard",
    data() {
        return {
            me: {},
        }
    },
    methods: {
        getMe: function () {


            this.$axios.get("/me").then((response) => {
                this.me = response.data;
            }).catch((error) => {
                this.me = {};
            });
            // DashboardRequest.me().then((response) => {
            //     this.me = response.data;
            // }).catch((error) => {
            //     this.me = {};
            // });
        },
    },
    mounted() {
        this.getMe();
    }
}
</script>

<template>
    <div>
        Başlangıç
    </div>
    <div>
        <button @click="getMe">Get Me</button>
    </div>
    <div>
        {{ me }}
    </div>
</template>

<style lang="scss" scoped>

</style>
