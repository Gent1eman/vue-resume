<template>
    <div class="general-preview">
        <span class="preview-text">{{ title }}</span>
        <a-divider class="custom-divider" />
        <div class="preview-content" v-html="htmlContent"></div>
    </div>
</template>

<script lang="ts" setup>
import { marked } from "marked";
import { computed } from "vue";
import DOMPurify from "dompurify";
const props = defineProps<{
    title: string;
    content: string;
}>();

// const htmlContent = computed(() => {
//     return marked.parse(props.content || "");
// });
// 配置 marked 使用同步解析
marked.use({ async: false });
const htmlContent = computed(() => {
    if (typeof props.content !== "string") return ""; // 确保是字符串
    return DOMPurify.sanitize(marked.parse(props.content) as string);
});
</script>

<style scoped lang="scss">
.general-preview {
    margin-bottom: var(--module-space);
    .preview-text {
        color: var(--color-theme);
        font-size: 16px;
        font-weight: 700;
    }

    .custom-divider {
        background-color: var(--color-theme);
        margin-top: 4px;
        margin-bottom: 8px;
    }

    :deep(.preview-content) {
        ul {
            margin-left: 20px;
        }
        ol {
            margin-left: 16px;
            li {
                padding-left: 4px;
            }
        }
    }
}
</style>
