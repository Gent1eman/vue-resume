<template>
    <div class="ai-deep">
        <div class="left">
            <ai-chat />
        </div>
        <div class="right">
            <user-input />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { provide, ref } from "vue";
import AiChat from "./c-cpns/AiChat.vue";
import UserInput from "./c-cpns/UserInput.vue";

// 子组件之间通信jd（岗位描述） 以及 简历数据
const resumeProject = ref<string>("");
const jd = ref<string>("");

// 为子组件传递值，可以传递响应式，也可以传递非响应式
provide("resumeProject", resumeProject);
provide("jd", jd);
</script>

<style scoped lang="scss">
.ai-deep {
    border-radius: 10px;
    background-color: #ffffff;
    margin: 15px auto;
    box-shadow: 0 0px 10px 0 rgba(53, 53, 53, 0.1);
    padding: 5px;

    display: flex;
    max-width: 80vw;
    height: 85vh;

    .left {
        flex: 1;
    }

    .right {
        width: 30%;
        min-width: 250px;
    }
}
</style>
