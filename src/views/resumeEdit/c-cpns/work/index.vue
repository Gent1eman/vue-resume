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
    </div>
</template>

<script lang="ts" setup>
import { RiseOutlined } from "@ant-design/icons-vue";
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
}
</style>
