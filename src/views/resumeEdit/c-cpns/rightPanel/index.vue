<template>
    <div class="right-panel">
        <a-card title="简历预览" :bodyStyle="{ height: 'calc(100vh - 185px)', overflow: 'auto' }">
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

<style scoped lang="scss">
.right-panel {
    /* 修改功能栏的布局 */
    .custom-actions {
        display: flex;
        justify-content: flex-end;
        padding: 0 16px;
    }
}
</style>
