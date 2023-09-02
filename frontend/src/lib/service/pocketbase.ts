import PocketBase, { ClientResponseError, type RecordModel } from 'pocketbase';

export class PocketBaseService {
	private pocketBase = new PocketBase('http://localhost:8090');
	SignInUsingOAuth2(): boolean {
		const authData = this.pocketBase.collection('users').authWithOAuth2({ provider: 'discord' });

		if (
			this.pocketBase.authStore.isValid &&
			this.pocketBase.authStore.token !== undefined &&
			this.pocketBase.authStore.model
		)
			return true;
		return false;
	}

	Logout() {
		// "logout" the last authenticated account
		this.pocketBase.authStore.clear();
	}

	async GetLinks() {
		console.log(this.pocketBase.authStore.model?.email);
		console.log("Start fetch");
		try {

			const records = await this.pocketBase.collection('links').getFullList();
			console.log(records.length);
			console.log(records);
		} catch (err: any) {
			this.handleAuthError(err);
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
		} catch (error: any) {
			this.handleAuthError(error);
		}
	}

	handleAuthError(err: ClientResponseError) {
		console.log("Error>?");
		console.error(err);
		console.error(err.originalError);
		//this.Logout();
	}
}
