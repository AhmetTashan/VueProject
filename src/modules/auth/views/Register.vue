<script>
import AuthRequest from "@/modules/auth/service/authRequest";
import {mapActions} from "vuex";

export default {
    name: "Register",
    data() {
        return {
            formData: {
                name: "",
                surname: "",
                username: "",
                email: "",
                password: "",
                password_confirmation: "",
            }
        }
    },
    methods: {
        register: function () {

            AuthRequest.register(this.formData)
                .then((response) => {
                    this.$secureLs.set("_app__metadata", response.data);

                    this.setAccessToken(response.data.access_token);
                    this.setUser(response.data.user);
                    this.setAuthentication(true);

                    this.$router.push({name: "dashboard.home"});
                })
                .catch((error) => {
                    // TODO: Hata mesajı göster
                    console.log("register hata var :>>", error.response);
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
    <main class="register-page">
        <form class="segment bg-white p-4 mx-4 rounded-3 shadow-sm row" @submit.prevent="register">
            <div class="col-md-7">
                <h1 class="h3 mb-4 fw-normal">Hesabınızı oluşturun</h1>
                <div class="row">
                    <div class="col-sm-6 mb-4">
                        <div class="form-floating">
                            <input v-model="formData.name" ref="autofocus" type="text" class="form-control" id="name"
                                   placeholder="Ad" autocomplete="off"
                                   autofocus required>
                            <label for="name">Ad</label>
                        </div>
                    </div>
                    <div class="col-sm-6 mb-4">
                        <div class="form-floating">
                            <input v-model="formData.surname" type="text" class="form-control" id="surname"
                                   placeholder="Soyad" autocomplete="off"
                                   required>
                            <label for="surname">Soyad</label>
                        </div>
                    </div>
                    <div class="col-12 mb-4">
                        <div class="form-floating">
                            <input v-model="formData.username" type="text" class="form-control" id="username"
                                   placeholder="Kullanıcı Adı"
                                   autocomplete="off" required>
                            <label for="username">Kullanıcı Adı</label>
                        </div>
                        <div id="usernameHelp" class="form-text">Harf, rakam ve nokta işaretini kullanabilirsiniz.</div>

                    </div>
                    <div class="col-12 mb-4">
                        <div class="form-floating">
                            <input v-model="formData.email" type="email" class="form-control" id="email"
                                   placeholder="E-posta"
                                   autocomplete="off" required>
                            <label for="email">E-posta</label>
                        </div>

                    </div>
                    <div class="col-sm-6 mb-3 mb-sm-0">
                        <div class="form-floating">
                            <input v-model="formData.password" type="password" class="form-control" id="password"
                                   placeholder="Parola"
                                   autocomplete="off" required>
                            <label for="password">Parola</label>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-floating">
                            <input v-model="formData.password_confirmation" type="password" class="form-control"
                                   id="passwordConfirm" placeholder="Onayla"
                                   autocomplete="off" required>
                            <label for="passwordConfirm">Onayla</label>
                        </div>
                    </div>
                    <div class="col-12 mb-4">
                        <div class="form-text">
                            6 veya daha fazla harf, rakam ve sembolü karışık olarak kullanın
                        </div>
                    </div>
                    <div class="col-12 d-flex align-items-center justify-content-between">
                        <RouterLink :to="{name: 'auth.login'}"
                                    class="d-block mt-0 form-text text-primary text-end text-decoration-none hover-text-decoration-underline">
                            Zaten bir hesabın var mı?
                        </RouterLink>
                        <button class="btn btn-primary">Kaydol</button>
                    </div>
                </div>
            </div>
            <div class="col-md-5 d-none d-md-flex">
                <figure class="d-flex align-items-center">
                    <img src="../../../assets/images/sign-up.webp" class="w-100"/>
                </figure>
            </div>

        </form>
    </main>
</template>

<style lang="scss" scoped>
.register-page {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #f5f5f5;
    min-height: 100vh;

    .segment {
        flex-basis: 100%;
        max-width: 740px;
        min-width: 300px;
    }

    .form-floating {
        .form-control {
            height: calc(2.5rem + 2px);

            &:focus, &:not(:placeholder-shown) {
                padding-top: 1rem;
                padding-bottom: 1rem;

                & ~ label {
                    opacity: 1;
                    padding: 0;
                    transform: scale(.85) translateY(-.9rem) translateX(.15rem);
                    color: var(--bs-primary);
                }
            }

            &:not(:focus):not(:placeholder-shown) {
                & ~ label {
                    color: rgba(black, .5);
                }
            }

            &.is-invalid {

                & ~ label {
                    color: var(--bs-danger);
                }

                &:not(:focus):not(:placeholder-shown) {
                    & ~ label {
                        color: rgba(red, .7);
                    }
                }
            }

            &.is-valid {

                & ~ label {
                    color: var(--bs-success);
                }

                &:not(:focus):not(:placeholder-shown) {
                    & ~ label {
                        color: rgba(green, .7);
                    }
                }
            }
        }

        label {
            left: .75rem;
            width: auto;
            height: auto;
            padding: .5rem 0 0;
            text-shadow: 4px 0 #fff, -4px 0 #fff, 0 4px #fff, 0 -4px #fff,
            2px 2px #fff, -2px -2px #fff, 2px -2px #fff, -2px 2px #fff;
        }

    }
}
</style>
