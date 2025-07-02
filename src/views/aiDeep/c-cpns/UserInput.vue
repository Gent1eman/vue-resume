<template>
    <div class="user-input">
        <div class="input-section">
            <div class="input-header">岗位描述<span style="font-size: 12px; color: #929292">（岗位要求）</span></div>
            <a-textarea v-model:value="jd" placeholder="请输入岗位描述..." class="custom-textarea" />
        </div>

        <!-- 选择框  用户可以选择一段经历来进行问答 -->
        <div class="select-section">
            <div class="input-header">选择经历<span style="font-size: 12px; color: #929292">（选择一段经历拷打）</span></div>
            <a-select
                v-model:value="selectedExperience"
                placeholder="请选择经历"
                :options="experienceOptions"
                @change="handleExperienceChange"
                style="width: 100%"
            ></a-select>
        </div>

        <div class="input-section" id="input-value">
            <div class="input-header">经历<span style="font-size: 12px; color: #929292">（建议一次深挖一段经历即可）</span></div>
            <a-textarea class="custom-textarea" v-model:value="resumeProject" placeholder="请输入项目/实习/工作经历..."></a-textarea>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useResumeStore } from "@/store";
import { inject, ref, toRef, type Ref } from "vue";
const resume = toRef(useResumeStore());

interface ExperienceOption {
    label: string;
    value: string;
}
// 构建经历的选项
const experienceOptions: ExperienceOption[] = [];
const selectedExperience = ref<string>();

// 项目经历
resume.value.projects.forEach(item =>
    experienceOptions.push({
        label: "项目: " + item.projectName,
        value: "项目简介：\n" + item.description
    })
);

// 工作经历
resume.value.workExperience.forEach(item =>
    experienceOptions.push({
        label: "工作: " + item.company,
        value: "公司名称：" + item.company + "\n职位：" + item.position + "\n工作内容：\n" + item.description
    })
);

// 接收父组件传递的值
//  Ref<string>（一个响应式的字符串引用）
const jd = inject<Ref<string>>("jd");
const resumeProject = inject<Ref<string>>("resumeProject");
// 修改下拉框事件
const handleExperienceChange = (value: string) => {
    if (resumeProject) {
        resumeProject.value = value;
    }
};
</script>

<style scoped lang="scss">
.user-input {
    padding: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;

    .input-section {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 8px;
        min-height: 0;
    }

    .input-header {
        font-size: 15px;
        font-weight: 500;
        padding: 0 4px;
    }

    .select-section {
        display: flex;
        flex-direction: column;
        gap: 8px;
        min-height: 0;
    }

    :deep(.custom-textarea) {
        flex: 1;
        display: flex;
        border: 1px solid #d4d4d4bb;
        border-radius: 8px;
        transition: all 0.3s;
    }

    :deep(.custom-textarea:hover) {
        border-color: #1677ff;
    }

    :deep(.custom-textarea:focus) {
        border-color: #1677ff;
        box-shadow: 0 0 0 2px rgba(#1677ff, 0.1);
    }
}

:deep(.ant-input) {
    font-size: 14px;
    line-height: 1.6;
    resize: none;
    overflow-y: auto;
    height: 100% !important;
    min-height: unset !important;
}

:deep(.ant-input::placeholder) {
    color: #bfbfbf;
}

:deep(.ant-input::-webkit-scrollbar) {
    width: 3px;
}

:deep(.ant-input::-webkit-scrollbar-track) {
    background: transparent;
}

:deep(.ant-input::-webkit-scrollbar-thumb) {
    background: #b8b8b8;
    border-radius: 2px;
}

:deep(.ant-input::-webkit-scrollbar-thumb:hover) {
    background: #b8b8b8;
}
</style>
