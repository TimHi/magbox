import PocketBase from 'pocketbase';

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
}
