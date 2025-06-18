import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "home",
        component: () => import("@/views/home/index.vue"),
        meta: { title: "简历工坊" }
    },
    {
        path: "/resume",
        component: () => import("@/views/layout/index.vue"),
        children: [
            {
                path: "/resume/edit",
                name: "edit",
                component: () => import("@/views/resumeEdit/index.vue"),
                meta: { title: "简历工坊 - 编辑" }
            },
            {
                path: "/resume/template",
                name: "template",
                component: () => import("@/views/resumeTemplate/index.vue"),
                meta: { title: "简历工坊 - 模板" }
            },
            {
                path: "/resume/aiDeep",
                name: "aiDeep",
                component: () => import("@/views/aiDeep/index.vue"),
                meta: { title: "简历工坊 - AI深度交流" }
            },
            {
                path: "/resume/setting",
                name: "setting",
                component: () => import("@/views/setting/index.vue"),
                meta: { title: "简历工坊 - 网站配置" }
            }
        ]
    }
];

// 创建路由实例
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

// 后置路由守卫
// 从路由的 meta 字段中读取标题​​：
// 如果目标路由（to）的 meta 对象中包含 title 属性，则将其作为网页标题。
router.afterEach(to => {
    document.title = (to.meta?.title as string) || "默认标题";
});

export default router;
