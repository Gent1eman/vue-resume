/// <reference types="vite/client" />
// 对组件进行类型声明;
declare module "*.vue" {
    import { DefineComponent } from "vue";
    const component: DefineComponent;
    export default component;
}
