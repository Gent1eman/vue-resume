// src/types/pdfmake-vfs.d.ts
declare module "pdfmake/build/vfs_fonts" {
    const vfsFonts: {
        pdfMake: {
            vfs: Record<string, string>;
        };
    };
    export = vfsFonts;
}
