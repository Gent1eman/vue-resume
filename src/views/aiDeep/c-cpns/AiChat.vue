<template>
    <div class="chat-container">
        <div class="chat-history" ref="chatHistoryRef">
            <a-alert show-icon message="AI深度优化-根据您所填的项目、工作等通过问答方式对您的经历进行扩展优化或者模拟面试问答！" type="info" />
            <a-alert message="tips：使用前请优先填写右侧的岗位jd（职位描述）以及工作/项目经历！" type="warning" closable />

            <a-space wrap class="button-group" v-if="userChoose === undefined || userChoose === null" id="ai-choose-content">
                <a-button type="primary" :icon="h(SearchOutlined)" @click="choose(true)">经历深挖</a-button>
                <a-button type="primary" :icon="h(CommentOutlined)" @click="choose(false)">模拟面试</a-button>
            </a-space>
            <div v-else style="text-align: center">
                <a-tag color="green">{{ userChoose ? "经历深挖" : "模拟面试" }}</a-tag>
            </div>

            <div v-for="(msg, index) in messages" :key="index" class="message-item" :class="msg.role">
                <div class="message-content">
                    <div class="message-text" v-html="formatMessage(msg.content)"></div>
                </div>
            </div>

            <!-- 如果用户选择了模拟面试，则显示结束面试，然后获取面试结果 -->
            <div v-show="!userChoose && messages.length > 5 && !end" style="text-align: center; margin-bottom: -10px">
                <a-button type="primary" @click="endInterview()" :disabled="isLoading">结束面试</a-button>
            </div>

            <div v-if="end" class="interview-result">
                <a-badge-ribbon :text="'AI评分：' + interviewResultScore + '分'" :color="interviewResultScore >= 60 ? 'green' : 'red'">
                    <a-card title="AI评估面试结果" size="small" class="result-card">
                        <div class="message-text result-content" v-html="marked(interviewResult)"></div>
                    </a-card>
                </a-badge-ribbon>
            </div>

            <div v-if="end" style="text-align: center">
                <a-button type="primary" @click="restart()" :disabled="isLoading">重新开始</a-button>
            </div>
        </div>

        <!-- 输入区域 -->
        <div v-if="userChoose === undefined || userChoose === null" style="text-align: center">
            <p style="color: red">请先在上方按钮中选择"经历深挖"或者"模拟面试"！</p>
        </div>
        <chat-input @send="sendMessage" style="margin: 20px" />
    </div>
</template>

<script lang="ts" setup>
import { h, inject, nextTick, provide, reactive, ref, type Ref } from "vue";
import { SearchOutlined, CommentOutlined } from "@ant-design/icons-vue";
import type { AIDialogue, DialogueHistory } from "@/types/aiDialogue";
import ChatInput from "./ChatInput.vue";
import { marked } from "marked";
import { sendToLLMDialogue } from "@/api/llmAPI";

// 接收父组件传递的值
const jd = inject<Ref<string>>("jd", ref(""));
const resumeProject = inject<Ref<string>>("resumeProject", ref(""));

const chatHistoryRef = ref<HTMLElement>();

// 是否结束面试
const end = ref(false);
provide("end", end);
// 是否正在加载
const isLoading = ref(false);

provide("isLoading", isLoading);

// 用户选择是经历扩展还是模拟面试 true 为经历扩展，false 为模拟面试
const userChoose = ref<boolean>();
provide("userChoose", userChoose);

const interviewResult = ref("");
const interviewResultScore = ref(0);

// 输入框中的信息
const message = ref<AIDialogue>({
    role: "user",
    content: ""
});

provide("message", message);
// 多轮聊天记录
const messages = ref<DialogueHistory>([]);

const choose = (isExtend: boolean) => {
    userChoose.value = isExtend;
    if (userChoose.value) {
        // 经历扩展
        messages.value.push({
            role: "system",
            content:
                "你是一个AI面试官，请根据用户输入的岗位jd以及工作/项目经历进行深度的项目拷打，你可以通过查看我的岗位jd和我的经历不断询问我问题，可以适当沿着项目延申询问或者深挖项目，可以追问我。你是主导者，要主导本次对话，不断向我进行面试提问，尽量一次只提问一个问题，然后用户回复后可以接着追问或者另外从另一个方面进行提问。"
        });
        message.value.role = "user";
        message.value.content = `您好，请读取我的这段项目/工作经历以及岗位jd！${"```resume" + resumeProject.value + " ```"}  ${"```岗位jd" + jd.value + " ```"} `;
        sendMessage();
    } else {
        // 模拟面试
        messages.value.push({
            role: "system",
            content:
                "你是一个AI面试官，请根据用户输入的岗位jd以及工作/项目经历进行深度的项目拷打，你可以通过查看我的岗位jd和我的经历不断询问我问题，可以适当沿着项目延申询问或者深挖项目，可以追问我。你是主导者，要主导本次对话，不断向我进行面试提问，尽量一次只提问一个问题，然后用户回复后可以接着追问或者另外从另一个方面进行提问。"
        });
        message.value.role = "user";
        message.value.content = `面试官，您好，请读取我的这段项目/工作经历以及岗位jd！${"```resume" + resumeProject.value + " ```"}  ${"```岗位jd" + jd.value + " ```"} `;
        sendMessage();
    }
};

const formatMessage = (content: string) => {
    // 过滤掉```resume  ```中的内容
    content = content.replace(/```resume[\s\S]*?```/g, "");
    content = content.replace(/```岗位jd[\s\S]*?```/g, "");
    return marked(content);
};

