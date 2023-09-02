import PocketBase, { ClientResponseError } from 'pocketbase';
import { isUserLoggedIn } from '$lib/store/store';
import type { LinkModel } from '$lib/model/Link';
export class PocketBaseService {
	private pocketBase: PocketBase;

	constructor() { this.pocketBase = new PocketBase('http://127.0.0.1:8090'); }
	async SignInUsingOAuth2(): Promise<boolean> {
		this.pocketBase.collection('users').authWithOAuth2({ provider: 'discord' });

		if (
			this.pocketBase.authStore.isValid &&
			this.pocketBase.authStore.token !== undefined &&
			this.pocketBase.authStore.model
		) {
			isUserLoggedIn.update(() => true);
			console.log("Login is true");
			return true;
		}
		isUserLoggedIn.update(() => false);
		return false;
	}

	IsUserLoggedIn(): boolean {
		return this.pocketBase.authStore.isValid;
	}

	delay(ms: number) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	async GetLinks(): Promise<LinkModel[] | undefined> {
		try {
			return await this.pocketBase.collection('links').getFullList();
		} catch (err: unknown) {
			if (err instanceof ClientResponseError) {
				this.handleAuthError(err);
			} else {
				console.error(err);
			}
		}
	}

	async CreateLink(link: string, description: string, read = false): Promise<LinkModel | undefined> {
		// example create data
		const data = {
			"link": link,
			"description": description,
			"tagsFK": [

			],
			"userFK": this.pocketBase.authStore.model?.id,
			"read": read,
			"categorie": [

			]
		};
		try {
			return await this.pocketBase.collection('links').create(data);
		} catch (err: unknown) {
			if (err instanceof ClientResponseError) {
				this.handleAuthError(err);
			} else {
				console.error(err);
			}
		}
	}

	Logout() {
		isUserLoggedIn.update(() => false);
		this.pocketBase.authStore.clear();
	}

	handleAuthError(err: ClientResponseError) {
		this.Logout();
		throw err;
	}
}
