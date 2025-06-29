<template>
    <div class="general-preview">
        <h4 class="preview-text">{{ title }}</h4>
        <a-divider class="custom-divider" />
        <div class="preview-content" v-html="htmlContent"></div>
    </div>
</template>

<script lang="ts" setup>
import { marked } from "marked";
import { computed } from "vue";

const props = defineProps<{
    title: string;
    content: string;
}>();

const htmlContent = computed(() => {
    return marked.parse(props.content || "");
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
