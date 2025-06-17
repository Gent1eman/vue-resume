import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "home",
        component: () => import("@/views/home/index.vue"),
        meta: { title: "简历工坊 - 首页" }
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
