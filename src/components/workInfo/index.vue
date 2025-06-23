<template>
    <div class="work-info">
        <a-card title="教育经历#1">
            <template #extra>
                <a-button type="text" :icon="h(DeleteOutlined)" danger />
            </template>
            <a-form layout="vertical">
                <a-row :gutter="[24, 64]">
                    <a-col :span="12">
                        <a-form-item label="公司名称" required>
                            <a-input placeholder="例如：阿里巴巴">
                                <!-- 插槽 -->
                                <template #prefix>
                                    <bank-outlined :style="{ color: '#9CA3AF', fontSize: '16px' }" />
                                </template>
                            </a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="职位" required>
                            <a-input placeholder="例如：前端开发工程师">
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
                            <a-input placeholder="例如：技术部">
                                <!-- 插槽 -->
                                <template #prefix>
                                    <team-outlined :style="{ color: '#9CA3AF', fontSize: '16px' }" />
                                </template>
                            </a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="工作地点">
                            <a-input placeholder="例如：北京">
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
                            <a-select placeholder="请选择">
                                <a-select-option value="full-time">全职</a-select-option>
                                <a-select-option value="part-time">兼职</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="工作时间">
                            <a-config-provider :locale="zhCN">
                                <a-range-picker style="width: 100%" :placeholder="['开始时间', '结束时间（在职可不选）']" />
                            </a-config-provider>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="[24, 64]">
                    <a-col :span="24">
                        <a-form-item label="工作内容" required>
                            <markdown-editor :isDisplayTitle="false" :editorDefaultContent style="margin-top: 0px" />
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import { h } from "vue";
import { DeleteOutlined, BankOutlined, TeamOutlined, EnvironmentOutlined } from "@ant-design/icons-vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import MarkdownEditor from "@/components/markdown-editor/index.vue";

// 编辑器的默认值
const editorDefaultContent = {
    placeholder: `* 参与**XXX项目**的开发
* 补充**项目**的文档`
};
</script>

<style scoped>
.work-info {
    color: red;
}
</style>
