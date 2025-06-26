<template>
    <div class="container">
        <h2>aiDeep</h2>
        <div class="test-preview">
            <div class="drag-wrapper">
                <VueDraggable
                    ref="el"
                    v-model="list"
                    :animation="150"
                    ghostClass="ghost"
                    class="flex flex-col gap-2 p-4 w-300px h-300px m-auto bg-gray-500/5 rounded"
                >
                    <template v-for="item in list" :key="item.id">
                        <module-card :title="item.name" :icon="item.icon" />
                    </template>
                </VueDraggable>
            </div>
            <div>
                <div class="preview-container">
                    <h3>列表预览</h3>
                    <pre>{{ JSON.stringify(list, null, 2) }}</pre>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import ModuleCard from "@/components/moduleCard/index.vue";
import { type UseDraggableReturn, VueDraggable } from "vue-draggable-plus";
import { moduleArray } from "@/utils/module-sort.ts";
const list = ref(moduleArray);

const el = ref<UseDraggableReturn>();
</script>

<style scoped>
.container {
    padding: 20px;
    background-color: pink;
}

.test-preview {
    display: flex;
    justify-content: space-around;
}
.drag-wrapper {
    background-color: rgb(229, 231, 235, 1);
    display: inline;
    padding: 8px;
}

.ghost {
    opacity: 0.5;
    background: #c8ebfb;
}
</style>
