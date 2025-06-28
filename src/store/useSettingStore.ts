import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { moduleArray } from "@/utils/module-sort";
export const useSettingStore = defineStore("setting", () => {
    // 默认值
    const defaults = {
        themeColor: "#1677ff",
        lineHeight: 2,
        moduleSpace: 10, // 单位px
        modules: {
            education: true, // 教育背景
            work: true, // 工作经历
            internships: true, // 专业技能
            projects: true, // 项目经历
            skills: true, // 实习经历
            awards: true, // 获奖经历
            selfEval: true, // 自我评价
            research: true, // 科研经历
            campus: true, // 校园经历
            certificates: true // 证书信息
        },
        modulesSort: moduleArray
    };

    // 从loaclStorage初始化（合并默认值）
    const loadSetting = () => {
        const saved = localStorage.getItem("resumeSettings");
        return saved ? JSON.parse(saved) : defaults;
    };

    // 统一响应式状态对象
    const settings = ref(loadSetting());

    // 监听整个对象的变化
    watch(
        () => settings.value,
        newVal => {
            localStorage.setItem("resumeSettings", JSON.stringify(newVal));
        },
        { deep: true }
    );

    // 重置默认值
    const resetToDefaults = () => {
        settings.value = { ...defaults };
    };

    return {
        settings,
        resetToDefaults
    };
});
