<template>
    <div class="preview-content" :style="resumeStyle">
        <!-- 个人信息 -->
        <section class="basic-info">
            <a-space direction="vertical" :size="4" align="center">
                <div class="info-row">
                    <!-- <span class="name">hui</span> -->
                    <h2>hui</h2>
                </div>
                <div class="info-row">
                    <a-space :size="10">
                        <span class="gender" v-if="gender">{{ gender }}</span>
                        <a-divider type="vertical" class="custom-divider" v-if="age" />
                        <span class="age" v-if="age">{{ age }}岁</span>
                        <a-divider type="vertical" class="custom-divider" v-if="politicalStatus" />
                        <span class="politicalStatus" v-if="politicalStatus">{{ politicalStatus }}</span>
                    </a-space>
                </div>
                <div class="info-row">
                    <a-space :size="10">
                        <span class="phone">12345678910</span>
                        <a-divider type="vertical" class="custom-divider" />
                        <span class="email">123456789@qq.com</span>
                    </a-space>
                </div>
                <div class="info-row">
                    <a-space :size="10">
                        <a href="https://github.com/Gent1eman" class="github">https://github.com/Gent1eman</a>
                        <a-divider type="vertical" class="custom-divider" />
                        <a href="https://coderhui.top" class="website">https://coderhui.top</a>
                    </a-space>
                </div>
                <div class="info-row">
                    <span>求职意向：</span>
                    <span class="applicationPosition">前端开发工程师</span>
                </div>
            </a-space>
        </section>
        <!-- 个人头像 -->
        <div class="avator">
            <img src="../../../../assets/image/avator.jpg" alt="" />
        </div>

        <!-- 专业技能（通用预览） -->
        <education-preview />
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
const gender = ref("男");
const age = ref(20);
const politicalStatus = ref("共青团员");
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
