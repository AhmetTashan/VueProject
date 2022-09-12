<script>
import AuthRequest from "../service/authRequest";
import {mapActions} from "vuex";

export default {
    name: "Login",
    data() {
        return {
            formData: {
                login: "",
                password: "",
                remember_me: true,
            }
        }
    },
    methods: {
        login: function () {

            AuthRequest.login(this.formData).then((response) => {

                this.$secureLs.set(process.env.VUE_APP_LS_NAME, response.data);

                this.setAccessToken(response.data.access_token);
                this.setUser(response.data.user);
                this.setAuthentication(true);

                this.$router.push({name: "dashboard.home"});

            }).catch((error) => {
                // TODO: Hata mesajı göster
                console.log("login hata var :>>", error.response);
            });

        },
        ...mapActions("auth", ["setAuthentication", "setUser", "setAccessToken"]),
    },
    mounted() {
        this.$refs.autofocus.focus();

        if (this.$store.getters["auth/getAuthentication"]) {
            this.$router.push({name: "dashboard.home"});
        }
    }
}
</script>

<template>
    <main class="login-page">
        <form class="form-signin w-100 m-auto" @submit.prevent="login">
            <h1 class="h3 mb-4 fw-normal text-center">Hesabına Giriş yap</h1>

            <div class="form-floating">
                <input v-model="formData.login" ref="autofocus" type="text" class="form-control" id="floatingInput"
                       placeholder="E-posta veya kullanıcı adı"
                       autofocus required autocomplete="off">
                <label for="floatingInput">E-posta veya kullanıcı adı</label>
            </div>
            <div class="form-floating">
                <input v-model="formData.password" type="password" class="form-control" id="floatingPassword"
                       placeholder="Parola" required>
                <label for="floatingPassword">Parola</label>
            </div>
            <RouterLink :to="{name: 'auth.register'}"
                        class="d-block mt-0 form-text text-primary text-end text-decoration-none hover-text-decoration-underline">
                Parolanı mı unuttun?
            </RouterLink>

            <div class="form-check mb-4">
                <label>
                    <input v-model="formData.remember" class="form-check-input" type="checkbox"> Beni hatırla
                </label>
            </div>
            <button class="w-100 btn btn-lg btn-primary" type="submit">Giriş yap</button>
            <p class="mt-4 mt-lg-2 mb-4 text-center text-lg-start form-text">Henüz bir hesabın yok mu?
                <RouterLink :to="{name: 'auth.register'}"
                            class="text-decoration-none hover-text-decoration-underline">
                    Kaydol
                </RouterLink>
            </p>
            <p class="mt-3 mb-4 text-muted text-center">&copy; 2017–2022</p>
        </form>
    </main>
</template>

<style lang="scss" scoped>
.login-page {
    display: flex;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #f5f5f5;
    min-height: 100vh;
}

.form-signin {
    max-width: 330px;
    padding: 15px;

    .form-floating {
        &:focus-within {
            z-index: 2;
        }

        input {
            &[type="text"] {
                margin-bottom: -1px;
                border-bottom-right-radius: 0;
                border-bottom-left-radius: 0;
            }

            &[type="password"] {
                margin-bottom: 10px;
                border-top-left-radius: 0;
                border-top-right-radius: 0;
            }
        }
    }
}
</style>

<style lang="scss">

</style>
