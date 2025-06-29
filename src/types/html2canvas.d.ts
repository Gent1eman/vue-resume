import "html2canvas";
declare module "html2canvas" {
    interface Options {
        dpi?: number;
    }
}
