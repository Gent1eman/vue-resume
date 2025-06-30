<template>
    <div class="right-panel">
        <a-card title="简历预览" :bodyStyle="{ height: 'calc(100vh - 185px)', overflow: 'auto' }">
            <template #extra>
                <div class="github-link">
                    <a href="https://github.com/Gent1eman/vue-resume" target="_blank">
                        <span class="github-star">如果您喜欢这个项目，请给个 Star 吧！</span>
                        <img src="https://img.shields.io/github/stars/Gent1eman/vue-resume?style=social" alt="GitHub stars" />
                    </a>
                </div>
            </template>

            <div class="preview-wrapper">
                <Preview ref="previewRef" />
            </div>
            <template #actions>
                <div class="custom-actions">
                    <a-button type="primary" :icon="h(ExportOutlined)" @click="exportToPDF">导出PDF</a-button>
                </div>
            </template>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import { h, nextTick, ref } from "vue";
import { ExportOutlined } from "@ant-design/icons-vue";
import Preview from "@/views/resumeEdit/c-cpns/preview/index.vue";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const previewRef = ref();

const exportToPDF = async () => {
    await nextTick();
    const content = previewRef.value?.resumeContentRef;
    if (!content) return;

    const canvas = await html2canvas(content, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#fff",
        allowTaint: true,
        // @ts-ignore
        dpi: window.devicePixelRatio * 4,
        windowWidth: content.scrollWidth,
        windowHeight: content.scrollHeight,
        scrollX: 0,
        scrollY: 0
    });

    const pdf = new jsPDF("p", "pt", "a4");
    const margin = 13 * 2.83465;
    const a4Width = 595.28;
    const a4Height = 841.89;
    const pageContentWidth = a4Width - margin * 2;
    const pageContentHeight = a4Height - margin * 2;

    // canvas 尺寸（像素）
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // 缩放比例
    const scale = pageContentWidth / canvasWidth;

    const pagePixelHeight = pageContentHeight / scale; // 一页在 canvas 中对应多少像素

    let positionY = 0;

    // 判断是否为白色空行
    const isBlankLine = (y: number) => {
        const ctx = canvas.getContext("2d")!;
        for (let x = 0; x < canvas.width; x += 10) {
            const pixel = ctx.getImageData(x, y, 1, 1).data;
            if (pixel[0] !== 255 || pixel[1] !== 255 || pixel[2] !== 255) {
                return false;
            }
        }
        return true;
    };

    const findSafeSplitPosition = (startY: number, endY: number) => {
        let blankLineCount = 0;
        for (let y = Math.floor(endY); y >= Math.floor(startY); y--) {
            if (isBlankLine(y)) {
                blankLineCount++;
                if (blankLineCount >= 5) return y;
            } else {
                blankLineCount = 0;
            }
        }
        return endY;
    };

    while (positionY < canvasHeight) {
        let currentPagePixelHeight = Math.min(pagePixelHeight, canvasHeight - positionY);

        // 尝试在本页尾部寻找安全分页点
        if (positionY + currentPagePixelHeight < canvasHeight) {
            const safeY = findSafeSplitPosition(positionY, positionY + currentPagePixelHeight);
            currentPagePixelHeight = safeY - positionY;
            if (currentPagePixelHeight <= 0) {
                currentPagePixelHeight = pagePixelHeight;
            }
        }

        // 创建分页 canvas
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvasWidth;
        pageCanvas.height = currentPagePixelHeight;

        const ctx = pageCanvas.getContext("2d")!;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);

        ctx.drawImage(canvas, 0, positionY, canvasWidth, currentPagePixelHeight, 0, 0, canvasWidth, currentPagePixelHeight);

        if (positionY > 0) pdf.addPage();

        pdf.addImage(
            pageCanvas.toDataURL("image/jpeg", 1.0),
            "JPEG",
            margin,
            margin,
            pageContentWidth,
            pageContentHeight * (currentPagePixelHeight / pagePixelHeight) // 保持纵向缩放比例
        );

        positionY += currentPagePixelHeight;
    }

    pdf.save("resume.pdf");
};
</script>

<style scoped lang="scss">
.right-panel {
    /* 修改功能栏的布局 */
    .custom-actions {
        display: flex;
        justify-content: flex-end;
        padding: 0 16px;
    }

    .preview-wrapper {
        padding: 20px;
        min-height: 600px;
        overflow: hidden;
        width: 100%;
        background-color: #ffffff;
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
    }
}
</style>
