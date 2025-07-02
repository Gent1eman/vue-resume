<template>
    <div class="settings-wrapper">
        <div class="setting-container">
            <h2 class="title">大模型接口配置</h2>
            <p class="tips">
                注意：此处调用接口使用的是 OpenAI 的接口格式 （换言之，只要你的大模型接口厂商使用的是 OpenAI 格式，你填入都能正常调用接口）
                <span style="color: red">默认值不会改请不要动！！要是完全不会，就只填apikey就行了，点击链接前往获取key，填入即可</span>
                <br />
                <br />
                <span style="color: #672dea; font-weight: 600"
                    >这里先借用
                    <a href="https://github.com/weidong-repo/AIResume" target="_blank" style="color: #672dea; text-decoration: underline"
                        >weidong-repo( AIResume )</a
                    >
                    的反向代理链接</span
                >
            </p>

            <div class="input-group">
                <label for="api-url">大模型名称<span style="color: red">（不懂勿改）</span></label>
                <a-input id="api-url" v-model:value="settingStore.settings.llmConfig.modelName" placeholder="请输入模型名称" />
                <p class="tips">
                    如果用我的反代地址，请使用阿里的大模型，如果不会配置，请勿修改，默认为"qwen-turbo"
                    <a href="https://bailian.console.aliyun.com/#/model-market" target="_blank"> 查看阿里百炼模型大全 </a>。
                </p>
            </div>

            <div class="input-group">
                <label for="api-key">API Key</label>
                <a-input id="api-key" v-model:value="settingStore.settings.llmConfig.apiKey" placeholder="请输入 API Key" />
                <p class="tips">
                    请填写 API Key 用于调用 AI 模型。如果下面使用的是我提供的反代地址，请前往阿里云获取
                    <a href="https://bailian.console.aliyun.com/?apiKey=1#/api-key" target="_blank">阿里云百炼 API Key</a>。
                </p>
            </div>

            <div class="input-group">
                <label for="api-url">API URL<span style="color: red">（不懂勿改）</span></label>
                <a-input id="api-url" v-model:value="settingStore.settings.llmConfig.apiUrl" placeholder="请输入 API URL" />
                <p class="tips">
                    请填写 API URL（经过反向代理，解决跨域问题），用于调用 AI 模型。或者直接使用我提供的反代地址： https://resumeai.404.pub/
                    （该地址仅适用于阿里云百炼 API Key）。
                    <a href="https://help.aliyun.com/zh/model-studio/developer-reference/use-qwen-by-calling-api" target="_blank"> 查看阿里百炼官方文档 </a>。
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useSettingStore } from "@/store";
const settingStore = useSettingStore();
</script>

<style scoped lang="scss">
.settings-wrapper {
    height: 100%;
    overflow-y: auto;
    .setting-container {
        height: 750px;
        width: 600px;
        background-color: #ffffff;
        margin: 30px auto;
        padding: 25px 40px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }

    .title {
        margin-top: 10px;
        color: #1677ff;
        font-size: 22px;
        font-weight: bold;
        margin-bottom: 30px;
        text-align: center;
    }

    .tips {
        font-size: 13px;
        background: rgba(0, 0, 0, 0.05);
        padding: 10px;
        border-radius: 8px;
        line-height: 1.5;
        text-align: justify;
        margin-bottom: 24px;
    }

    label {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 4px;
    }

    .input-group {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .tips a {
        color: #1677ff;
        font-weight: 600;
        text-decoration: none;
        transition: color 0.3s;
    }

    .tips a:hover {
        color: rgba(0, 0, 0, 0.3);
        text-decoration: underline;
    }
}
</style>
