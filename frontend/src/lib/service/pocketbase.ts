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
		console.log("Start fetch");
		try {
			const id = this.pocketBase.authStore.model?.email;
			if (id === undefined) return [];
			const record = await this.pocketBase.collection('links').getFullList(100000, {
				filter: `userFK='${id}'`,
			});
			console.log(record.length);
		} catch (err: any) {
			this.handleAuthError(err);
		}
	}

	handleAuthError(err: ClientResponseError) {
		console.error(err);
		console.error(err.originalError);
		//this.Logout();
	}
}
