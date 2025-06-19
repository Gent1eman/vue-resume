<template>
    <div class="left-panel">
        <a-card
            title="简历编辑器"
            :tab-list="tabList"
            :active-tab-key="key"
            @tabChange="(key: any) => onTabChange(key, 'key')"
            :bodyStyle="{ height: 'calc(100vh - 230px)', overflow: 'auto' }"
        >
            <template #extra><a-button type="text" :icon="h(EditOutlined)" @click="showDrawer">自定义简历配置</a-button></template>
            <component :is="contentList[key]" />
            <template #actions>
                <div class="custom-actions">
                    <a-button type="primary" :icon="h(CloudUploadOutlined)">保存</a-button>
                </div>
            </template>
        </a-card>
    </div>

    <a-drawer title="Basic Drawer" placement="left" :closable="false" :open="open" @close="onClose">
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
    </a-drawer>
</template>

<script lang="ts" setup>
import { h, ref } from "vue";
import { CloudUploadOutlined, EditOutlined } from "@ant-design/icons-vue";
import BasiceInfo from "../basicInfo/index.vue";
import Education from "../education/index.vue";
import Work from "../work/index.vue";
import Skills from "../skills/index.vue";
import Projects from "../projects/index.vue";
import Internships from "../internships/index.vue";
import Awards from "../awards/index.vue";
import SelfEval from "../selfEval/index.vue";
import Research from "../research/index.vue";
import Campus from "../campus/index.vue";
import Certificates from "../certificates/index.vue";

const open = ref<boolean>(false);

const showDrawer = () => {
    open.value = true;
};

const onClose = () => {
    open.value = false;
};

const key = ref("basicInfo");
const tabList = [
    { key: "basicInfo", tab: "基本信息" },
    { key: "education", tab: "教育背景" },
    { key: "work", tab: "工作经历" },
    { key: "skills", tab: "专业技能" },
    { key: "projects", tab: "项目经历" },
    { key: "internships", tab: "实习经历" },
    { key: "awards", tab: "获奖经历" },
    { key: "selfEval", tab: "个人评价" },
    { key: "research", tab: "科研成果" },
    { key: "campus", tab: "校园经历" },
    { key: "certificates", tab: "证书信息" }
];

// Add a type for contentList to allow string indexing
import type { Component } from "vue";
const contentList: { [key: string]: Component } = {
    basicInfo: BasiceInfo,
    education: Education,
    work: Work,
    skills: Skills,
    projects: Projects,
    internships: Internships,
    awards: Awards,
    selfEval: SelfEval,
    research: Research,
    campus: Campus,
    certificates: Certificates
};

const onTabChange = (value: string, type: string) => {
    console.log(value, type);
    if (type === "key") {
        key.value = value;
    }
};
</script>

<style scoped lang="scss">
.left-panel {
    height: 100%;

    /* 修改功能栏的布局 */
    .custom-actions {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 0 16px;
    }

    /* 修改tab的文字大小 */
    :deep(.ant-tabs-tab) {
        font-size: 14px !important;
    }
}
</style>
