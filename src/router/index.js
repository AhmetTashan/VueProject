import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '@/views/Home.vue'
import secureLs from '@/services/secureLs.service'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {x: 0, y: 0}
        }
    }
})

router.beforeEach((to, from, next) => {

    const publicPages = ['/auth/login', '/auth/register', '/auth/forgot-password', '/auth/reset-password'];
    const authRequired = !publicPages.includes(to.path);

    const loggedIn = secureLs().get(process.env.VUE_APP_LS_NAME);

    // trying to access a restricted page + not logged in
    // redirect to login page

    if (authRequired && !loggedIn) {
        return next({name: "auth.login"});
    } else {
        next();
    }

})

export default router
