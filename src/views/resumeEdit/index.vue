<template>
    <div class="content-wrapper">
        <!-- 左侧简历内容编辑组件 -->
        <div class="left">
            <left-panel />
        </div>

        <!-- 右侧简历展示组件 -->
        <div class="right">
            <right-panel />
        </div>
    </div>
</template>

<script lang="ts" setup>
import leftPanel from "./c-cpns/leftPanel/index.vue";
import rightPanel from "./c-cpns/rightPanel/index.vue";
</script>

<style scoped lang="scss">
.content-wrapper {
    display: flex;
    gap: 10px; /* 替代margin-left */
    box-sizing: border-box;
    overflow: hidden; /* 禁止外层滚动 */

    .left {
        width: 50%;
    }

    .right {
        flex: 1;
    }
}
</style>
