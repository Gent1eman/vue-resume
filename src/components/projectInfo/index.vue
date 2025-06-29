<template>
    <div class="project-info">
        <a-card :title="`项目经历#${idx}`">
            <template #extra>
                <a-button type="text" :icon="h(DeleteOutlined)" danger @click="removeProject" />
            </template>
            <a-form layout="vertical" v-model:value="localProject">
                <a-row :gutter="[24, 64]">
                    <a-col :span="12">
                        <a-form-item label="项目名称" required>
                            <a-input placeholder="例如：企业官网重构" v-model:value="localProject.projectName">
                                <!-- 插槽 -->
                                <template #prefix>
                                    <appstore-outlined :style="{ color: '#9CA3AF', fontSize: '16px' }" />
                                </template>
                            </a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="担任角色" required>
                            <a-input placeholder="例如：前端开发工程师" v-model:value="localProject.role">
                                <!-- 插槽 -->
                                <template #prefix>
                                    <team-outlined :style="{ color: '#9CA3AF', fontSize: '16px' }" />
                                </template>
                            </a-input>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="[24, 64]">
                    <a-col :span="24">
                        <a-form-item label="项目时间" required>
                            <a-config-provider :locale="zhCN">
                                <a-range-picker
                                    style="width: 100%"
                                    format="YYYY-MM"
                                    picker="month"
                                    :placeholder="['开始时间', '结束时间（未结束可不选）']"
                                    v-model:value="dateRange"
                                    @change="handleDateChange"
                                />
                            </a-config-provider>
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row :gutter="[24, 64]">
                    <a-col :span="24">
                        <a-form-item label="项目描述" required>
                            <markdown-editor
                                :isDisplayTitle="false"
                                style="margin-top: 0px"
                                :editorDefaultContent
                                :content="localProject.description"
                                @update:content="val => (localProject.description = val)"
                            />
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import { computed, h } from "vue";
import { DeleteOutlined, AppstoreOutlined, TeamOutlined } from "@ant-design/icons-vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import MarkdownEditor from "@/components/markdown-editor/index.vue";
import { useResumeStore } from "@/store";
import dayjs, { Dayjs } from "dayjs";
import { message } from "ant-design-vue";

// 编辑器的默认值
const editorDefaultContent = {
    placeholder: `实现了论坛系统，功能包含XXX、XXX

**核心功能具体实现**：

1. 通过对登录用户颁发登录凭证`
};

const props = defineProps<{ idx: number; id: number }>();

const resumeStore = useResumeStore();
const localProject = computed(() => {
    const index = resumeStore.projects.findIndex(project => project.id === props.id);
    return resumeStore.projects[index];
});

const dateRange = computed(() => [
    localProject.value.startDate ? dayjs(localProject.value.startDate) : null,
    localProject.value.endDate ? dayjs(localProject.value.endDate) : null
]);

const handleDateChange = (dates: [Dayjs | null, Dayjs | null]) => {
    if (!localProject.value) return;

    localProject.value.startDate = dates[0]?.format("YYYY-MM") || "";
    localProject.value.endDate = dates[1]?.format("YYYY-MM") || "";
};

// 删除项目经历
const removeProject = () => {
    resumeStore.deleteProject(props.id);
    message.success("项目经历删除成功！");
};
</script>

<style scoped>
.project-info {
    color: red;
}
</style>
