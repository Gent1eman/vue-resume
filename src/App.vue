<template>
    <div class="app">
        <!-- router-view 用于占位 -->
        <router-view></router-view>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useResumeStore } from "./store";

// 页面加载时初始化
onMounted(async () => {
    const resumeStore = useResumeStore();
    // 初始化数据
    await resumeStore.initCheck();
});
</script>

<style scoped>
.app {
    /* background-color: skyblue; */
    /* vw和vh是视口单位，视口就是屏幕大小 */
    width: 100vw;
    height: 100vh;
    background-color: #f9fafb;
}
</style>
