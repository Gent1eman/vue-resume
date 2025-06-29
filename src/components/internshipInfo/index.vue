<template>
    <div class="intern-info">
        <a-card :title="`实习经历#${idx}`">
            <template #extra>
                <a-button type="text" :icon="h(DeleteOutlined)" danger @click="removeInternship" />
            </template>
            <a-form layout="vertical" v-model:value="localInternship">
                <a-row :gutter="[24, 64]">
                    <a-col :span="12">
                        <a-form-item label="公司名称" required>
                            <a-input placeholder="例如：腾讯科技有限公司" v-model:value="localInternship.company">
                                <!-- 插槽 -->
                                <template #prefix>
                                    <bank-outlined :style="{ color: '#9CA3AF', fontSize: '16px' }" />
                                </template>
                            </a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="职位" required>
                            <a-input placeholder="例如：前端开发实习生" v-model:value="localInternship.position">
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
                        <a-form-item label="工作地点" required>
                            <a-input placeholder="例如：北京" v-model:value="localInternship.place">
                                <!-- 插槽 -->
                                <template #prefix>
                                    <environment-outlined :style="{ color: '#9CA3AF', fontSize: '16px' }" />
                                </template>
                            </a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="工作时间">
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
                        <a-form-item label="实习内容" required>
                            <markdown-editor
                                :isDisplayTitle="false"
                                :editorDefaultContent
                                style="margin-top: 0px"
                                :content="localInternship.description"
                                @update:content="val => (localInternship.description = val)"
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
import { useResumeStore } from "@/store";
import dayjs, { Dayjs } from "dayjs";
import { message } from "ant-design-vue";

// 编辑器的默认值
const editorDefaultContent = {
    placeholder: `* 参与**XXX项目**的开发
* 补充**项目**的文档`
};

const props = defineProps<{ idx: number; id: number }>();

const resumeStore = useResumeStore();
const localInternship = computed(() => {
    const index = resumeStore.internships.findIndex(internship => internship.id === props.id);
    return resumeStore.internships[index];
});

const dateRange = computed(() => [
    localInternship.value.startDate ? dayjs(localInternship.value.startDate) : null,
    localInternship.value.endDate ? dayjs(localInternship.value.endDate) : null
]);

const handleDateChange = (dates: [Dayjs | null, Dayjs | null]) => {
    if (!localInternship.value) return;

    localInternship.value.startDate = dates[0]?.format("YYYY-MM") || "";
    localInternship.value.endDate = dates[1]?.format("YYYY-MM") || "";
};

// 删除实习经历
const removeInternship = () => {
    resumeStore.deleteInternship(props.id);
    message.success("实习经历删除成功！");
};
</script>

<style scoped></style>
