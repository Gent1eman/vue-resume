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
        <div class="content">
            <a-space direction="vertical" :size="16" style="width: 100%">
                <internship-info v-for="(internship, index) of internships" :key="internship.id" :idx="index + 1" :id="internship.id" />
            </a-space>
            <a-button type="dashed" :icon="h(PlusOutlined)" class="btn" @click="handleClick">添加实习经历</a-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { SolutionOutlined, PlusOutlined } from "@ant-design/icons-vue";
import InternshipInfo from "@/components/internshipInfo/index.vue";
import { useResumeStore } from "@/store/useResumeStore";
import { ref, h, computed } from "vue";

const resumeStore = useResumeStore();
const internships = computed(() => resumeStore.internships);

const count = ref(1);

const handleClick = () => {
    count.value += 1;
};
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

    .btn {
        margin-top: 20px;
        width: 100%;
    }
}
</style>
