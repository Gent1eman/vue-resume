<template>
    <div class="project-preview">
        <h4 class="preview-text">项目经历</h4>
        <a-divider class="custom-divider" />
        <div class="preview-content" v-for="item in datas" :key="item.id">
            <div class="project-info">
                <div class="left">
                    <strong>
                        <span class="text-space" v-show="item.projectName">{{ item.projectName }}</span>
                    </strong>
                    <strong>
                        <!-- 最后一个不需要右边距 -->
                        <span v-show="item.role">{{ item.role }}</span>
                    </strong>
                </div>
                <div class="right">
                    <strong>
                        <span>{{ item.startDate }} - {{ item.endDate }}</span>
                    </strong>
                </div>
            </div>
            <div class="project-description" v-html="renderMarkdown(item.description)"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useResumeStore } from "@/store";
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

        .text-space {
            font-size: 15px;
            margin-right: 20px;
        }

        .right {
            font-size: 15px;
        }
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
