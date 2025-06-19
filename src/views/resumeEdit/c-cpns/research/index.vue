<template>
    <div class="research">
        <div>
            <div class="title">
                <experiment-outlined :style="{ color: '#1890ff', fontSize: '19px' }" />
                <span class="title-text">科研成果</span>
            </div>
            <!-- 提示文字 -->
            <p class="hint-text">请详细描述您的科研成果，包括发表的论文、专利、研究报告等，支持 Markdown 格式</p>
        </div>
        <a-divider />
    </div>
</template>

<script lang="ts" setup>
import { ExperimentOutlined } from "@ant-design/icons-vue";
</script>

<style scoped lang="scss">
.research {
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
