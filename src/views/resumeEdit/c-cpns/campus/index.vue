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
            <!-- <markdown-editor /> -->
            <EditorPreview :editorDefaultContent :previewTitle />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { TeamOutlined } from "@ant-design/icons-vue";
import EditorPreview from "@/components/editor-preview/index.vue";

const editorDefaultContent = {
    title: "编辑校园经历"
};
const previewTitle:string = "校园经历预览";
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
