import { defineStore } from 'pinia'
import type { UserModel } from '../model/userModel';
import { PocketBaseService } from '@/service/pocketBaseService';


export const useUserStore = defineStore('user', {
  state: () => ({
    pb: new PocketBaseService(),
    user: { isLoggedIn: false, username: '', email: '' } as UserModel,
  }),

  actions: {
    setLoginStats(status: boolean) {
      this.user.isLoggedIn = status;
    },
    async getUserDetails(): Promise<UserModel | undefined> {

      const refreshedUser = await this.pb.getUserDetail();
      console.log(refreshedUser);
      if (refreshedUser !== undefined) {
        this.user = { username: refreshedUser.username, email: refreshedUser.email, isLoggedIn: this.pb.IsUserLoggedIn() };
        return this.user;
      } else {
        return undefined;
      }
    }
  },
})
