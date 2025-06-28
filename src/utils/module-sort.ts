import {
    AppstoreOutlined,
    BookOutlined,
    CodeOutlined,
    ExperimentOutlined,
    ProfileOutlined,
    RiseOutlined,
    SafetyCertificateOutlined,
    SolutionOutlined,
    TeamOutlined,
    TrophyOutlined
} from "@ant-design/icons-vue";

import EducationPreview from "@/components/educationPreview/index.vue";
import WorkPreview from "@/components/workPreview/index.vue";
import InternshipPreview from "@/components/internshipPreview/index.vue";
import ProjectPreview from "@/components/projectPreview/index.vue";
import type { Component } from "vue";

// 模块排序
export const moduleArray = [
    {
        id: "education",
        name: "教育背景",
        icon: BookOutlined
    },
    {
        id: "work",
        name: "工作经历",
        icon: RiseOutlined
    },
    {
        id: "skills",
        name: "专业技能",
        icon: CodeOutlined
    },
    {
        id: "projects",
        name: "项目经历",
        icon: AppstoreOutlined
    },
    {
        id: "internships",
        name: "实习经历",
        icon: SolutionOutlined
    },
    {
        id: "awards",
        name: "获奖经历",
        icon: TrophyOutlined
    },
    {
        id: "selfEval",
        name: "自我评价",
        icon: ProfileOutlined
    },
    {
        id: "research",
        name: "科研经历",
        icon: ExperimentOutlined
    },
    {
        id: "campus",
        name: "校园经历",
        icon: TeamOutlined
    },
    {
        id: "certificates",
        name: "证书信息",
        icon: SafetyCertificateOutlined
    }
];

export const moduleComponents: ModuleComponents = {
    education: EducationPreview,
    work: WorkPreview,
    internships: InternshipPreview,
    projects: ProjectPreview
};

export type ModuleID = "education" | "work" | "internships" | "projects";

export type GeneralModuleID = "skills" | "awards" | "selfEval" | "research" | "campus" | "certificates";

export type ModuleComponents = {
    [K in ModuleID]: Component;
};
