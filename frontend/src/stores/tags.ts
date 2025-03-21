// stores/linkStore.js

import { defineStore } from 'pinia';
import { PocketBaseService } from '../service/pocketBaseService';
import type { TagModel } from '../model/TagModel';

export const useTagStore = defineStore('tagStore', {
  state: () => ({
    pbService: new PocketBaseService(),
    tags: [] as TagModel[]
  }),
  actions: {
    async getTagsFromBackend() {
      this.tags = (await this.pbService.GetTags()) as TagModel[];
    },
    async addTag(tagName: string) {
      const result = await this.pbService.CreateTag(tagName);
      if (result) {
        this.tags.push(result);
      }
      return result;
    },
    doesTagExist(tagName: string) {
      return this.tags.find((t) => t.name.toLowerCase() === tagName.toLowerCase()) !== undefined;
    },
    async getAllTags(): Promise<TagModel[]> {
      const tags = (await this.pbService.GetTags()) as TagModel[];
      this.tags = tags;
      return tags;
    }
  }
});
