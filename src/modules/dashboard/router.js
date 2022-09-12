import Module from "./Module";

const moduleRoute = {
    path: "/dashboard",
    component: Module,
    children: [
        {
            path: "",
            name: "dashboard.home",
            component: () => import('./views/Dashboard'),
            meta: {
                template: "default",
            }
        }
    ]
}

export default router => {
    router.addRoute(moduleRoute);
};
