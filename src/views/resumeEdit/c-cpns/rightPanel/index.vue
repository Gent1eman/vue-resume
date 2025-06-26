<template>
    <div class="right-panel">
        <a-card title="简历预览" :bodyStyle="{ height: 'calc(100vh - 185px)', overflow: 'auto' }">
            <div class="preview-wrapper">
                <Preview />
            </div>
            <template #actions>
                <div class="custom-actions">
                    <a-button type="primary" :icon="h(ExportOutlined)">导出PDF</a-button>
                </div>
            </template>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import { h } from "vue";
import { ExportOutlined } from "@ant-design/icons-vue";
import Preview from "@/views/resumeEdit/c-cpns/preview/index.vue";
</script>

<style scoped lang="scss">
.right-panel {
    /* 修改功能栏的布局 */
    .custom-actions {
        display: flex;
        justify-content: flex-end;
        padding: 0 16px;
    }

    .preview-wrapper {
        padding: 20px;
        min-height: 600px;
        overflow: hidden;
        width: 100%;
        background-color: #ffffff;
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
    }
}
</style>
