import type { LinkModel } from "@/model/linkModel";
import type { DocumentPreview } from "@/model/previewModel";
import { PocketBaseService } from "@/service/pocketBaseService";
import { defineStore } from "pinia";

const pbService = new PocketBaseService();
export const useLinkStore = defineStore('linkStore', {
    state: () => ({
        links: [] as LinkModel[]
    }),
    actions: {
        async fetchAllLinks() {
            const result = await pbService.GetAllLinks();
            if (result) {
                this.links = result;
            }
        },
        async updateLink(updatedLink: LinkModel) {
            const result = await pbService.UpdateLink(updatedLink) as LinkModel;
            if (result) {
                const index = this.links.findIndex(link => link.id === updatedLink.id);
                if (index !== -1) {
                    this.links[index] = result;
                }
            }
        },
        async createLink(newLink: string,
            preview: DocumentPreview | undefined,
            categories: string[]) {
            const result = await pbService.CreateLink(newLink, preview, categories);
            if (result) {
                this.links.push(result);
            }
        }
    },
    getters: {
        GetBoxedLinks: (state) => {
            return state.links.filter(link => link.boxed === true);
        },
        GetUnsortedLinks: (state) => {
            return state.links.filter(link => link.boxed === false);
        }
    }
});
