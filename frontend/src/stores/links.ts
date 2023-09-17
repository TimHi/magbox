// stores/linkStore.js

import { defineStore } from 'pinia';
import type { LinkModel } from '../model/linkModel';
import { PocketBaseService } from '../service/pocketBaseService';


export const useLinkStore = defineStore('linkStore', {
    state: () => ({
        links: [] as LinkModel[],
    }),

    getters: {
        getAllLinks(): LinkModel[] {
            return this.links;
        },
    },

    actions: {
        async fetchLinks() {
            const pb = new PocketBaseService();
            const links = await pb.GetLinks();
            if (links !== undefined) this.links = links;
        },

        addLink(link: LinkModel) {
            this.links.push(link);
        },

        removeLink(link: LinkModel) {
            const index = this.links.indexOf(link);
            if (index !== -1) {
                this.links.splice(index, 1);
            }
        },

        clearLinks() {
            this.links = [];
        },
    },
});
