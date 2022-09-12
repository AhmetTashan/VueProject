import Module from "./Module";

const moduleRoute = {
    path: "/post",
    component: Module,
    children: [
        {
            path: "list",
            component: () => import('./views/Home'),
            meta: {
                // template: "blank"
            }
        }
    ]
}

export default router => {
    router.addRoute(moduleRoute);
};
