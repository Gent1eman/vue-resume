<template>
    <div class="app">
        <!-- router-view 用于占位 -->
        <router-view></router-view>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.app {
    /* background-color: skyblue; */
    /* vw和vh是视口单位，视口就是屏幕大小 */
    width: 100vw;
    height: 100vh;
    background-color: #f9fafb;
}
</style>
