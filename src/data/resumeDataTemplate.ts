export const resumeTemplate = {
    // 基本信息
    basicInfo: {
        name: "", // 姓名
        phone: "", // 联系电话
        email: "", // 电子邮箱
        gender: "", // 性别
        age: "", // 年龄
        website: "", // 个人网站
        github: "", // github网站
        applicationPosition: "", // 申请职位
        politicalStatus: "", // 政治面貌
        avatar: "" // 头像
    },

    // 教育经历
    education: [
        {
            id: 1, // 唯一标识
            school: "", // 学校名称
            major: "", // 专业
            degree: "", // 学位
            gpa: "",
            description: "", // 描述
            startDate: "", // 开始时间
            endDate: "" // 结束时间1
        }
    ],

    // 工作经验
    workExperience: [
        {
            id: 2, // 唯一标识
            company: "", // 公司名称
            position: "", // 职位
            department: "", // 部门
            place: "",
            workType: "", // 工作类型
            startDate: "", // 开始时间
            endDate: "", // 结束时间
            description: "" // 描述
        }
    ],

    // 专业技能
    skills: {
        skillContent: "" // 专业技能内容
    },

    // 项目经验
    projects: [
        {
            id: 3, // 唯一标识
            projectName: "", // 项目名称
            role: "", // 担任角色
            startDate: "", // 开始时间
            endDate: "", // 结束时间
            description: "" // 项目描述
        }
    ],

    internships: [
        {
            id: 4, // 唯一标识
            company: "", // 公司名称
            position: "", // 职位
            place: "", // 工作地点
            startDate: "", // 开始时间
            endDate: "", // 结束时间
            description: "" // 描述
        }
    ],

    // 荣誉奖项
    awards: {
        awardContent: "" // 获奖内容
    },

    // 自我评价
    selfEval: "", // 自我评价内容

    // 科研成果
    research: "", // 科研成果内容

    // 校园经历
    campus: "", // 校园经历内容

    // 证书信息
    certificates: "" // 证书信息内容
} as const;
