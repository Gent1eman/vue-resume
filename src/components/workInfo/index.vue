<template>
    <div class="work-info">
        <a-card :title="`工作经历#${idx}`">
            <template #extra>
                <a-button type="text" :icon="h(DeleteOutlined)" danger />
            </template>
            <a-form layout="vertical" v-model:value="localWork">
                <a-row :gutter="[24, 64]">
                    <a-col :span="12">
                        <a-form-item label="公司名称" required>
                            <a-input placeholder="例如：阿里巴巴" v-model:value="localWork.company">
                                <!-- 插槽 -->
                                <template #prefix>
                                    <bank-outlined :style="{ color: '#9CA3AF', fontSize: '16px' }" />
                                </template>
                            </a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="职位" required>
                            <a-input placeholder="例如：前端开发工程师" v-model:value="localWork.position">
                                <!-- 插槽 -->
                                <template #prefix>
                                    <team-outlined :style="{ color: '#9CA3AF', fontSize: '16px' }" />
                                </template>
                            </a-input>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="[24, 64]">
                    <a-col :span="12">
                        <a-form-item label="部门" required>
                            <a-input placeholder="例如：技术部" v-model:value="localWork.department">
                                <!-- 插槽 -->
                                <template #prefix>
                                    <team-outlined :style="{ color: '#9CA3AF', fontSize: '16px' }" />
                                </template>
                            </a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="工作地点">
                            <a-input placeholder="例如：北京" v-model:value="localWork.place">
                                <!-- 插槽 -->
                                <template #prefix>
                                    <environment-outlined :style="{ color: '#9CA3AF', fontSize: '16px' }" />
                                </template>
                            </a-input>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="[24, 64]">
                    <a-col :span="12">
                        <a-form-item label="工作类型" required>
                            <a-select placeholder="请选择" v-model:value="localWork.workType" :options="workTypeOptions" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="工作时间">
                            <a-config-provider :locale="zhCN">
                                <a-range-picker
                                    style="width: 100%"
                                    :placeholder="['开始时间', '结束时间（在职可不选）']"
                                    v-model:value="dateRange"
                                    @change="handleDateChange"
                                />
                            </a-config-provider>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="[24, 64]">
                    <a-col :span="24">
                        <a-form-item label="工作内容" required>
                            <markdown-editor
                                :isDisplayTitle="false"
                                :editorDefaultContent
                                style="margin-top: 0px"
                                :content="localWork.description"
                                @update:content="val => (localWork.description = val)"
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
import { DeleteOutlined, BankOutlined, TeamOutlined, EnvironmentOutlined } from "@ant-design/icons-vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import MarkdownEditor from "@/components/markdown-editor/index.vue";
import { workTypeOptions } from "@/utils/data-options";
import { useResumeStore } from "@/store";
import dayjs, { Dayjs } from "dayjs";

// 编辑器的默认值
const editorDefaultContent = {
    placeholder: `* 参与**XXX项目**的开发
* 补充**项目**的文档`
};

const props = defineProps<{ idx: number; id: number }>();

const resumeStore = useResumeStore();
const localWork = computed(() => {
    const index = resumeStore.workExperience.findIndex(work => work.id === props.id);
    return resumeStore.workExperience[index];
});

const dateRange = computed(() => [
    localWork.value.startDate ? dayjs(localWork.value.startDate) : null,
    localWork.value.endDate ? dayjs(localWork.value.endDate) : null
]);

const handleDateChange = (dates: [Dayjs | null, Dayjs | null]) => {
    if (!localWork.value) return;

    localWork.value.startDate = dates[0]?.format("YYYY-MM-DD") || "";
    localWork.value.endDate = dates[1]?.format("YYYY-MM-DD") || "";
};
</script>

<style scoped>
.work-info {
    color: red;
}
</style>
