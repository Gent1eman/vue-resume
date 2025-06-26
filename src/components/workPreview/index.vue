<template>
    <div class="work-preview">
        <h4 class="preview-text">工作经历</h4>
        <a-divider class="custom-divider" />
        <div class="preview-content" v-for="item in datas" :key="item.id">
            <div class="work-info">
                <div class="left">
                    <a-space>
                        <span>{{ item.company }}</span>
                        <span>{{ item.position }}</span>
                        <span>（{{ item.department }} ）</span>
                        <span>{{ item.plcae }}</span>
                        <span>{{ item.workType }}</span>
                    </a-space>
                </div>
                <div class="right">
                    <span>{{ item.startDate }} - {{ item.endDate }}</span>
                </div>
            </div>
            <div class="work-description" v-html="renderMarkdown(item.description)"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useResumeStore } from "@/store/useResumeStore";
import { marked } from "marked";
import DOMPurify from "dompurify";
const resumeStore = useResumeStore();
const datas = resumeStore.workExperience;

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

    .work-info {
        display: flex;
        justify-content: space-between;
    }

    :deep(.work-description) {
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
