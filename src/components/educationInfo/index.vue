<template>
    <div class="edu-info">
        <a-card :title="`教育经历#${idx}`">
            <template #extra>
                <a-button type="text" :icon="h(DeleteOutlined)" danger />
            </template>
            <a-form layout="vertical" v-model:value="localEducation">
                <a-row :gutter="[24, 64]">
                    <a-col :span="12">
                        <a-form-item label="学校名称" required>
                            <a-input placeholder="例如：北京大学" v-model:value="localEducation.school">
                                <!-- 插槽 -->
                                <template #prefix>
                                    <bank-outlined :style="{ color: '#9CA3AF', fontSize: '16px' }" />
                                </template>
                            </a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="专业" required>
                            <a-input placeholder="例如：计算机科学与技术" v-model:value="localEducation.major">
                                <!-- 插槽 -->
                                <template #prefix>
                                    <book-outlined :style="{ color: '#9CA3AF', fontSize: '16px' }" />
                                </template>
                            </a-input>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="[24, 64]">
                    <a-col :span="12">
                        <a-form-item label="学位" required>
                            <a-select placeholder="请选择学位" v-model:value="localEducation.degree" :options="degreeOptions"> </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="GPA">
                            <a-input placeholder="例如：3.8/4.0" v-model:value="localEducation.gpa">
                                <!-- 插槽 -->
                                <template #prefix>
                                    <trophy-outlined :style="{ color: '#9CA3AF', fontSize: '16px' }" />
                                </template>
                            </a-input>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="[24, 64]">
                    <a-col :span="24">
                        <a-form-item label="在校时间" required>
                            <a-config-provider :locale="zhCN">
                                <a-range-picker
                                    style="width: 100%"
                                    format="YYYY-MM-DD"
                                    :placeholder="['开始时间', '结束时间（在读可不选）']"
                                    v-model:value="dateRange"
                                    @change="handleDateChange"
                                />
                            </a-config-provider>
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row :gutter="[24, 64]">
                    <a-col :span="24">
                        <a-form-item label="补充信息" required>
                            <markdown-editor
                                :isDisplayTitle="false"
                                style="margin-top: 0px"
                                :editorDefaultContent
                                :content="localEducation.description"
                                @update:content="val => (localEducation.description = val)"
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
import { DeleteOutlined, BookOutlined, TrophyOutlined, BankOutlined } from "@ant-design/icons-vue";
import MarkdownEditor from "@/components/markdown-editor/index.vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import { degreeOptions } from "@/utils/data-options";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useResumeStore } from "@/store";
// 编辑器的默认值
const editorDefaultContent = {
    placeholder: `- **专业课程**：计算机视觉、工程伦理等。 **图像认知重庆重点实验室** **研究方向**：工业瑕疵检测（Computer Vision）`
};
const props = defineProps<{ idx: number; id: number }>();
const resumeStore = useResumeStore();

const localEducation = computed(() => {
    const index = resumeStore.education.findIndex(edu => edu.id === props.id);
    return resumeStore.education[index];
});

const dateRange = computed(() => [
    localEducation.value.startDate ? dayjs(localEducation.value.startDate) : null,
    localEducation.value.endDate ? dayjs(localEducation.value.endDate) : null
]);

const handleDateChange = (dates: [Dayjs | null, Dayjs | null]) => {
    if (!localEducation.value) return;

    localEducation.value.startDate = dates[0]?.format("YYYY-MM-DD") || "";
    localEducation.value.endDate = dates[1]?.format("YYYY-MM-DD") || "";
};
</script>

<style scoped></style>
