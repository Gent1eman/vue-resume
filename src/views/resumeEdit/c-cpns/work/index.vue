<template>
    <div class="work">
        <div>
            <div class="title">
                <rise-outlined :style="{ color: '#1890ff', fontSize: '19px' }" />
                <span class="title-text">工作经历</span>
            </div>
            <!-- 提示文字 -->
            <p class="hint-text">请填写您的工作经历，包括公司、职位和工作职责，按时间倒序排序</p>
        </div>
        <a-divider />
        <div class="content">
            <a-space direction="vertical" :size="16" style="width: 100%">
                <work-info v-for="(j, index) of count" :key="index" />
            </a-space>
            <a-button type="dashed" :icon="h(PlusOutlined)" class="btn" @click="handleClick">添加工作经历</a-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { RiseOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { h, ref } from "vue";
import WorkInfo from "@/components/workInfo/index.vue";

const count = ref(1);

const handleClick = () => {
    count.value += 1;
};
</script>

<style scoped lang="scss">
.work {
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
