import PocketBase, { ClientResponseError } from 'pocketbase';
import { isUserLoggedIn } from '$lib/store/store';
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
			return true;
		}
		isUserLoggedIn.update(() => false);
		return false;
	}

	IsUserLoggedIn(): boolean {
		return this.pocketBase.authStore.isValid;
	}

	async GetLinks() {
		console.log(this.pocketBase.authStore.model?.email);
		console.log("Start fetch");
		try {

			const records = await this.pocketBase.collection('links').getFullList();
			console.log(records.length);
			console.log(records);
		} catch (err: unknown) {
			console.log('ITS FUCKED MAN');
			if (err instanceof ClientResponseError) {
				this.handleAuthError(err);
			} else {
				console.error(err);
			}
		}
	}

	async CreateLink() {
		// example create data
		const data = {
			"link": "https://example.com",
			"description": "test",
			"tagsFK": [

			],
			"userFK": this.pocketBase.authStore.model?.id,
			"read": true,
			"categorie": [

			]
		};
		try {
			const record = await this.pocketBase.collection('links').create(data);
			console.log(record);
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
		console.error(err);
		console.error(err.originalError);
		this.Logout();
	}
}
