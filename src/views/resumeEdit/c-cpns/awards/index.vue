<template>
    <div class="awards">
        <div>
            <div class="title">
                <trophy-outlined :style="{ color: '#1890ff', fontSize: '19px' }" />
                <span class="title-text">获奖经历</span>
            </div>
            <!-- 提示文字 -->
            <p class="hint-text">请填写您的获奖经历，包括奖项名称、获奖时间和获奖级别</p>
        </div>
        <a-divider />

        <div class="content">
            <!-- <markdown-editor /> -->
            <EditorPreview :editorDefaultContent :previewTitle />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { TrophyOutlined } from "@ant-design/icons-vue";
import EditorPreview from "@/components/editor-preview/index.vue";

const editorDefaultContent = {
    title: "编辑获奖经历",
    placeholder: `* 蓝桥杯一等奖
* 全国劳模`
};
const previewTitle:string = "获奖经历预览";
</script>

<style scoped lang="scss">
.awards {
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
