<template>
    <div>
        <!-- 上传按钮 -->
        <a-upload :before-upload="beforeUpload" :show-upload-list="false" accept="image/*">
            <a-button type="primary">
                <template #icon><upload-outlined /></template>
                上传图片
            </a-button>
        </a-upload>

        <!-- 裁剪弹窗 -->
        <a-modal title="裁剪头像" v-model:open="showCropper" :width="518" :maskClosable="false" @ok="handleCropOk" okText="确认" cancelText="取消">
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

        <!-- 预览区域 -->
        <div v-if="croppedImage" class="preview-area">
            <a-image :width="200" :src="previewImage" />
            <a-button @click="uploadImage" type="primary" class="mt-4">确认上传</a-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { VueCropper } from "vue-cropper";
import type { ComponentPublicInstance } from "vue";
import "vue-cropper/dist/index.css"; // 必须引入！

const showCropper = ref(false);
const selectedImage = ref<File | null>(null);
const croppedImage = ref<File | null>(null);
const previewImage = ref("");
const imageSrc = ref("");
const aspectRatio = ref<[number, number]>([295, 413]);
const cropperRef = ref<VueCropperInstance | null>(null);

// 裁剪组件实例类型
type VueCropperInstance = ComponentPublicInstance & {
    getCropBlob: (cb: (blob: Blob) => void) => void;
    reset: () => void;
};

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
            previewImage.value = e.target?.result as string;
        };
        reader.readAsDataURL(file);

        showCropper.value = false;
    });
};

// 确认上传（此处模拟）
const uploadImage = async () => {
    try {
        if (!croppedImage.value) {
            message.error("请先裁剪图片");
            return;
        }
        const formData = new FormData();
        formData.append("avatar", croppedImage.value);

        // await api.uploadAvatar(formData);
        message.success("上传成功!");
        croppedImage.value = null;
    } catch (error: any) {
        message.error("上传失败: " + error?.message || error);
    }
};
</script>

<style scoped lang="scss">
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
