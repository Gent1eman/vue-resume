<template>
    <div class="certificates">
        <div>
            <div class="title">
                <SafetyCertificateOutlined :style="{ color: '#1890ff', fontSize: '19px' }" />
                <span class="title-text">证书信息</span>
            </div>
            <!-- 提示文字 -->
            <p class="hint-text">请填写您的证书信息，包括证书名称、获得时间和证书级别，支持Markdown格式</p>
        </div>
        <a-divider />
        <div class="content">
            <markdown-preview :content="htmlContent" :previewTitle />
            <markdown-editor
                @htmlChanged="handleHtmlChanged"
                :editorDefaultContent
                :content="localCertificates"
                @update:content="(val: string) => (localCertificates = val)"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { SafetyCertificateOutlined } from "@ant-design/icons-vue";
import { useResumeStore } from "@/store";
import MarkdownEditor from "@/components/markdown-editor/index.vue";
import MarkdownPreview from "@/components/markdown-preview/index.vue";
import { computed, ref } from "vue";

const editorDefaultContent = {
    title: "编辑证书信息",
    placeholder: "* 获得**XXX**证书"
};

const previewTitle: string = "证书信息预览";

const htmlContent = ref("");

const resumeStore = useResumeStore();
const localCertificates = computed({ get: () => resumeStore.certificates, set: val => resumeStore.updateCertificates(val) });

const handleHtmlChanged = (html: string) => {
    htmlContent.value = html;
};
</script>

<style scoped lang="scss">
.certificates {
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
