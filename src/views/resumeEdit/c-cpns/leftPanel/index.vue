<template>
    <div class="left-panel">
        <a-card
            title="简历编辑器"
            :tab-list="tabList"
            :active-tab-key="key"
            @tabChange="(key: any) => onTabChange(key, 'key')"
            :bodyStyle="{ height: 'calc(100vh - 230px)', overflow: 'auto' }"
        >
            <template #extra>
                <a-button type="text" :icon="h(EditOutlined)" @click="showDrawer">自定义简历配置</a-button>
            </template>
            <component :is="contentList[key]" />
            <template #actions>
                <div class="custom-actions">
                    <a-button type="primary" :icon="h(ReloadOutlined)" @click="handleAutoFill">初始化数据</a-button>
                </div>
            </template>
        </a-card>
    </div>

    <a-drawer title="简历配置与模块管理" placement="left" :open="open" @close="onClose" width="500">
        <div class="drawer-tip">
            <div class="drawer-tip-wrapper">
                <a-space>
                    <InfoCircleOutlined style="font-size: 14px; color: #1677ff" />
                    <span class="drawer-tip-title">配置使用指南</span>
                </a-space>
            </div>
            <ul class="drawer-tip-conent">
                <a-space direction="vertical">
                    <p class="drawer-tip-p">• 在这里可以自定义简历的整体风格和布局</p>
                    <p class="drawer-tip-p">• 模板选择会影响简历的整体外观</p>
                    <p class="drawer-tip-p">• 主题色会应用于标题和分隔线等元素</p>
                    <p class="drawer-tip-p">• 模块间距可调整各内容块之间的空白区域</p>
                </a-space>
            </ul>
        </div>

        <div class="setting">
            <p class="setting-title">样式配置</p>
            <a-divider style="margin-top: 12px" />
            <div class="setting-item">
                <a-space direction="vertical">
                    <p>
                        <a-space>
                            <BgColorsOutlined />
                            <span>主题色</span>
                            <a-tooltip placement="right">
                                <template #title>
                                    <span>主题色会应用于标题、边框等突出元素</span>
                                </template>
                                <QuestionCircleOutlined style="color: #666666" />
                            </a-tooltip>
                        </a-space>
                    </p>
                    <input
                        type="color"
                        v-model="settingStore.settings.themeColor"
                        style="width: 32px; height: 32px; cursor: pointer; border: 1px solid #d3d3d3; border-radius: 5px; padding: 1px"
                    />
                </a-space>
            </div>
            <div class="setting-item">
                <a-space direction="vertical">
                    <p>
                        <a-space>
                            <ColumnHeightOutlined />
                            <span>模块间距 (px)</span>
                            <a-tooltip placement="right">
                                <template #title>
                                    <span>调整简历各模块之间的垂直间距</span>
                                </template>
                                <QuestionCircleOutlined style="color: #666666" />
                            </a-tooltip>
                        </a-space>
                    </p>
                    <a-input-number id="inputNumber" :min="1" v-model:value="settingStore.settings.moduleSpace" />
                </a-space>
            </div>
            <div class="setting-item">
                <a-space direction="vertical">
                    <p>
                        <a-space>
                            <ColumnHeightOutlined />
                            <span>行高</span>
                            <a-tooltip placement="right">
                                <template #title>
                                    <span>调整文本的行高，影响文本的垂直间距</span>
                                </template>
                                <QuestionCircleOutlined style="color: #666666" />
                            </a-tooltip>
                        </a-space>
                    </p>
                    <a-input-number id="inputNumber" :min="0" :step="0.1" v-model:value="settingStore.settings.lineHeight" />
                </a-space>
            </div>
            <a-divider style="margin-top: 12px; margin-bottom: 8px" />
            <div class="drag-wrapper">
                <a-space>
                    <BlockOutlined />
                    <span>模块管理</span>
                    <a-tooltip placement="right">
                        <template #title>
                            <span>拖拽模块可调整顺序，点击眼睛图标可控制显示/隐藏</span>
                        </template>
                        <QuestionCircleOutlined style="color: #666666" />
                    </a-tooltip>
                </a-space>
                <a-divider style="margin-top: 12px" />

                <div class="drag-content">
                    <VueDraggable
                        ref="el"
                        v-model="settingStore.settings.modulesSort"
                        :animation="150"
                        ghostClass="ghost"
                        class="flex flex-col gap-2 p-4 w-300px h-300px m-auto bg-gray-500/5 rounded"
                    >
                        <template v-for="item in settingStore.settings.modulesSort" :key="item.id">
                            <module-card :title="item.name" :icon="item.icon" :id="item.id" />
                        </template>
                    </VueDraggable>
                </div>
            </div>
        </div>
    </a-drawer>
</template>

<script lang="ts" setup>
import { h, ref, watch } from "vue";
import {
    ReloadOutlined,
    EditOutlined,
    BlockOutlined,
    QuestionCircleOutlined,
    InfoCircleOutlined,
    ColumnHeightOutlined,
    BgColorsOutlined
} from "@ant-design/icons-vue";
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
import type { Component } from "vue";
import { useResumeStore, useSettingStore } from "@/store";
import { message } from "ant-design-vue";
import { VueDraggable } from "vue-draggable-plus";
import { moduleArray } from "@/utils/module-sort";
import ModuleCard from "@/components/moduleCard/index.vue";
const open = ref<boolean>(false);
const moduleList = ref(moduleArray);
const resumeStore = useResumeStore();
const settingStore = useSettingStore();

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
    if (type === "key") {
        key.value = value;
    }
};

watch(
    () => resumeStore.$state,
    () => {
        resumeStore.saveToLocalStorage();
    },
    { deep: true, immediate: true }
);

const handleAutoFill = async () => {
    try {
        await resumeStore.autoFillData();
    } catch (error) {
        message.error("填充失败");
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

.drawer-tip {
    background: #f9fafb;
    height: 140px;
    width: 100%;
    padding: 10px 20px 20px 20px;

    .drawer-tip-wrapper {
        margin-top: 8px;
        margin-bottom: 10px;
        /* margin-left: -15px; */

        .drawer-tip-title {
            color: rgb(37 99 235);
            font-weight: 500;
            font-size: 14px;
        }
    }

    .drawer-tip-p {
        font-size: 12px;
        color: rgb(75 85 99);
    }
}

.setting {
    .setting-title {
        margin-top: 50px;
    }
    .setting-item {
        margin: 22px 0;
        padding: 0 20px;
    }
}
.drag-wrapper {
    padding: 20px;
    .drag-content {
        background-color: #f9fafb;
        display: inline-block;
        padding: 8px;

        .module-card:last-child {
            margin-bottom: 0;
        }
    }
}
.ghost {
    opacity: 0.5;
    background: #c8ebfb;
}
</style>
