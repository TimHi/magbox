import PocketBase from 'pocketbase';
import { useUserStore } from '../stores/user';
import type { LinkModel } from '../model/linkModel';
import type { DocumentPreview } from '../model/previewModel';
import type { TagModel } from '../model/TagModel';
export class PocketBaseService {
  private pocketBase: PocketBase;

  constructor() {
    this.pocketBase = new PocketBase(import.meta.env.VITE_PB_BACKEND);
  }
  async SignInUsingOAuth2(): Promise<void> {
    const user = useUserStore();
    if (import.meta.env.MODE === 'test') {
      user.setLoginStats(true);
    } else {
      return this.pocketBase
        .collection('users')
        .authWithOAuth2({ provider: 'discord' })
        .then(() => {
          if (
            this.pocketBase.authStore.isValid &&
            this.pocketBase.authStore.token !== undefined &&
            this.pocketBase.authStore.model
          ) {
            user.setLoginStats(true);
          } else {
            user.setLoginStats(false);
          }
        });
    }
  }

  IsUserLoggedIn(): boolean {
    return this.pocketBase.authStore.isValid;
  }

  async GetLinks() {
    try {
      return await this.pocketBase.collection('links').getFullList();
    } catch (err: unknown) {
      this.handleAuthError();
      console.error(err);
      return [];
    }
  }

  async GetTags() {
    try {
      return await this.pocketBase.collection('categories').getFullList();
    } catch (err: unknown) {
      this.handleAuthError();
      console.error(err);
      return [];
    }
  }

  GetPreview(url: string): Promise<DocumentPreview | undefined> {
    const encodedUrl = encodeURIComponent(encodeURIComponent(url));
    const requestUrl = new URL(import.meta.env.VITE_PB_BACKEND + 'api/url_preview/' + encodedUrl);
    // Log: http://localhost:9000/url_preview/https%3A%2F%2Fwww.strava.com%2Fdashboard
    console.log(requestUrl)
    return fetch(requestUrl)
      .then((res) => res.json())
      .then((res) => {
        if (res === 'Error Scraping') {
          return undefined;
        }
        return res as DocumentPreview;
      });
  }

  async CreateLink(
    link: string,
    preview: DocumentPreview | undefined,
    categories: string[],
    read = false
  ): Promise<LinkModel | undefined> {
    const data = {
      link: link,
      description: preview?.Description ?? '',
      tagsFK: [],
      userFK: this.pocketBase.authStore.record?.id,
      read: read,
      categorie: categories,
      title: preview?.Title ?? '',
      image: (preview?.Images.length ?? 0) > 0 ? preview?.Images[0] : ''
    };

    try {
      return await this.pocketBase.collection('links').create(data);
    } catch (err: unknown) {
      this.handleAuthError();
      console.error(err);
    }
  }

  async CreateTag(name: string): Promise<TagModel | undefined> {
    const data = {
      name: name,
      userFK: this.pocketBase.authStore.model?.id
    };
    try {
      return await this.pocketBase.collection('categories').create(data);
    } catch (err: unknown) {
      this.handleAuthError();
      console.error(err);
    }
  }

  async UpdateLink(link: LinkModel) {
    const record = await this.pocketBase.collection('links').update(link.id, link);
    return record;
  }

  async DeleteLinkEntry(id: string): Promise<boolean> {
    try {
      return this.pocketBase.collection('links').delete(id);
    } catch (err: unknown) {
      this.handleAuthError();
      console.error(err);
      return false;
    }
  }

  Logout() {
    const user = useUserStore();
    user.setLoginStats(false);
    this.pocketBase.authStore.clear();
  }

  handleAuthError() {
    this.Logout();
  }
}
