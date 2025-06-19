<template>
    <div class="education">
        <div>
            <div class="title">
                <book-outlined :style="{ color: '#1890ff', fontSize: '19px' }" />
                <span class="title-text">教育背景</span>
            </div>
            <!-- 提示文字 -->
            <p class="hint-text">请填写您的教育背景信息，包括学校、专业、学位证，按时间倒序排列</p>
        </div>
        <a-divider />

        <div class="content">
            <a-space direction="vertical" :size="16" style="width: 100%">
                <edu-info v-for="(j, index) of count" :key="index" />
            </a-space>
            <a-button type="dashed" :icon="h(PlusOutlined)" class="btn" @click="handleClick">添加教育经历</a-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { h, ref } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import { BookOutlined } from "@ant-design/icons-vue";
import EduInfo from "./c-cpns/edu-info/index.vue";

const count = ref(1);

const handleClick = () => {
    count.value += 1;
};
</script>

<style scoped lang="scss">
.education {
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

    .btn {
        margin-top: 20px;
        width: 100%;
    }
}
</style>
