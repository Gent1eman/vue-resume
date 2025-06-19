<template>
    <div class="edu-info">
        <a-card title="教育经历#1">
            <template #extra>
                <a-button type="text" :icon="h(DeleteOutlined)" danger />
            </template>
            <a-form layout="vertical">
                <a-row :gutter="[24, 64]">
                    <a-col :span="12">
                        <a-form-item label="学校名称" required>
                            <a-input placeholder="例如：北京大学">
                                <!-- 插槽 -->
                                <template #prefix>
                                    <user-outlined :style="{ color: '#9CA3AF', fontSize: '16px' }" />
                                </template>
                            </a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="专业" required>
                            <a-input placeholder="例如：计算机科学与技术">
                                <!-- 插槽 -->
                                <template #prefix>
                                    <phone-outlined :style="{ color: '#9CA3AF', fontSize: '16px' }" />
                                </template>
                            </a-input>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="[24, 64]">
                    <a-col :span="12">
                        <a-form-item label="学位" required>
                            <a-select placeholder="请选择">
                                <a-select-option value="associate">专科</a-select-option>
                                <a-select-option value="bachelor">本科</a-select-option>
                                <a-select-option value="master">硕士</a-select-option>
                                <a-select-option value="doctor">博士</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="GPA">
                            <a-input placeholder="例如：3.8/4.0">
                                <!-- 插槽 -->
                                <template #prefix>
                                    <user-outlined :style="{ color: '#9CA3AF', fontSize: '16px' }" />
                                </template>
                            </a-input>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="[24, 64]">
                    <a-col :span="24">
                        <a-form-item label="在校时间" required>
                            <a-config-provider :locale="zhCN">
                                <a-range-picker style="width: 100%" :placeholder="['开始时间', '结束时间（在读可不选）']" />
                            </a-config-provider>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import { h } from "vue";
import { DeleteOutlined } from "@ant-design/icons-vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";
</script>

<style scoped>
.edu-info {
    color: red;
}
</style>
