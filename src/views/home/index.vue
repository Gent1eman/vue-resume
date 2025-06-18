<template>
    <div class="home">
        <a-space direction="vertical" align="center" size="large">
            <div class="title">
                <h1>欢迎使用<span class="text-color">简历工坊</span></h1>
                <p>专业的简历创建工具，让您轻松制作出色的简历，提升求职竞争力</p>
            </div>

            <a-button type="primary" size="large" @click="handleUse">开始使用</a-button>
        </a-space>
    </div>
</template>

<script lang="ts" setup>
import router from "@/router";

const handleUse = () => {
    router.push("/resume/edit");
};
</script>

<style scoped lang="scss">
.home {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .title {
        text-align: center;
        h1 {
            font-weight: 700;
            font-size: 40px;
        }
        p {
            font-size: 18px;
            color: #757575;
        }
        .text-color {
            color: #1890ff;
        }
    }
    /* 设置背景图片 */
    background: url("../../assets/image/home-bg.svg");
}
</style>
