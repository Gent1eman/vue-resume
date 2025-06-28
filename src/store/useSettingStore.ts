import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useSettingStore = defineStore("setting", () => {
    // 默认值
    const defaults = {
        themeColor: "#1677ff",
        lineHeight: 2,
        moduleSpace: 10 // 单位px
    };

    // 主题颜色
    const themeColor = ref<string>(localStorage.getItem("themeColor") || defaults.themeColor);
    const lineHeight = ref<number>(parseFloat(localStorage.getItem("lineHeight") || defaults.lineHeight.toString()));
    const moduleSpace = ref<number>(parseInt(localStorage.getItem("moduleSpace") || defaults.moduleSpace.toString()));

    // 监听变化自动保存到localStorage
    watch([themeColor, lineHeight, moduleSpace], () => {
        console.log(1);

        localStorage.setItem("themeColor", themeColor.value);
        localStorage.setItem("lineHeight", lineHeight.value.toString());
        localStorage.setItem("moduleSpace", moduleSpace.value.toString());
    });

    // 重置默认值
    const resetToDefaults = () => {
        themeColor.value = defaults.themeColor;
        lineHeight.value = defaults.lineHeight;
        moduleSpace.value = defaults.moduleSpace;
    };

    return {
        themeColor,
        lineHeight,
        moduleSpace,
        resetToDefaults
    };
});
