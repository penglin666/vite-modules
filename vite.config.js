import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import { viteMockServe } from "vite-plugin-mock";
// 引入多页面配置文件
const project = require("./modules.json");
// 获取应用后缀 配置的环境变量
const npm_config_project = process.env.npm_config_project || "";

let filterProjects = [];
if (npm_config_project) {
  //如果指定了单页面打包，过滤出这个页面的配置项
  filterProjects = project.filter((ele) => {
    return ele.chunk.toLowerCase() === npm_config_project.toLowerCase();
  });
  // console.log(`--------单独构建：${filterProjects[0]['chunkName']}--------`);
} else {
  filterProjects = project;
  // console.log(`--------全部构建：${filterProjects[0]['chunkName']}--------`);
}

const getEntryPath = (p) => {
  const pages = {};
  p.forEach((ele) => {
    const htmlUrl = resolve(__dirname, `src/modules/${ele.chunk}/index.html`);
    pages[ele.chunk] = htmlUrl;
  });
  return pages;
};

// console.log("filterProjects", getEntryPath(filterProjects));

// https://vitejs.dev/config/

const renameHtmlPlugin = () => {
  return {
    name: "rename-index-html",
    enforce: "post",
    generateBundle(_, bundle) {
      for (let key in bundle) {
        const fileExt = bundle[key].fileName.slice(
          bundle[key].fileName.lastIndexOf(".")
        );
        if (fileExt.toLocaleLowerCase() === ".html") {
          if (key.includes("index")) {
            const fileNameWithExtArr = bundle[key].fileName.split(".");
            fileNameWithExtArr.pop();
            const fileNameArr = fileNameWithExtArr.join().split("/");
            fileNameArr.pop();
            bundle[key].fileName = fileNameArr.join() + fileExt;
          }
        }
      }
    },
  };
};

export default defineConfig({
  root: "./src/modules",
  plugins: [
    vue(),
    renameHtmlPlugin(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
    }),
    AutoImport({
      imports: ["vue", "vue-router", "pinia"],
      eslintrc: {
        enabled: true,
      },
    }),
    viteMockServe({
      mockPath: "./src/mock", //mock文件地址
      enable: process.env.NODE_ENV === "development",
      watchFiles: true,
      logger: true, //是否在控制台显示请求日志
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  // server: {
  //   open: "manage",
  // },
  build: {
    outDir: resolve(__dirname, "dist"), // 指定输出路径
    chunkSizeWarningLimit: 1500,
    sourcemap: false, // 是否生成 source map
    emptyOutDir: true, //Vite 会在构建时清空该目录
    // 打包时清楚console和debugger
    terserOptions: {
      compress: {
        keep_infinity: true,
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      // input: {
      //   auth: resolve(__dirname, "src/modules/auth/index.html"),
      //   manage: resolve(__dirname, "src/modules/manage/index.html"),
      //   platform: resolve(__dirname, "src/modules/platform/index.html"),
      //   screen: resolve(__dirname, "src/modules/screen/index.html"),
      // },
      input: getEntryPath(filterProjects),
      output: {
        compact: true, //压缩代码，删除换行符等
        assetFileNames: "[ext]/[name]-[hash].[ext]", //静态文件输出的文件夹名称
        chunkFileNames: "js/[name]-[hash].js", //chunk包输出的文件夹名称
        entryFileNames: "js/[name]-[hash].js", //入口文件输出的文件夹名称
      },
    },
  },
});
