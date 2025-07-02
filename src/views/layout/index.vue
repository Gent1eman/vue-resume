<template>
    <div class="layout">
        <div>
            <Header />
        </div>

        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Header from "@/components/Header/index.vue";
</script>

<style scoped lang="scss">
.layout {
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #f9fafb;

    > div:first-child {
        /* Header 容器 */
        /* 不伸缩 */
        flex-shrink: 0;
    }
    .container {
        flex: 1;
        padding: 16px;
        overflow: hidden;
    }
}
</style>
