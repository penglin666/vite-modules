const DEVICE = [
  {
    path: "/device",
    name: "device",
    meta: {
      title: "设备管理",
    },
    children: [
      {
        path: "rent",
        name: "rent",
        meta: {
          title: "借出管理",
        },
        component: () => import("../../../pages/device/rent.vue"),
      },
      {
        path: "manage",
        name: "manage",
        meta: {
          title: "关于项目",
        },
        component: () => import("../../../pages/device/manage.vue"),
      },
    ],
  },
];
export default DEVICE;
