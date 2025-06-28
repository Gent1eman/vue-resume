<template>
    <a-card size="small" style="width: 100%; background-color: #fafbff">
        <div>
            <div class="preview-title">
                <strong>
                    <a-space>
                        <StarOutlined style="color: #1677ff" />
                        <span class="preview-title-text">{{ previewTitle }}</span>
                    </a-space>
                </strong>
            </div>
            <div class="preview-wrapper">
                <div class="preview-content" v-html="content || '尚未填写内容'"></div>
            </div>
        </div>
    </a-card>
</template>

<script lang="ts" setup>
import { StarOutlined } from "@ant-design/icons-vue";

const props = defineProps<{
    content?: string; // 接收父组件传入的HTML内容
    previewTitle?: string;
}>();
</script>

<style scoped>
.preview-title {
    margin-bottom: 10px;

    .preview-title-text {
        font-size: 15px;
        color: #1677ff;
    }
}

.preview-wrapper {
    background-color: #fff;
    padding: 10px 10px;
    border-radius: 5px;
}

/* :deep(.preview-content) ul {
    margin: 0;
    padding: 0 4px;
    list-style-position: inside;
}

:deep(.preview-content) ol {
    margin: 0;
    padding: 0 3px;
    list-style-position: inside;
}

:deep(.preview-content) li {
    text-indent: -0.5em;
    padding-left: 1em;
} */

:deep(.preview-content) {
    ul {
        margin: 0 20px;
    }
    ol {
        margin: 0 16px;
        li {
            padding-left: 4px;
        }
    }
}
</style>
