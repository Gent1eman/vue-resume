/// <reference types="vite/client" />
// 对组件进行类型声明;
declare module "*.vue" {
    import { DefineComponent } from "vue";
    const component: DefineComponent;
    export default component;
}
// 富文本编辑器类型声明
declare module "@wangeditor/editor-for-vue" {
    const Editor: any;
    const Toolbar: any;
    type IEditorConfig = any;
}

declare module "@kangc/v-md-editor" {
    import { DefineComponent } from "vue";

    const VMdEditor: DefineComponent<{
        modelValue: string;
        height?: string | number;
        mode?: "edit" | "preview";
        disabled?: boolean;
        // 添加其他需要的props
    }>;

    export default VMdEditor;
}

declare module "@kangc/v-md-editor/lib/theme/vuepress.js" {
    const theme: any;
    export default theme;
}

declare module "@kangc/v-md-editor/lib/preview" {
    const VMdPreview: any;
    export default VMdPreview;
}
