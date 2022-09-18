import Module from "./Module";

const moduleRoute = {
    path: "/post",
    component: Module,
    children: [
        {
            path: "list",
            name: "post.list",
            component: () => import('./views/List'),
            meta: {
                template: "default", // blank && default
            }
        }
    ]
}

export default router => {
    router.addRoute(moduleRoute);
};
