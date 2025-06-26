<template>
    <div class="project-preview">
        <h4 class="preview-text">项目经历</h4>
        <a-divider class="custom-divider" />
        <div class="preview-content" v-for="item in datas" :key="item.id">
            <div class="project-info">
                <div class="left">
                    <a-space>
                        <span>{{ item.projectName }}</span>
                        <span>{{ item.role }}</span>
                    </a-space>
                </div>
                <div class="right">
                    <span>{{ item.startDate }} - {{ item.endDate }}</span>
                </div>
            </div>
            <div class="project-description" v-html="renderMarkdown(item.description)"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useResumeStore } from "@/store/useResumeStore";
import { marked } from "marked";
import DOMPurify from "dompurify";
const resumeStore = useResumeStore();
const datas = resumeStore.projects;

const renderMarkdown = (text: string) => DOMPurify.sanitize(marked.parse(text) as string);
</script>

<style scoped lang="scss">
.project-preview {
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

    .project-info {
        display: flex;
        justify-content: space-between;
    }

    :deep(.project-description) {
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
