import PocketBase, { ClientResponseError } from 'pocketbase';
import { useUserStore } from '../stores/user';
import type { LinkModel } from '../model/linkModel';
import { useLinkStore } from '../stores/links';
import type { DocumentPreview } from '../model/previewModel';
export class PocketBaseService {
    private pocketBase: PocketBase;

    constructor() {
        this.pocketBase = new PocketBase(import.meta.env.VITE_PB_BACKEND);

    }
    async SignInUsingOAuth2(): Promise<void> {
        const user = useUserStore();
        const linkStore = useLinkStore();
        return this.pocketBase.collection('users').authWithOAuth2({ provider: 'discord' }).then(() => {
            if (
                this.pocketBase.authStore.isValid &&
                this.pocketBase.authStore.token !== undefined &&
                this.pocketBase.authStore.model
            ) {
                user.setLoginStats(true);
                linkStore.fetchLinks();
            } else {
                user.setLoginStats(false);
            }
        });
    }

    IsUserLoggedIn(): boolean {
        return this.pocketBase.authStore.isValid;
    }

    async GetLinks(): Promise<LinkModel[]> {
        try {
            const links: LinkModel[] = await this.pocketBase.collection('links').getFullList();
            if (links === undefined) { return [] as LinkModel[]; } else {
                return links;
            }
        } catch (err: unknown) {
            if (err instanceof ClientResponseError) {
                this.handleAuthError(err);
            } else {
                console.error(err);
            }
            return [] as LinkModel[];
        }
    }

    GetPreview(url: string): Promise<DocumentPreview | undefined> {
        return fetch(import.meta.env.VITE_PB_BACKEND + 'api/url_preview/' + url)
            .then(res => res.json())
            .then(res => {
                if (res === "Error Scraping") { return undefined; }
                return res as DocumentPreview
            });
    }

    async CreateLink(link: string, preview: DocumentPreview | undefined, read = false): Promise<LinkModel | undefined> {
        const data = {
            "link": link,
            "description": preview?.Description ?? "",
            "tagsFK": [
            ],
            "userFK": this.pocketBase.authStore.model?.id,
            "read": read,
            "categorie": [
            ],
            title: preview?.Title ?? "",
            "image": (preview?.Images.length ?? 0) > 0 ? preview?.Images[0] : "",
        };

        try {
            return await this.pocketBase.collection('links').create(data);
        } catch (err: unknown) {
            console.error(err);
            if (err instanceof ClientResponseError) {
                this.handleAuthError(err);
            }
        }
    }

    async DeleteLinkEntry(id: string): Promise<boolean> {
        try {
            return await this.pocketBase.collection('links').delete(id);
        } catch (err: unknown) {
            console.error(err);
            if (err instanceof ClientResponseError) {
                this.handleAuthError(err);
            }
            return false;
        }
    }

    Logout() {
        const links = useLinkStore();
        const user = useUserStore();
        user.setLoginStats(false);
        links.clearLinks();
        this.pocketBase.authStore.clear();
    }

    handleAuthError(err: ClientResponseError) {
        this.Logout();
        throw err;
    }
}
