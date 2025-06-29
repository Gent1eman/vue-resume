import { resumeTemplate } from "@/data/resumeDataTemplate";
import type { BasicInfoType, EducationType, InternshipType, ProjectType, ResumeStateType, WorkExperienceType } from "@/types/resume";
import { defineStore } from "pinia";
import { message } from "ant-design-vue";

export const useResumeStore = defineStore("resume", {
    state: (): ResumeStateType => {
        // 从localStoreage获取保存的数据
        const savedResumeData = localStorage.getItem("resumeData");
        const savedCurrentId = localStorage.getItem("currentId");
        // 检查是否首次访问
        const isFirstVisit = localStorage.getItem("isFirstVisit") === null;
        const currentId = savedCurrentId && !isNaN(Number(savedCurrentId)) ? Number(savedCurrentId) : 1;

        // 此处首先用木板数据初始化，然后再从localstorage中读取数据
        // 这样做的好处是，程序更新后，新增的字段会字段添加到模板中
        // 执行深拷贝
        let resumeData = JSON.parse(JSON.stringify(resumeTemplate));

        // 如果本地有保存过的数据，则合并覆盖模板数据
        if (savedResumeData) {
            try {
                const parsed = JSON.parse(savedResumeData);
                resumeData = { ...resumeData, ...parsed };
            } catch (e) {
                console.error("解析 localStorage 失败", e);
            }
        }

        // 如果是首次访问，标记并自动填充数据
        if (isFirstVisit) {
            localStorage.setItem("isFirstVisit", "false");
        }

        return {
            ...resumeData,
            currentId,
            isFirstVisit
        };
    },

    actions: {
        /**
         * 初始化数据
         * 初始化时检查最大id，后面新增的时候，id是递增的
         */
        initializeCurrentId() {
            const allIds = [
                // 所有教学信息的id
                ...this.education.map(item => item.id),
                // 所有工作经历的id
                ...this.workExperience.map(item => item.id),
                // 所有项目经历的id
                ...this.projects.map(item => item.id),
                // 所有实习经历的id
                ...this.internships.map(item => item.id)
            ];

            this.currentId = allIds.length > 0 ? Math.max(...allIds) + 1 : 1;
            localStorage.setItem("currentId", JSON.stringify(this.currentId));
        },

        // todo 导出JSON数据

        // todo 导入JSON数据

        // 自动填充数据
        async autoFillData() {
            try {
                const response = await fetch("/resumeData.json");
                const data = await response.json();
                // 保持 isFirstVisit不变
                this.$state = { ...data, isFirstVisit: false };
                this.saveToLocalStorage();
                message.success("数据已初始");
            } catch (error) {
                message.error("数据初始化失败");
            }
        },

        /**
         * 保存到 localStorage
         */
        saveToLocalStorage() {
            // $state 就是存储在 store 中的所有数据
            localStorage.setItem("resumeData", JSON.stringify(this.$state));
            localStorage.setItem("currentId", JSON.stringify(this.currentId));
        },

        /**
         * 通用新增方法
         * @param list 现在已有的数据
         * @param newItem 新添加的数据
         * Omit<T, 'id'> - 排除 id 属性
         */
        addItem<T extends { id: number }>(list: T[], newItem: Omit<T, "id">) {
            const newEntry = { ...newItem, id: this.currentId++ } as T;
            list.push(newEntry);
            this.saveToLocalStorage();
        },

        /**
         * 通用删除方法
         * @param list 现在已有的数据
         * @param id 要删除数据的id
         */
        deleteItem<T extends { id: number }>(list: T[], id: number) {
            const index = list.findIndex(item => item.id === id);
            if (index !== -1) {
                // 删除操作
                list.splice(index, 1);
                this.saveToLocalStorage();
            }
        },

        /**
         * 通用更新方法
         * @param list 现在已有数据
         * @param updatedItem 要更新的数据的id
         */
        updateItem<T extends { id: number }>(list: T[], updatedItem: T) {
            const index = list.findIndex(item => item.id === updatedItem.id);
            if (index !== -1) {
                list[index] = updatedItem;
                this.saveToLocalStorage();
            }
        },

        /**
         * 更新个人信息
         * @param updatedInfo 要更新的信息
         * Partial<T>：它会将类型 T 中的每个属性变为可选属性
         */
        updateBasicInfo(updatedInfo: Partial<BasicInfoType>) {
            this.basicInfo = { ...this.basicInfo, ...updatedInfo };
            this.saveToLocalStorage();
        },

        /**
         * 更新专业技能
         * @param updatedSkills 要更新的信息
         */
        updateSkill(updatedSkills: string) {
            this.skills = updatedSkills;
            this.saveToLocalStorage();
        },

        /**
         * 更新获奖信息
         * @param updatedAwards 要更新的信息
         */
        updateAward(updatedAwards: string) {
            this.awards = updatedAwards;
            this.saveToLocalStorage();
        },

        /**
         * 更新自我评价
         * @param updatedSelfEval 要更新的信息
         */
        updateSelftEval(updatedSelfEval: string) {
            this.selfEval = updatedSelfEval;
            this.saveToLocalStorage();
        },

        /**
         * 更新科研成果
         * @param updatedResearch 要更新的信息
         */
        updateResearch(updatedResearch: string) {
            this.research = updatedResearch;
            this.saveToLocalStorage();
        },

        /**
         * 更新科研成果
         * @param updatedCampus 要更新的信息
         */
        updateCampus(updatedCampus: string) {
            this.campus = updatedCampus;
            this.saveToLocalStorage();
        },

        /**
         * 更新证书信息
         * @param updatedCertificates 要更新的信息
         */
        updateCertificates(updatedCertificates: string) {
            this.certificates = updatedCertificates;
            this.saveToLocalStorage();
        },

        // 新增教育背景
        // Omit<T, 'id'> - 排除 id 属性
        addEducation(newItem: Omit<EducationType, "id">) {
            this.addItem(this.education, newItem);
        },

        // 删除教育背景
        deleteEducation(id: number) {
            this.deleteItem(this.education, id);
        },

        // 更新教育背景
        updateEducation(updatedItem: EducationType) {
            this.updateItem(this.education, updatedItem);
        },

        // 新增工作经历
        addWorkExperience(newItem: Omit<WorkExperienceType, "id">) {
            this.addItem(this.workExperience, newItem);
        },

        // 删除工作经历
        deleteWorkExperience(id: number) {
            this.deleteItem(this.workExperience, id);
        },

        // 更新工作经历
        updateWorkExperience(updatedItem: WorkExperienceType) {
            this.updateItem(this.workExperience, updatedItem);
        },

        // 新增项目经历
        addProject(newItem: Omit<ProjectType, "id">) {
            this.addItem(this.projects, newItem);
        },

        // 删除项目经历
        deleteProject(id: number) {
            this.deleteItem(this.projects, id);
        },

        // 更新项目经历
        updateProject(updateItem: ProjectType) {
            this.updateItem(this.projects, updateItem);
        },

        // 新增实习经历
        addInternship(newItem: Omit<InternshipType, "id">) {
            this.addItem(this.internships, newItem);
        },

        // 删除实习经历
        deleteInternship(id: number) {
            this.deleteItem(this.internships, id);
        },

        // 更新实习经历
        updateInternship(updateItem: InternshipType) {
            this.updateItem(this.internships, updateItem);
        },

        // 加载本地存储的数据
        loadFromLocalStorage() {
            const stored = localStorage.getItem("resumeStore");
            if (stored) {
                this.$state = JSON.parse(stored);
            }
        },

        // 初始化检查
        async initCheck() {
            if (this.isFirstVisit) {
                await this.autoFillData();
            }
        }
    }
});
