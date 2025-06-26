<template>
    <markdown-preview :content="htmlContent" :previewTitle />
    <markdown-editor v-model="text" @htmlChanged="handleHtmlChanged" :editorDefaultContent />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import MarkdownEditor from "../markdown-editor/index.vue";
import MarkdownPreview from "../markdown-preview/index.vue";


const props = withDefaults(
    defineProps<{
        editorDefaultContent?: { [key: string]: string };
        previewTitle?: string;
    }>(),
    {
        editorDefaultContent: () => ({
            title: "内容编辑",
            placeholder: ""
        }),
        previewTitle: "编辑预览"
    }
);

const text = ref("");
const htmlContent = ref("");

const handleHtmlChanged = (html: string) => {
    htmlContent.value = html;
};
</script>

<style scoped></style>
