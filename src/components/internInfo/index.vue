<template>
    <div class="intern-info">
        <a-card title="实习经历#1">
            <template #extra>
                <a-button type="text" :icon="h(DeleteOutlined)" danger />
            </template>
            <a-form layout="vertical">
                <a-row :gutter="[24, 64]">
                    <a-col :span="12">
                        <a-form-item label="公司名称" required>
                            <a-input placeholder="例如：腾讯科技有限公司">
                                <!-- 插槽 -->
                                <template #prefix>
                                    <bank-outlined :style="{ color: '#9CA3AF', fontSize: '16px' }" />
                                </template>
                            </a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="职位" required>
                            <a-input placeholder="例如：前端开发实习生">
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
                            <a-input placeholder="例如：北京">
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
                                <a-range-picker style="width: 100%" :placeholder="['开始时间', '结束时间（未结束可不选）']" />
                            </a-config-provider>
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row :gutter="[24, 64]">
                    <a-col :span="24">
                        <a-form-item label="实习内容" required>
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
.intern-info {
    color: red;
}
</style>
