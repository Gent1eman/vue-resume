<template>
    <div class="preview-content" :style="resumeStyle">
        <!-- 个人信息 -->
        <section class="basic-info">
            <a-space direction="vertical" :size="4" align="center">
                <div class="info-row">
                    <!-- <span class="name">hui</span> -->
                    <h2>{{ basicInfo.name }}</h2>
                </div>
                <div class="info-row">
                    <span class="text-space" v-show="basicInfo.gender">{{ basicInfo.gender }}</span>
                    <a-divider type="vertical" class="custom-divider text-space" v-show="basicInfo.gender && (basicInfo.age || basicInfo.politicalStatus)" />
                    <span class="text-space" v-show="basicInfo.age">{{ basicInfo.age }}岁</span>
                    <a-divider type="vertical" class="custom-divider text-space" v-show="basicInfo.age && basicInfo.politicalStatus" />
                    <span v-show="basicInfo.politicalStatus">{{ basicInfo.politicalStatus }}</span>
                </div>
                <div class="info-row">
                    <span class="text-space">{{ basicInfo.phone }}</span>
                    <a-divider type="vertical" class="custom-divider text-space" v-show="basicInfo.phone && basicInfo.email" />
                    <span>{{ basicInfo.email }}</span>
                </div>
                <div class="info-row">
                    <a :href="basicInfo.github" class="text-space">{{ basicInfo.github }}</a>
                    <a-divider type="vertical" class="custom-divider text-space" v-show="basicInfo.github && basicInfo.website" />
                    <a :href="basicInfo.website">{{ basicInfo.website }}</a>
                </div>
                <div class="info-row">
                    <strong>
                        <span>求职意向：</span>
                        <span>{{ basicInfo.applicationPosition }}</span>
                    </strong>
                </div>
            </a-space>
        </section>
        <!-- 个人头像 -->
        <div class="avator">
            <img src="../../../../assets/image/avator.jpg" alt="" />
        </div>

        <!-- 专业技能（通用预览） -->
        <!-- 得使用v-if，v-show pdf导出依然存在（dom没被移除） -->
        <!-- <education-preview v-if="modules.education" />
        <work-preview v-if="modules.work" />
        <internship-preview v-if="modules.internships" />
        <project-preview v-if="modules.projects" />
        <general-preview title="专业技能" v-if="modules.skills" :content="resumeStore.skills" />
        <general-preview title="获奖经历" v-if="modules.awards" :content="resumeStore.awards" />
        <general-preview title="个人评价" v-if="modules.selfEval" :content="resumeStore.selfEval" />
        <general-preview title="科研成果" v-if="modules.research" :content="resumeStore.research" />
        <general-preview title="校园经历" v-if="modules.campus" :content="resumeStore.campus" />
        <general-preview title="证书信息" v-if="modules.certificates" :content="resumeStore.certificates" /> -->

        <template v-for="module in settingStore.settings.modulesSort" :key="module.id">
            <!-- 教育背景、工作经历、实习经历、项目经历 -->
            <template v-if="['education', 'work', 'internships', 'projects'].includes(module.id)">
                <component :is="moduleComponents[module.id as ModuleID]" v-if="settingStore.settings.modules[module.id]"></component>
            </template>
            <!-- 通用组件 -->
            <general-preview
                v-else-if="settingStore.settings.modules[module.id]"
                :title="module.name"
                :content="generalPreviewModules[module.id as GeneralModuleID]"
            ></general-preview>
        </template>
    </div>
</template>

<script lang="ts" setup>
import GeneralPreview from "@/components/generalPreview/index.vue";
import { useResumeStore, useSettingStore } from "@/store";
import { computed } from "vue";
import { moduleComponents, type GeneralModuleID, type ModuleID } from "@/utils/module-sort";

const resumeStore = useResumeStore();
const settingStore = useSettingStore();

// 通用组件的数据对象
const generalPreviewModules = computed(() => ({
    skills: resumeStore.skills,
    awards: resumeStore.awards,
    selfEval: resumeStore.selfEval,
    research: resumeStore.research,
    campus: resumeStore.campus,
    certificates: resumeStore.certificates
}));

const basicInfo = computed(() => resumeStore.basicInfo);

const resumeStyle = computed(() => {
    return {
        "--color-theme": settingStore.settings.themeColor,
        "--line-height": parseFloat(settingStore.settings.lineHeight),
        "--module-space": `${parseInt(settingStore.settings.moduleSpace)}px`
    };
});
</script>

<style scoped lang="scss">
.preview-content {
    margin: 0 16px;
    position: relative;
    line-height: var(--line-height);

    .custom-divider {
        background-color: #888888;
        margin-left: 0;
    }

    .text-space {
        margin-right: 14px;
    }

    .info-row {
        width: 100%;
    }
    span {
        font-size: 14px;
    }
    .basic-info {
        min-height: 137px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin-bottom: var(--module-space);
    }

    .avator {
        position: absolute;
        right: 0;
        top: 10px;
        img {
            height: 137px;
            width: 95px;
            border-radius: 4px;
        }
    }
}
</style>
