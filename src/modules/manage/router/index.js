import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "../layout/index.vue";
import allRoutes from "./routes";
import { useTagStore } from "../stores/modules/tag";
const routes = [
  {
    path: "/",
    component: Layout,
    redirect: { name: "home" },
    children: [
      ...allRoutes,
      // {
      //   path: "/home",
      //   name: "home",
      //   meta: { title: "首页" },
      //   component: () => import("../pages/home/index.vue"),
      // },
      // {
      //   path: "/about",
      //   name: "about",
      //   meta: { title: "关于" },
      //   children: [
      //     {
      //       path: "about1",
      //       name: "about1",
      //       meta: { title: "关于1" },
      //       component: () => import("../pages/about/index1.vue"),
      //       children: [
      //         {
      //           path: "about1-1",
      //           name: "about1-1",
      //           meta: { title: "关于1-1" },
      //           component: () => import("../pages/about/index1.vue"),
      //         },
      //       ],
      //     },
      //     {
      //       path: "about2",
      //       name: "about2",
      //       meta: { title: "关于2" },
      //       component: () => import("../pages/about/index2.vue"),
      //     },
      //     {
      //       path: "about3",
      //       name: "about3",
      //       meta: { title: "关于3" },
      //       component: () => import("../pages/about/index3.vue"),
      //     },
      //   ],
      // },
      // {
      //   path: "/setting",
      //   name: "setting",
      //   meta: { title: "设置" },
      //   component: () => import("../pages/setting/index.vue"),
      //   children: [
      //     {
      //       path: "detail",
      //       name: "detail",
      //       meta: { title: "详情页" },
      //       component: () => import("../pages/setting/detail.vue"),
      //     },
      //   ],
      // },
    ],
  },
  {
    path: "/:pathMatch(.*)",
    name: "404",
    meta: { title: "页面不存在" },
    component: () => import("../pages/404.vue"),
  },
];
console.log(allRoutes, "allroutes");
console.log(routes, "routes");
const router = createRouter({
  history: createWebHashHistory(), //可传参数，配置base路径，例如'/app'
  routes,
});
// router.afterEach((to, from, failure) => {
//   const tagStore = useTagStore();
//   const whiteNameList = ["login", "404"];
//   if (!whiteNameList.includes(to.name)) {
//     tagStore.add({
//       key: to.path,
//       label: to.meta.title,
//       closable: to.path !== "/home",
//     });
//   }
//   document.title = to.meta.title;
//   // NProgress.done();
// });
export default router;
