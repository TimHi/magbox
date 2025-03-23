import type { LinkModel } from '@/model/linkModel';
import type { DocumentPreview } from '@/model/previewModel';
import { PocketBaseService } from '@/service/pocketBaseService';
import { defineStore } from 'pinia';

export const useLinkStore = defineStore('linkStore', {
  state: () => ({
    pbService: new PocketBaseService(),
    links: [] as LinkModel[],
  }),
  actions: {
    async deleteLink(link: LinkModel){
      const success = await this.pbService.DeleteLinkEntry(link.id);
      console.log(success);
      console.log(this.links.length);
      if(success){
        this.links = this.links.filter((l) => l.id !== link.id);
      }
      console.log(this.links.length);
    },
    async fetchAllLinks() {
      const result = await this.pbService.GetAllLinks();
      if (result) {
        this.links = result;
      }
    },
    async updateLink(updatedLink: LinkModel) {
      const result = (await this.pbService.UpdateLink(
        updatedLink,
      )) as LinkModel;
      if (result) {
        const index = this.links.findIndex(
          (link) => link.id === updatedLink.id,
        );
        if (index !== -1) {
          this.links[index] = result;
        }
      }
    },
    async createLink(
      newLink: string,
      preview: DocumentPreview | undefined,
      categories: string[],
    ) {
      const result = await this.pbService.CreateLink(
        newLink,
        preview,
        categories,
      );
      if (result) {
        this.links.push(result);
      }
    },
  },
  getters: {
    GetBoxedLinks: (state) => {
      return state.links.filter((link) => link.boxed === true);
    },
    GetUnsortedLinks: (state) => {
      return state.links.filter((link) => link.boxed === false);
    },
  },
});
