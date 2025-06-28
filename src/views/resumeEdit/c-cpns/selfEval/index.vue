<template>
    <div class="self-eval">
        <div>
            <div class="title">
                <profile-outlined :style="{ color: '#1890ff', fontSize: '19px' }" />
                <span class="title-text">个人评价</span>
            </div>
            <!-- 提示文字 -->
            <p class="hint-text">请简要描述您的个人特点、职业目标和核心竞争力，突出您的优势和特长，支持Markdown格式</p>
        </div>
        <a-divider />
        <div class="content">
            <markdown-preview :content="htmlContent" :previewTitle />
            <markdown-editor
                @htmlChanged="handleHtmlChanged"
                :editorDefaultContent
                :content="localSelfEval"
                @update:content="(val: string) => (localSelfEval = val)"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ProfileOutlined } from "@ant-design/icons-vue";
import { useResumeStore } from "@/store/useResumeStore";
import MarkdownEditor from "@/components/markdown-editor/index.vue";
import MarkdownPreview from "@/components/markdown-preview/index.vue";
import { computed, ref } from "vue";

const editorDefaultContent = {
    title: "编辑个人评价",
    placeholder: `* 有快速学习的能力
* 对目前的工作有极大的兴趣
    `
};
const previewTitle: string = "个人评价预览";

const htmlContent = ref("");

const resumeStore = useResumeStore();
const localSelfEval = computed({ get: () => resumeStore.selfEval, set: val => resumeStore.updateSelftEval(val) });

const handleHtmlChanged = (html: string) => {
    htmlContent.value = html;
};
</script>

<style scoped lang="scss">
.self-eval {
    .title {
        display: flex;
        /* 垂直居中 */
        align-items: center;

        .title-text {
            font-size: 20px;
            font-weight: 600;
            margin-left: 8px;
        }
    }

    .hint-text {
        margin-top: 10px;
        color: #757575;
    }
}
</style>
