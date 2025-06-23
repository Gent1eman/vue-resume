<template>
    <div class="editor-wrapper">
        <div class="editor-title" v-if="isDisplayTitle">
            <a-space>
                <BulbOutlined style="color: #1677ff" />
                <span>{{ editorDefaultContent.title }}</span>
            </a-space>
        </div>

        <MdEditor
            v-model="text"
            :preview="false"
            :placeholder="editorDefaultContent.placeholder"
            :toolbars="toolbars"
            style="height: 260px; border-radius: 5px"
            @onHtmlChanged="emitHtmlChange"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { BulbOutlined } from "@ant-design/icons-vue";
import { MdEditor, type ToolbarNames, config } from "md-editor-v3";
import "md-editor-v3/lib/style.css";

const props = withDefaults(
    defineProps<{
        isDisplayTitle?: boolean;
        editorDefaultContent?: { [key: string]: string };
    }>(),
    {
        isDisplayTitle: true, // 默认值为 true
        editorDefaultContent: () => ({
            title: "内容编辑",
            placeholder: ""
        })
    }
);

const text = ref("");

const emit = defineEmits(["update:modelValue", "htmlChanged"]);

// 处理HTML变化
const emitHtmlChange = (html: string) => {
    emit("htmlChanged", html);
};

const toolbars: Array<ToolbarNames> = ["bold", "italic", "unorderedList", "orderedList", "revoke", "next"];

config({
    markdownItConfig(md) {
        // 1. 禁用所有不需要的规则
        const disabledRules = ["heading", "image", "link", "code", "table", "blockquote", "hr", "lheading", "fence", "strikethrough"];
        disabledRules.forEach(rule => md.disable(rule));

        // 2. 特殊处理标题 - 直接去掉#符号
        md.renderer.rules.heading_open = () => "";
        md.renderer.rules.heading_close = () => "";
        md.renderer.rules.text = (tokens, idx) => {
            // 处理标题文本（去掉#）
            return tokens[idx].content.replace(/^#+\s*/, "");
        };
    }
});
</script>

<style scoped lang="scss">
.preview-title {
    margin-bottom: 10px;

    .preview-title-text {
        font-size: 15px;
        color: #1677ff;
    }
}

.preview-wrapper {
    background-color: #fff;
    padding: 10px 10px;
    border-radius: 5px;
}

:deep(.preview-content) ul {
    margin: 0;
    padding: 4px;
    list-style-position: inside;
}

:deep(.preview-content) li {
    text-indent: -0.5em;
    padding-left: 1em;
}

.editor-wrapper {
    margin-top: 20px;

    .editor-title {
        margin-bottom: 8px;
        font-size: 15px;
    }
}
</style>
