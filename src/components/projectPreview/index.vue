<template>
    <div class="project-preview">
        <span class="preview-text">项目经历</span>
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
import { computed } from "vue";
const resumeStore = useResumeStore();
marked.use({ async: false });
const datas = computed(() => resumeStore.projects);

// const renderMarkdown = (text: string) => DOMPurify.sanitize(marked.parse(text) as string);
const renderMarkdown = (text: string | null | undefined) => {
    if (!text) return ""; // 处理 null/undefined
    return DOMPurify.sanitize(marked.parse(text) as string);
};
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

    .preview-content {
        margin-bottom: 10px;
        &:last-child {
            margin-bottom: 0; // 最后一个元素取消margin-bottom
        }
    }

    :deep(.project-description) {
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
