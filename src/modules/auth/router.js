import Module from "./Module";

const moduleRoute = {
    path: "/auth",
    component: Module,
    children: [
        {
            path: "login",
            name: "auth.login",
            component: () => import('./views/Login'),
            meta: {
                template: "blank"  // blank && default
            }
        },
        {
            path: 'register',
            name: 'auth.register',
            component: () => import('./views/Register'),
            meta: {
                template: "blank" // blank && default
            }
        },
        {
            path: 'logout',
            name: 'auth.logout',
            component: () => import('./views/Logout'),
            meta: {
                template: "blank" // blank && default
            }
        }
    ]
}

export default router => {
    router.addRoute(moduleRoute);
};
