<template>
    <div class="basic-info">
        <div>
            <div class="title">
                <user-outlined :style="{ color: '#1890ff', fontSize: '19px' }" />
                <span class="title-text">基本信息</span>
            </div>
            <!-- 提示文字 -->
            <p class="hint-text">请填写您的基本个人信息，这些信息将显示在简历的顶部区域</p>
        </div>
        <a-divider />

        <!-- 具体内容 -->
        <div>
            <div class="pic">
                <a-avatar :size="100">
                    <template #icon><UserOutlined /></template>
                </a-avatar>
                <p class="hint-text">支持JPG、PNG、JPEG格式，大小不超过1MB</p>
                <a-space>
                    <a-button type="primary" :icon="h(UploadOutlined)">上传头像</a-button>
                    <a-button danger :icon="h(CloseCircleOutlined)">移除头像</a-button>
                </a-space>
            </div>
            <div>{{ resumeStore.basicInfo }}</div>
            <div class="form-data">
                <a-form layout="vertical" v-model:value="basicInfo">
                    <a-row :gutter="[24, 64]">
                        <a-col :span="12">
                            <a-form-item label="姓名" required>
                                <a-input placeholder="请输入您的姓名" v-model:value="basicInfo.name">
                                    <!-- 插槽 -->
                                    <template #prefix>
                                        <user-outlined :style="{ color: '#9CA3AF', fontSize: '16px' }" />
                                    </template>
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item label="电话" required>
                                <a-input placeholder="请输入您的电话号码" v-model:value="basicInfo.phone">
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
                            <a-form-item label="邮箱" required>
                                <a-input placeholder="请输入您的邮箱" v-model:value="basicInfo.email">
                                    <!-- 插槽 -->
                                    <template #prefix>
                                        <mail-outlined :style="{ color: '#9CA3AF', fontSize: '16px' }" />
                                    </template>
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item label="性别">
                                <a-select placeholder="请选择" v-model:value="basicInfo.gender" :options="genderOptions"> </a-select>
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row :gutter="[24, 64]">
                        <a-col :span="12">
                            <a-form-item label="年龄">
                                <a-input-number placeholder="请输入您的年龄" style="width: 100%" :min="0" :max="120" v-model:value="basicInfo.age">
                                    <!-- 插槽 -->
                                    <template #prefix>
                                        <idcard-outlined :style="{ color: '#9CA3AF', fontSize: '16px' }" />
                                    </template>
                                </a-input-number>
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item label="个人博客">
                                <a-input placeholder="例如：https://yourblog.com" v-model:value="basicInfo.website">
                                    <!-- 插槽 -->
                                    <template #prefix>
                                        <ie-outlined :style="{ color: '#9CA3AF', fontSize: '16px' }" />
                                    </template>
                                </a-input>
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row :gutter="[24, 64]">
                        <a-col :span="12">
                            <a-form-item label="Github">
                                <a-input placeholder="例如：https://github.com/yourname" v-model:value="basicInfo.github">
                                    <!-- 插槽 -->
                                    <template #prefix>
                                        <github-outlined :style="{ color: '#9CA3AF', fontSize: '16px' }" />
                                    </template>
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item label="求职意向">
                                <a-input placeholder="例如：前端工程师" v-model:value="basicInfo.applicationPosition">
                                    <!-- 插槽 -->
                                    <template #prefix>
                                        <tags-outlined :style="{ color: '#9CA3AF', fontSize: '16px' }" :rotate="-90" />
                                    </template>
                                </a-input>
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row :gutter="[24, 64]">
                        <a-col :span="12">
                            <a-form-item label="政治面貌">
                                <a-select placeholder="请选择" :options="politicalOptions" v-model:value="basicInfo.politicalStatus"> </a-select>
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { h, computed, watch } from "vue";
import { politicalOptions, genderOptions } from "@/utils/data-options";
import {
    UserOutlined,
    IdcardOutlined,
    GithubOutlined,
    TagsOutlined,
    MailOutlined,
    UploadOutlined,
    CloseCircleOutlined,
    PhoneOutlined,
    IeOutlined
} from "@ant-design/icons-vue";
import { useResumeStore } from "@/store/useResumeStore";

// 获取store示例
const resumeStore = useResumeStore();
const basicInfo = computed(() => resumeStore.basicInfo);

// watch监听store的变化，保存到localStorage中
// watch(
//     () => resumeStore.$state, // 被监视的响应式数据
//     () => {
//         // 当上面数据发生变化时执行的回调函数
//         resumeStore.saveToLocalStorage(); // 变化时执行的操作
//     },
//     { deep: true } // 深度监听
// );
</script>

<style scoped lang="scss">
.basic-info {
    .title {
        display: flex;
        /* 垂直居中 */
        align-items: center;

        .title-text {
            font-size: 20px;
            font-weight: 600;
            margin-left: 8px;
        }
    }

    .hint-text {
        margin-top: 10px;
        color: #757575;
    }

    .pic {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 35px;
    }
}
</style>
