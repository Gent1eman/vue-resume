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
        <div class="content">
            <a-space direction="vertical" :size="16" style="width: 100%">
                <project-info v-for="(project, index) of projects" :key="project.id" :idx="index + 1" :id="project.id" />
            </a-space>
            <a-button type="dashed" :icon="h(PlusOutlined)" class="btn" @click="handleClick">添加项目经历</a-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { AppstoreOutlined, PlusOutlined } from "@ant-design/icons-vue";
import ProjectInfo from "@/components/projectInfo/index.vue";
import { useResumeStore } from "@/store";
import { ref, h, computed } from "vue";

const resumeStore = useResumeStore();
const projects = computed(() => resumeStore.projects);
const count = ref(1);

const handleClick = () => {
    count.value += 1;
};
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

    .btn {
        margin-top: 20px;
        width: 100%;
    }
}
</style>
