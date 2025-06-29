<template>
    <div class="navbar">
        <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" />
    </div>
</template>

<script lang="ts" setup>
import { h, ref, watch } from "vue";
import { SettingOutlined, EditOutlined, MessageOutlined } from "@ant-design/icons-vue";
import type { MenuProps } from "ant-design-vue";
import router from "@/router";
import { useRoute } from "vue-router";

const route = useRoute();
const current = ref<string[]>([route.name as string]);

watch(
    () => route.name,
    name => {
        if (name) current.value = [name.toString()];
    },
    { immediate: true }
);
const items = ref<MenuProps["items"]>([
    {
        key: "edit",
        icon: () => h(EditOutlined),
        label: "简历编辑",
        onClick: () => router.push("/resume/edit")
    },
    // {
    //     key: "template",
    //     icon: () => h(AppstoreOutlined),
    //     label: "简历模板",
    //     onClick: () => router.push("/resume/template")
    // },
    {
        key: "aiDeep",
        icon: () => h(MessageOutlined),
        label: "AI深度交流",
        onClick: () => router.push("/resume/aiDeep")
    },
    {
        key: "setting",
        icon: () => h(SettingOutlined),
        label: "网站配置",
        onClick: () => router.push("/resume/setting")
    }
]);
</script>

<style scoped>
.navbar {
    background: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.03);
}
</style>
