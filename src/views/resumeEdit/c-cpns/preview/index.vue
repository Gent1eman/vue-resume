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
        <education-preview v-show="true" />
        <work-preview />
        <internship-preview />
        <project-preview />
        <general-preview title="专业技能" :content="resumeStore.skills" />
        <general-preview title="获奖经历" :content="resumeStore.awards" />
        <general-preview title="个人评价" :content="resumeStore.selfEval" />
        <general-preview title="科研成果" :content="resumeStore.research" />
        <general-preview title="校园经历" :content="resumeStore.campus" />
        <general-preview title="证书信息" :content="resumeStore.certificates" />
    </div>
</template>

<script lang="ts" setup>
import GeneralPreview from "@/components/generalPreview/index.vue";
import EducationPreview from "@/components/educationPreview/index.vue";
import WorkPreview from "@/components/workPreview/index.vue";
import InternshipPreview from "@/components/internshipPreview/index.vue";
import ProjectPreview from "@/components/projectPreview/index.vue";
import { useResumeStore } from "@/store/useResumeStore";
import { computed, ref } from "vue";
const resumeStore = useResumeStore();
const basicInfo = computed(() => resumeStore.basicInfo);

const resumeStyle = computed(() => {
    return {
        "--color-theme": "#1677ff",
        "--line-height": "2",
        "--module-space": "10px"
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
