// stores/linkStore.js

import { defineStore } from 'pinia';
import { PocketBaseService } from '../service/pocketBaseService';
import type { TagModel } from '../model/TagModel';

const pbService = new PocketBaseService();
export const useTagStore = defineStore('tagStore', {
    state: () => ({
        tags: [] as TagModel[]
    }),
    actions: {
        async getTagsFromBackend() {
            this.tags = (await pbService.GetTags()) as TagModel[];
        },
    },
    getters: {
        getAllTags(): TagModel[] {
            return this.tags;
        }
    }
});