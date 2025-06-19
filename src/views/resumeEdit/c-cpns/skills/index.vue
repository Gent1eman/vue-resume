<template>
    <div class="skills">
        <div>
            <div class="title">
                <code-outlined :style="{ color: '#1890ff', fontSize: '19px' }" />
                <span class="title-text">专业技能</span>
            </div>
            <!-- 提示文字 -->
            <p class="hint-text">请填写您的专业技能，支持Markdown格式，以清晰的方式展示您的专业能力</p>
        </div>
        <a-divider />
    </div>
</template>

<script lang="ts" setup>
import { CodeOutlined } from "@ant-design/icons-vue";
</script>

<style scoped lang="scss">
.skills {
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
