// 个人基本信息
export interface BasicInfoType {
    name: string;
    phone: string;
    email: string;
    gender: string;
    age: number;
    website: string;
    github: string;
    applicationPosition: string;
    politicalStatus: string;
    avatar: string;
}

// 教育信息（可能有多个）
export interface EducationType {
    id: number;
    school: string;
    major: string;
    degree: string;
    gpa: string;
    startDate: string;
    endDate: string;
    description: string;
}

// 工作经历（可能有多个）
export interface WorkExperienceType {
    id: number;
    company: string;
    position: string;
    department: string;
    plcae: string;
    workType: string;
    startDate: string | null;
    endDate: string | null;
    description: string;
}

// 项目经历（可能有多个）
export interface ProjectType {
    id: number;
    projectName: string;
    role: string;
    startDate: string;
    endDate: string;
    description: string;
}

// 实习经历（可能有多个）
export interface InternshipType {
    id: number;
    company: string;
    position: string;
    plcae: string;
    startDate: string | null;
    endDate: string | null;
    description: string;
}

// 简历数据类型
export interface ResumeStateType {
    basicInfo: BasicInfoType;
    education: EducationType[];
    workExperience: WorkExperienceType[];
    skills: string;
    projects: ProjectType[];
    internships: InternshipType[];
    awards: string;
    selfEval: string;
    research: string;
    campus: string;
    certificates: string;

    currentId: number;
    isFirstVisit: boolean;
}
