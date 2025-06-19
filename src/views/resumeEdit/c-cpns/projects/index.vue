<template>
    <div class="projects">
        <div>
            <div class="title">
                <appstore-outlined :style="{ color: '#1890ff', fontSize: '19px' }" />
                <span class="title-text">项目经历</span>
            </div>
            <!-- 提示文字 -->
            <p class="hint-text">请填写您参与的项目经历，包括项目名称、角色和具体贡献，按时间倒序排列</p>
        </div>
        <a-divider />
    </div>
</template>

<script lang="ts" setup>
import { AppstoreOutlined } from "@ant-design/icons-vue";
</script>

<style scoped lang="scss">
.projects {
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
