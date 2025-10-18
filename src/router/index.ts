import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

// 路由配置
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/pages/Home/HomePage.vue"),
    meta: {
      title: "首页 - UtileShare",
      description: "实用资源分享网站首页",
    },
  },
  {
    path: "/category/:id",
    name: "Category",
    component: () => import("@/pages/Category/CategoryPage.vue"),
    meta: {
      title: "分类 - UtileShare",
      description: "浏览分类资源",
    },
    props: true,
  },
  {
    path: "/resource/:id",
    name: "Resource",
    component: () => import("@/pages/Resource/ResourcePage.vue"),
    meta: {
      title: "资源详情 - UtileShare",
      description: "查看资源详情",
    },
    props: true,
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("@/pages/Search/SearchPage.vue"),
    meta: {
      title: "搜索结果 - UtileShare",
      description: "搜索结果页面",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/pages/NotFound/NotFoundPage.vue"),
    meta: {
      title: "页面未找到 - UtileShare",
      description: "您访问的页面不存在",
    },
  },
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 页面切换时滚动到顶部
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

// 路由守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }

  // 设置页面描述
  if (to.meta.description) {
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", to.meta.description as string);
    }
  }

  next();
});

export default router;
