import PocketBase, { ClientResponseError } from 'pocketbase';
import { useUserStore } from '../stores/user';
import { LinkModel } from '../model/linkModel';
import { useLinkStore } from '../stores/links';
import { DocumentPreview } from '../model/previewModel';
export class PocketBaseService {
    private pocketBase: PocketBase;

    constructor() {
        this.pocketBase = new PocketBase('http://127.0.0.1:8090');

    }
    async SignInUsingOAuth2(): Promise<void> {
        const user = useUserStore();
        const linkStore = useLinkStore();
        this.pocketBase.collection('users').authWithOAuth2({ provider: 'discord' }).then(() => {
            if (
                this.pocketBase.authStore.isValid &&
                this.pocketBase.authStore.token !== undefined &&
                this.pocketBase.authStore.model
            ) {
                user.setLoginStats(true);
                linkStore.fetchLinks();
                console.debug("Login successfull");
            } else {
                console.debug('Login failed');
                user.setLoginStats(false);
            }
        });
    }

    IsUserLoggedIn(): boolean {
        return this.pocketBase.authStore.isValid;
    }

    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async GetLinks(): Promise<LinkModel[]> {
        try {
            const links: LinkModel[] = await this.pocketBase.collection('links').getFullList();
            console.log(links);
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
        return fetch('http://localhost:8090/api/url_preview/' + url)
            // the JSON body is taken from the response
            .then(res => res.json())
            .then(res => {
                if (res === "Error Scraping") { return undefined; }
                // The response has an `any` type, so we need to cast
                // it to the `User` type, and return it from the promise
                return res as DocumentPreview
            });
    }

    async CreateLink(link: string, preview: DocumentPreview | undefined, read = false): Promise<LinkModel | undefined> {
        console.log(preview);
        // example create data
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
        console.log(data);
        try {
            return await this.pocketBase.collection('links').create(data);
        } catch (err: unknown) {
            console.error(err);
            if (err instanceof ClientResponseError) {
                this.handleAuthError(err);
            }
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
        //this.Logout();
        throw err;
    }
}
