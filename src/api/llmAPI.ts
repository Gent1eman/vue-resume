import { computed } from "vue";
import { useSettingStore } from "@/store";
import type { DialogueHistory } from "@/types/aiDialogue";
import { WorkerPool } from "@/worker/workerPool";

// 读取用户设置的API和API key
const settingStore = useSettingStore();

const API_URL = computed(() => settingStore.settings.llmConfig.apiUrl);
const userApiKey = computed(() => settingStore.settings.llmConfig.apiKey);
const model = computed(() => settingStore.settings.llmConfig.modelName);
// 创建线程池
const workerPool = new WorkerPool(4);
export async function sendToLLMDialogue(messages: DialogueHistory, onResponse: (responseText: string, isComplete: boolean) => void): Promise<void> {
    workerPool.execute(messages, userApiKey.value, model.value, API_URL.value, onResponse);
}
