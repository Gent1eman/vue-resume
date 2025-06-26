<template>
    <div class="work-preview">
        <h4 class="preview-text">教育背景</h4>
        <a-divider class="custom-divider" />
        <div class="preview-content" v-for="item in datas" :key="item.id">
            <div class="edu-info">
                <div class="left">
                    <a-space>
                        <strong>
                            <span>{{ item.school }}</span>
                        </strong>

                        <strong>
                            <span>{{ item.major }}</span></strong
                        >
                        <strong>
                            <span>{{ item.degree }}</span></strong
                        >
                    </a-space>
                </div>
                <div class="right">
                    <span>{{ item.startDate }} - {{ item.endDate }}</span>
                </div>
            </div>
            <div class="edu-description" v-html="renderMarkdown(item.description)"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useResumeStore } from "@/store/useResumeStore";
import { marked } from "marked";
import DOMPurify from "dompurify";
const resumeStore = useResumeStore();
const datas = resumeStore.education;

const renderMarkdown = (text: string) => DOMPurify.sanitize(marked.parse(text) as string);
</script>

<style scoped lang="scss">
.work-preview {
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

    .edu-info {
        display: flex;
        justify-content: space-between;
    }

    :deep(.edu-description) {
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
}
</style>
