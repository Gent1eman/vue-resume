<template>
    <div class="main">
        <div class="chat-input">
            <a-textarea
                placeholder="请输入"
                v-model:value="message.content"
                :autoSize="{ minRows: 2, maxRows: 4 }"
                class="textarea"
                :bordered="false"
                :disabled="isLoading || end"
                @keydown.enter.prevent="handleSendClick"
            />
        </div>
        <div class="chat-menu">
            <a-button
                :icon="h(ArrowUpOutlined)"
                shape="circle"
                :loading="isLoading"
                :disabled="!message.content.trim() || userChoose === undefined || userChoose === null || end"
                @click="handleSendClick"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { h, inject, ref, type Ref } from "vue";
import { ArrowUpOutlined } from "@ant-design/icons-vue";
import type { AIDialogue } from "@/types/aiDialogue";
const isLoading = inject<Ref<boolean>>("isLoading", ref(false));
const end = inject<Ref<boolean>>("end", ref(false));
const userChoose = inject<Ref<boolean>>("userChoose");
const message = inject<Ref<AIDialogue>>(
    "message",
    ref<AIDialogue>({
        role: "user",
        content: ""
    })
);
const emit = defineEmits(["send"]);

const handleSendClick = () => {
    emit("send");
};
</script>

<style scoped lang="scss">
.main {
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid #d4d4d4bb;
    padding: 6px 10px 10px 6px;

    .chat-input {
        flex: 1;

        .textarea {
            width: 100%;
            resize: none; /* 禁止手动调整大小 */
            overflow-y: auto; /* 只在文本区域显示滚动条 */
        }
        /* margin-bottom: 10px; */

        :deep(.ant-input::-webkit-scrollbar) {
            width: 3px;
        }

        :deep(.ant-input::-webkit-scrollbar-thumb) {
            background-color: #b8b8b8;
            border-radius: 3px;
        }
    }

    .chat-menu {
        display: flex;
        justify-content: flex-end;
        height: 32px; /* 固定按钮高度 */
        /* padding-right: 10px; */
    }

    &:hover,
    &:focus-within {
        border-color: #1677ff;
    }

    &:focus-within {
        box-shadow: 0 0 0 2px rgba(#1677ff, 0.1);
    }
}
</style>
