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
    </div>
</template>

<script lang="ts" setup>
import { ProfileOutlined } from "@ant-design/icons-vue";
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
