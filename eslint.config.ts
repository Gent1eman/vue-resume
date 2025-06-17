import { globalIgnores } from "eslint/config";
import { defineConfigWithVueTs, vueTsConfigs } from "@vue/eslint-config-typescript";
import pluginVue from "eslint-plugin-vue";
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting";

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
    {
        name: "app/files-to-lint",
        files: ["**/*.{ts,mts,tsx,vue}"]
    },

    globalIgnores(["**/dist/**", "**/dist-ssr/**", "**/coverage/**"]),

    pluginVue.configs["flat/essential"],
    vueTsConfigs.recommended,
    skipFormatting,

    // 自定义规则
    {
        rules: {
            "no-case-declarations": "off",
            "no-constant-condition": "off",
            "@typescript-eslint/ban-ts-comment": "off",
            "@typescript-eslint/no-unused-vars": "off",
            "@typescript-eslint/no-var-requires": "off",
            "no-unused-vars": "off",
            "@typescript-eslint/no-explicit-any": "off"
        }
    }
);
