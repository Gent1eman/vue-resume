<template>
    <div class="module-card">
        <div class="left">
            <a-space>
                <MenuOutlined style="color: #9ca3af" />
                <component :is="icon" class="text-blue" />
                <span>{{ title }}</span>
            </a-space>
        </div>
        <div class="right">
            <a-space>
                <a-checkbox v-model:checked="modules[props.id]" />
                <EyeOutlined v-if="checked" class="text-green" />
                <EyeInvisibleOutlined v-else class="text-dark" />
                <span :class="{ 'text-green': checked, 'text-dark': !checked }">显示</span>
            </a-space>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { MenuOutlined, EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons-vue";
import { useSettingStore } from "@/store";
import { ref } from "vue";

const props = defineProps<{
    id: string;
    title: string;
    icon: any;
}>();

const settingStore = useSettingStore();
const { settings } = settingStore;
const { modules } = settings;

const checked = ref(true);
</script>

<style scoped lang="scss">
.module-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 48px;
    width: 390px;
    background-color: #fff;
    padding: 12px;
    border-radius: 6px;
    margin-bottom: 4px;
    cursor: pointer;
    border: 1px solid #e7e9ec;

    .text-blue {
        color: #1677ff;
    }

    .text-green {
        color: rgb(22, 163, 74, 1);
    }

    .text-dark {
        color: rgb(156, 163, 175, 1);
    }
}
</style>
