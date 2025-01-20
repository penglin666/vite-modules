<script setup>
const list = reactive([
  {
    path: "manage",
    name: "系统管理",
  },
  {
    path: "screen",
    name: "大屏",
  },
  {
    path: "auth",
    name: "权限管理",
  },
]);
const go = ({ path }) => {
  const protocol = window.location.protocol;
  const host = window.location.hostname; // 获取路径
  const port = window.location.port; // 获取端口号
  const address = `${protocol}//${host}:${port}/${path}/`;
  window.location.replace(address);
};
</script>

<template>
  <div class="list">
    <div
      class="list-item"
      v-for="(item, index) in list"
      :key="index"
      @click="go(item)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<style scoped></style>
