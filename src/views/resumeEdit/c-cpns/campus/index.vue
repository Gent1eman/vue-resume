<template>
    <div class="campus">
        <div>
            <div class="title">
                <team-outlined :style="{ color: '#1890ff', fontSize: '19px' }" />
                <span class="title-text">校园经历</span>
            </div>
            <!-- 提示文字 -->
            <p class="hint-text">请填写您的校园经历，包括社团活动、学生工作等，支持Markdown格式</p>
        </div>
        <a-divider />
        <div class="content">
            <markdown-preview :content="htmlContent" :previewTitle />
            <markdown-editor
                @htmlChanged="handleHtmlChanged"
                :editorDefaultContent
                :content="localCampus"
                @update:content="(val: string) => (localCampus = val)"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { TeamOutlined } from "@ant-design/icons-vue";
import { useResumeStore } from "@/store/useResumeStore";
import MarkdownEditor from "@/components/markdown-editor/index.vue";
import MarkdownPreview from "@/components/markdown-preview/index.vue";
import { computed, ref } from "vue";

const editorDefaultContent = {
    title: "编辑校园经历"
};
const previewTitle: string = "校园经历预览";

const htmlContent = ref("");

const resumeStore = useResumeStore();
const localCampus = computed({ get: () => resumeStore.campus, set: val => resumeStore.updateCampus(val) });

const handleHtmlChanged = (html: string) => {
    htmlContent.value = html;
};
</script>

<style scoped lang="scss">
.campus {
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
