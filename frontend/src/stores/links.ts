// stores/linkStore.js

import { defineStore } from 'pinia';
import type { LinkModel } from '../model/linkModel';
import { PocketBaseService } from '../service/pocketBaseService';
import type { DocumentPreview } from '../model/previewModel';

const pbService = new PocketBaseService();
export const useLinkStore = defineStore('linkStore', {
  state: () => ({
    links: [] as LinkModel[]
  }),
  actions: {
    async getLinksFromBackend() {
      this.links = (await pbService.GetLinks()) as LinkModel[];
    },
    async addLink(link: string, preview: DocumentPreview | undefined, read = false) {
      const result = await pbService.CreateLink(link, preview, read);
      if (result) {
        this.links.push(result);
      }
    },
    async removeLink(id: string) {
      const result = await pbService.DeleteLinkEntry(id);
      if (result) {
        this.links = this.links.filter((v) => v.id !== id);
      }
    }
  },
  getters: {
    getAllLinks(): LinkModel[] {
      return this.links;
    }
  }
});
