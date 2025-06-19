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
    </div>
</template>

<script lang="ts" setup>
import { TrophyOutlined } from "@ant-design/icons-vue";
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