// 滚动到底部
const scrollToBottom = async () => {
    await nextTick();
    if (chatHistoryRef.value) {
        chatHistoryRef.value.scrollTop = chatHistoryRef.value.scrollHeight;
    }
};

// 发送信息给AI
const sendMessage = async () => {
    if (!message.value.content.trim() || isLoading.value || userChoose.value === undefined || userChoose.value === null) return;

    message.value.content = message.value.content.trim();
    // 深拷贝
    const newMessage = JSON.parse(JSON.stringify(message.value));
    messages.value.push(newMessage);
    message.value.content = "";
    await scrollToBottom();
    isLoading.value = true;

    try {
        await sendToLLMDialogue(messages.value, (responseText, isComplete) => {
            if (messages.value[messages.value.length - 1].role === "user") {
                messages.value.push({
                    role: "assistant",
                    content: responseText
                });
            } else {
                messages.value[messages.value.length - 1].content = responseText;
            }
            // 如果是结尾，就输出```resume ```中ai优化后的内容到左侧输入框中
            if (isComplete) {
                let aiEnhanceText = messages.value[messages.value.length - 1].content;
                // 提取AI生成的 ```resume ... ``` 内的内容，填入用户右侧输入框中
                const match = aiEnhanceText.match(/```resume\s*([\s\S]*?)```/) || aiEnhanceText.match(/```([\s\S]*?)```/);
                if (match) {
                    aiEnhanceText = match[1].trim();
                    // resumeProject.value = aiEnhanceText;
                    // // 替换掉ai回复中的```resumt  ```信息
                    // messages.value[messages.value.length - 1].content = messages.value[messages.value.length - 1].content.replace(
                    //     /```resume[\s\S]*?```/g,
                    //     "`已自动填充进右侧输入框`"
                    // );
                }
            }
            scrollToBottom();
        });
    } catch (error) {
        console.error("AI 处理失败:", error);
        messages.value.push({
            role: "assistant",
            content: "AI 处理失败，请稍后再试。"
        });
    } finally {
        isLoading.value = false;
    }
};

// 结束面试，获取面试结果
const endInterview = async () => {
    end.value = true;

    // 拷贝数组
    const newMessages = reactive(messages.value.map(item => ({ ...item })));
    newMessages.push({
        role: "user",
        content:
            "好的，结束面试了，满分100分的话给我一个客观的分数用```分数```包裹，例如```40```，另外你帮我总结一下我的面试情况，告诉我将来哪些地方可以加强，以及我在面试中的优点和不足的地方。你返回的内容不要出现markdown语法，直接换行序号分点就行。"
    });
    isLoading.value = true;
    try {
        await sendToLLMDialogue(newMessages, responseText => {
            //提取并且过滤掉```分数 ```包裹的内容，为分数
            const match = responseText.match(/```\s*([\s\S]*?)```/);
            if (match) {
                interviewResultScore.value = parseInt(match[1].trim());
                responseText = responseText.replace(/```[\s\S]*?```/g, "");
            }
            interviewResult.value = responseText;
            scrollToBottom();
        });
    } catch (error) {
        console.error("AI 处理失败:", error);
        messages.value.push({ role: "assistant", content: "AI 处理失败，请稍后再试。" });
    } finally {
        isLoading.value = false;
    }
};

//重新开始面试
const restart = () => {
    messages.value = [];
    end.value = false;
    interviewResult.value = "";
    interviewResultScore.value = 0;
    userChoose.value = undefined;
    message.value.content = "";
};
</script>

<style scoped lang="scss">
.chat-container {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .chat-history {
        flex: 1;
        overflow-y: auto;
        padding: 30px 30px 0 30px;
        display: flex;
        flex-direction: column;
        gap: 20px;

        /* 滚动条 */
        &::-webkit-scrollbar {
            width: 3px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: #b8b8b8;
            border-radius: 3px;
        }
    }

    .button-group {
        display: flex;
        gap: 8px;
        justify-content: center;
    }

    .message-item {
        display: flex;
        gap: 12px;
        max-width: 85%;
        margin: 8px 0;
    }

    .message-item.assistant {
        align-self: flex-start;
    }

    /* 表示同时具有message-item 和 user */
    .message-item.user {
        align-self: flex-end;
    }

    .message-content {
        padding: 12px 16px;
        border-radius: 12px;
        position: relative;
        min-width: 60px;
        max-width: 100%;
        overflow-wrap: break-word;
        background-color: #f3f3f3;
    }

    .message-text {
        /* 控制​​非CJK文本​​（中文/日文/韩文除外）的换行方式 */
        word-break: break-word;
        max-width: 100%;

        line-height: 1.6;
        :deep(p) {
            font-size: 14px;
        }
        :deep(ul),
        :deep(ol) {
            margin: 8px 0;
            padding-left: 20px;
        }
        :deep(li) {
            margin: 4px 0;
            line-height: 1.6;
        }
    }

    .assistant .message-content {
        background: #fafafa;
        border-bottom-left-radius: 4px;
        border: 1px solid #e8e8e8;
        color: #333;
    }

    .user .message-content {
        background: #e6f1ff;
        border-bottom-right-radius: 4px;
        color: #333;
    }

    .interview-result {
        text-align: center;
        width: 100%;
        padding: 20px 0;
    }

    .result-content {
        text-align: left;
        padding: 10px;

        :deep(p) {
            margin: 8px 0 !important;
            line-height: 1.6;
        }

        :deep(ol),
        :deep(ul) {
            margin: 8px 0;
            padding-left: 20px;
        }

        :deep(li) {
            margin: 4px 0;
            line-height: 1.6;
        }
    }

    /* 隐藏系统提示信息 */
    .system {
        display: none;
    }
}
</style>
