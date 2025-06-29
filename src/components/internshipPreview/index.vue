<template>
    <div class="internship-preview">
        <h4 class="preview-text">实习经历</h4>
        <a-divider class="custom-divider" />
        <div class="preview-content" v-for="item in datas" :key="item.id">
            <div class="internship-info">
                <div class="left">
                    <strong>
                        <span class="text-space" v-show="item.company">{{ item.company }}</span>
                    </strong>
                    <strong>
                        <span class="text-space" v-show="item.position">{{ item.position }}</span>
                    </strong>
                    <strong>
                        <!-- 最后一个不需要右边距 -->
                        <span v-show="item.place">{{ item.place }}</span>
                    </strong>
                </div>
                <div class="right">
                    <strong>
                        <span>{{ item.startDate }} - {{ item.endDate }}</span>
                    </strong>
                </div>
            </div>
            <div class="internship-description" v-html="renderMarkdown(item.description)"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useResumeStore } from "@/store";
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

        .text-space {
            margin-right: 20px;
            font-size: 15px;
        }

        .right {
            font-size: 15px;
        }
    }

    :deep(.internship-description) {
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
