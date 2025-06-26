<template>
    <div class="internship-preview">
        <h4 class="preview-text">实习经历</h4>
        <a-divider class="custom-divider" />
        <div class="preview-content" v-for="item in datas" :key="item.id">
            <div class="internship-info">
                <div class="left">
                    <a-space>
                        <span>{{ item.company }}</span>
                        <span>{{ item.position }}</span>
                        <span>{{ item.plcae }}</span>
                        <span>{{ item.plcae }}</span>
                    </a-space>
                </div>
                <div class="right">
                    <span>{{ item.startDate }} - {{ item.endDate }}</span>
                </div>
            </div>
            <div class="internship-description" v-html="renderMarkdown(item.description)"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useResumeStore } from "@/store/useResumeStore";
import { marked } from "marked";
import DOMPurify from "dompurify";
const resumeStore = useResumeStore();
const datas = resumeStore.internships;

const renderMarkdown = (text: string) => DOMPurify.sanitize(marked.parse(text) as string);
</script>

<style scoped lang="scss">
.internship-preview {
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

    .internship-info {
        display: flex;
        justify-content: space-between;
    }

    :deep(.internship-description) {
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
