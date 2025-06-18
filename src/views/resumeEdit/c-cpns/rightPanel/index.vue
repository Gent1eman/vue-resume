<template>
    <div class="right-panel">
        <a-card title="简历预览" class="card-wrapper" :bodyStyle="{ height: '87%' }">
            <p class="test">card content</p>
            <p class="test">card content</p>
            <p class="test">card content</p>

            <template #actions>
                <div class="custom-actions">
                    <a-button type="primary" :icon="h(ExportOutlined)">导出</a-button>
                </div>
            </template>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import { h } from "vue";
import { ExportOutlined } from "@ant-design/icons-vue";
</script>

<style scoped>
.right-panel {
    height: 100%;

    .card-wrapper {
        height: 100%;
    }

    /* 修改功能栏的布局 */
    .custom-actions {
        display: flex;
        justify-content: flex-end;
        padding: 0 16px;
    }
}
</style>
