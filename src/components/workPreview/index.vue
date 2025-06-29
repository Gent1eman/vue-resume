<template>
    <div class="work-preview">
        <h4 class="preview-text">工作经历</h4>
        <a-divider class="custom-divider" />
        <div class="preview-content" v-for="item in datas" :key="item.id">
            <div class="work-info">
                <div class="left">
                    <strong>
                        <span class="text-space" v-show="item.company">{{ item.company }}</span>
                    </strong>

                    <strong>
                        <span class="text-space" v-show="item.position">{{ item.position }}</span>
                    </strong>

                    <strong>
                        <span class="text-space" v-show="item.department">{{ item.department }} </span>
                    </strong>

                    <strong>
                        <span class="text-space" v-show="item.place">{{ item.place }}</span>
                    </strong>

                    <strong>
                        <!-- 最后一个不用加右边距 -->
                        <span class="text-space" v-show="item.workType">{{ item.workType }}</span>
                    </strong>
                </div>
                <div class="right">
                    <strong>
                        <span>{{ item.startDate }} - {{ item.endDate }}</span>
                    </strong>
                </div>
            </div>
            <div class="work-description" v-html="renderMarkdown(item.description)"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useResumeStore } from "@/store";
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

        .text-space {
            font-size: 15px;
            margin-right: 20px;
        }

        .right {
            font-size: 15px;
        }
    }

    :deep(.work-description) {
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
