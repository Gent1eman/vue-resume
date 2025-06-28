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
                <education-info v-for="(edu, index) of educations" :key="edu.id" :id="edu.id" :idx="index + 1" />
            </a-space>
            <a-button type="dashed" :icon="h(PlusOutlined)" class="btn" @click="handleClick">添加教育经历</a-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, h, ref, watch } from "vue";
import { PlusOutlined, BookOutlined } from "@ant-design/icons-vue";
import EducationInfo from "@/components/educationInfo/index.vue";
import { useResumeStore } from "@/store/useResumeStore";

// 获取store实例
const resumeStore = useResumeStore();
const educations = computed(() => resumeStore.education);

// 父组件中已存在的监听
// watch(
//     () => resumeStore.$state,
//     () => {
//         resumeStore.saveToLocalStorage(); // 自动触发保存
//     },
//     { deep: true }
// );
const count = ref(1);

const handleClick = () => {
    count.value += 1;
};

// 删除教育经历
const handleDeleteEducation = (id: number) => {
    resumeStore.deleteEducation(id);
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
