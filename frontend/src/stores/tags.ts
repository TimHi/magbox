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
    async addTag(tagName: string) {
      const result = await pbService.CreateTag(tagName);
      if (result) {
        this.tags.push(result);
      }
      return result;
    },
    doesTagExist(tagName: string) {
      const doesTagExist =
        this.tags.find((t) => t.name.toLowerCase() === tagName.toLowerCase()) !== undefined;
      return doesTagExist;
    }
  },
  getters: {
    getAllTags(): TagModel[] {
      return this.tags;
    }
  }
});
