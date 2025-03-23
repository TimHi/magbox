import PocketBase from 'pocketbase';
import { useUserStore } from '../stores/user';
import type { LinkModel } from '../model/linkModel';
import type { DocumentPreview } from '../model/previewModel';
import type { TagModel } from '../model/TagModel';
import type { UserModel } from '@/model/userModel';
import router from '@/router';

export class PocketBaseService {
  private pocketBase: PocketBase;

  constructor() {
    this.pocketBase = new PocketBase(import.meta.env.VITE_PB_BACKEND);
  }

  getAuthRecord() {
    return this.pocketBase.authStore.record;
  }

  //TODO: Refactor this mess
  //Really just used in e2e Tests, idk about sending the pw in clear text
  async SignInUsingEmail(email: string, password: string): Promise<boolean> {
    const user = useUserStore();
    await this.pocketBase.collection('users').authWithPassword(email, password);
    user.setLoginStats(this.pocketBase.authStore.isValid);
    const userDetails: UserModel | undefined = await this.getUserDetail();
    if (userDetails === undefined) {
      user.setLoginStats(false);
      return false;
    } else {
      user.setUser(userDetails);
    }
    return this.pocketBase.authStore.isValid;
  }

  async SignInUsingOAuth2(): Promise<boolean> {
    const user = useUserStore();
    await this.pocketBase
      .collection('users')
      .authWithOAuth2({ provider: 'discord' });
    if (
      this.pocketBase.authStore.isValid &&
      this.pocketBase.authStore.token !== undefined &&
      this.pocketBase.authStore.record
    ) {
      const userDetails: UserModel | undefined = await this.getUserDetail();
      if (userDetails === undefined) {
        user.setLoginStats(false);
      } else {
        user.setUser(userDetails);
      }
      return true;
    } else {
      user.setLoginStats(false);
    }
    return false;
  }

  IsUserLoggedIn(): boolean {
    return this.pocketBase.authStore.isValid;
  }

  async GetBoxedLinks(): Promise<LinkModel[]> {
    try {
      return await this.pocketBase.collection('links').getFullList({
        filter: 'boxed = true',
        expand: 'categorie',
      });
    } catch (err: unknown) {
      await this.handleAuthError();
      console.error(err);
      return [];
    }
  }

  async GetAllLinks(): Promise<LinkModel[]> {
    try {
      return await this.pocketBase
        .collection('links')
        .getFullList({ expand: 'categorie' });
    } catch (err: unknown) {
      await this.handleAuthError();
      console.error(err);
      return [];
    }
  }

  async GetUnsortedLinks(): Promise<LinkModel[]> {
    try {
      return await this.pocketBase.collection('links').getFullList({
        filter: 'boxed = false',
      });
    } catch (err: unknown) {
      await this.handleAuthError();
      console.error(err);
      return [];
    }
  }

  async GetTags(): Promise<TagModel[]> {
    try {
      return await this.pocketBase.collection('categories').getFullList();
    } catch (err: unknown) {
      await this.handleAuthError();
      console.error(err);
      return [];
    }
  }

  async getUserDetail(): Promise<UserModel | undefined> {
    if (this.pocketBase.authStore.record?.id === undefined) {
      return undefined;
    } else {
      return await this.pocketBase
        .collection('users')
        .getOne(this.pocketBase.authStore.record.id);
    }
  }

  async GetPreview(url: string): Promise<DocumentPreview | undefined> {
    const encodedUrl = encodeURIComponent(encodeURIComponent(url));
    const requestUrl = new URL(
      import.meta.env.VITE_PB_BACKEND + 'api/url_preview/' + encodedUrl,
    );

    try {
      const res = await fetch(requestUrl);
      const data = await res.json();
      return data === 'Error Scraping' ? undefined : (data as DocumentPreview);
    } catch (error) {
      console.error('Error fetching URL preview:', error);
      return undefined;
    }
  }

  async CreateLink(
    link: string,
    preview: DocumentPreview | undefined,
    categories: string[],
    read = false,
  ): Promise<LinkModel | undefined> {
    const data = {
      link: link,
      description: preview?.Description ?? '',
      tagsFK: [],
      userFK: this.pocketBase.authStore.record?.id,
      read: read,
      categorie: categories,
      title: preview?.Title ?? '',
      image: (preview?.Images.length ?? 0) > 0 ? preview?.Images[0] : '',
    };

    try {
      return await this.pocketBase.collection('links').create(data);
    } catch (err: unknown) {
      await this.handleAuthError();
      console.error(err);
    }
  }

  async CreateTag(name: string): Promise<TagModel | undefined> {
    const data = {
      name: name,
      userFK: this.pocketBase.authStore.model?.id,
    };
    try {
      return await this.pocketBase.collection('categories').create(data);
    } catch (err: unknown) {
      await this.handleAuthError();
      console.error(err);
    }
  }

  async UpdateLink(link: LinkModel):Promise<LinkModel> {
    return await this.pocketBase.collection('links').update(link.id, link);
  }

  async DeleteLinkEntry(id: string): Promise<boolean> {
    try {
      return this.pocketBase.collection('links').delete(id);
    } catch (err: unknown) {
      await this.handleAuthError();
      console.error(err);
      return false;
    }
  }

  async Logout() {
    const user = useUserStore();
    user.setLoginStats(false);

    //Somehow logout threw an error that this is undefined
    const tPB = new PocketBase(import.meta.env.VITE_PB_BACKEND);
    tPB.authStore.clear();
    await router.replace('/login');
  }

  async handleAuthError() {
    await this.Logout();
  }

  async setToken(token: string): Promise<void> {
    if (
      this.pocketBase.authStore.isValid &&
      this.pocketBase.authStore.record !== null
    ) {
      const currentUser = {
        ...this.pocketBase.authStore.record,
        exttoken: token,
      };
      await this.pocketBase
        .collection('users')
        .update(this.pocketBase.authStore.record.id, currentUser);
    }
  }
}
