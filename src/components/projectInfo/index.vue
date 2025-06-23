<template>
    <div class="project-info">
        <a-card title="项目经历#1">
            <template #extra>
                <a-button type="text" :icon="h(DeleteOutlined)" danger />
            </template>
            <a-form layout="vertical">
                <a-row :gutter="[24, 64]">
                    <a-col :span="12">
                        <a-form-item label="项目名称" required>
                            <a-input placeholder="例如：企业官网重构">
                                <!-- 插槽 -->
                                <template #prefix>
                                    <appstore-outlined :style="{ color: '#9CA3AF', fontSize: '16px' }" />
                                </template>
                            </a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="担任角色" required>
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
                    <a-col :span="24">
                        <a-form-item label="项目时间" required>
                            <a-config-provider :locale="zhCN">
                                <a-range-picker style="width: 100%" :placeholder="['开始时间', '结束时间（未结束可不选）']" />
                            </a-config-provider>
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row :gutter="[24, 64]">
                    <a-col :span="24">
                        <a-form-item label="项目描述" required>
                            <markdown-editor :isDisplayTitle="false" style="margin-top: 0px" :editorDefaultContent />
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import { h } from "vue";
import { DeleteOutlined, AppstoreOutlined, TeamOutlined } from "@ant-design/icons-vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import MarkdownEditor from "@/components/markdown-editor/index.vue";

// 编辑器的默认值
const editorDefaultContent = {
    placeholder: `实现了论坛系统，功能包含XXX、XXX

**核心功能具体实现**：

1. 通过对登录用户颁发登录凭证`
};
</script>

<style scoped>
.project-info {
    color: red;
}
</style>
