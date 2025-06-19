<template>
    <div class="internships">
        <div>
            <div class="title">
                <solution-outlined :style="{ color: '#1890ff', fontSize: '19px' }" />
                <span class="title-text">实习经历</span>
            </div>
            <!-- 提示文字 -->
            <p class="hint-text">请填写您的实习经历，包括公司、职位和工作内容，按时间倒序排列</p>
        </div>
        <a-divider />
    </div>
</template>

<script lang="ts" setup>
import { SolutionOutlined } from "@ant-design/icons-vue";
</script>

<style scoped lang="scss">
.internships {
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
