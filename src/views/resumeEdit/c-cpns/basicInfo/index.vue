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
            <div class="form-data">
                <a-form layout="vertical" v-model:value="basicInfo">
                    <a-row :gutter="[24, 64]">
                        <a-col :span="24">
                            <a-form-item>
                                <div class="pic">
                                    <a-space align="center" direction="vertical">
                                        <a-avatar :size="100" :src="basicInfo.avatar">
                                            <template #icon><UserOutlined /></template>
                                        </a-avatar>
                                        <p class="hint-text">支持JPG、PNG、JPEG格式，大小不超过1MB</p>
                                        <div>
                                            <a-space>
                                                <a-upload :before-upload="beforeUpload" :show-upload-list="false" accept="image/*">
                                                    <a-button type="primary">
                                                        <template #icon><upload-outlined /></template>
                                                        上传图片
                                                    </a-button>
                                                </a-upload>
                                                <a-button danger :icon="h(CloseCircleOutlined)" @click="handleClearImage">移除头像</a-button>
                                            </a-space>
                                        </div>
                                    </a-space>
                                </div>
                            </a-form-item>
                        </a-col>
                    </a-row>
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

    <!-- 裁剪弹窗 -->
    <a-modal title="裁剪头像" v-model:visible="showCropper" :width="518" :maskClosable="false" @ok="handleCropOk" okText="确认" cancelText="取消">
        <div class="cropper-container">
            <VueCropper
                ref="cropperRef"
                :img="imageSrc"
                :fixed="true"
                :autoCrop="true"
                :autoCropWidth="295"
                :autoCropHeight="413"
                :fixedNumber="aspectRatio"
                :centerBox="true"
                :canMoveBox="false"
                style="width: 470px; height: 365px"
                :fixedBox="true"
            />
        </div>
    </a-modal>
</template>

<script lang="ts" setup>
import { h, computed, watch, ref, onMounted } from "vue";
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
import { useResumeStore } from "@/store";
import { VueCropper } from "vue-cropper";
import type { ComponentPublicInstance } from "vue";
import "vue-cropper/dist/index.css"; // 必须引入！
import { message } from "ant-design-vue";

// 裁剪组件实例类型
type VueCropperInstance = ComponentPublicInstance & {
    getCropBlob: (cb: (blob: Blob) => void) => void;
    reset: () => void;
};

onMounted(() => {
    console.log(resumeStore.basicInfo);
});

// 获取store示例
const resumeStore = useResumeStore();
const basicInfo = computed(() => resumeStore.basicInfo);

const showCropper = ref(false);
const selectedImage = ref<File | null>(null);
const croppedImage = ref<File | null>(null);
const imageSrc = ref("");
const aspectRatio = ref<[number, number]>([295, 413]);
const cropperRef = ref<VueCropperInstance | null>(null);

// 上传前检查
const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
        message.error("只能上传图片文件!");
        return false;
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error("图片大小不能超过2MB!");
        return false;
    }

    selectedImage.value = file;
    const reader = new FileReader();
    reader.onload = e => {
        imageSrc.value = e.target?.result as string;
        showCropper.value = true;
    };
    reader.readAsDataURL(file);
    return false; // 阻止默认上传行为
};

// 确认裁剪
const handleCropOk = () => {
    if (!selectedImage.value) return;
    cropperRef.value?.getCropBlob((blob: Blob) => {
        const fileName = selectedImage.value!.name.replace(/\.[^/.]+$/, "") + "-cropped.png";
        const file = new File([blob], fileName, { type: "image/png" });
        croppedImage.value = file;

        // 生成预览图
        const reader = new FileReader();
        reader.onload = e => {
            basicInfo.value.avatar = e.target?.result as string;
        };
        reader.readAsDataURL(file);

        showCropper.value = false;
    });
};

// 清空头像
const handleClearImage = () => {
    basicInfo.value.avatar = "";
};
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

.cropper-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.preview-area {
    margin-top: 20px;
    text-align: center;
}
.mt-4 {
    margin-top: 16px;
}
</style>
