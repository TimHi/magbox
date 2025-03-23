import type { UserModel } from '@/model/userModel.ts';
import { defineStore } from 'pinia';
import { PocketBaseService } from '@/service/pocketBaseService.ts';

export const useUserStore = defineStore('user', {
  state: () => ({
    pb: new PocketBaseService(),
    user: { isLoggedIn: false, username: '', email: '' } as UserModel,
  }),

  actions: {
    setUser(newUser: UserModel) {
      this.user.isLoggedIn = newUser.isLoggedIn;
      this.user.username = newUser.username;
      this.user.email = newUser.email;
    },
    setLoginStats(status: boolean) {
      this.user.isLoggedIn = status;
      this.user.username = '';
      this.user.email = '';
    },
    async getUserDetails(): Promise<UserModel | undefined> {
      const refreshedUser = await this.pb.getUserDetail();
      if (refreshedUser !== undefined) {
        this.user = {
          username: refreshedUser.username,
          email: refreshedUser.email,
          isLoggedIn: this.pb.IsUserLoggedIn(),
        };
        return this.user;
      } else {
        return undefined;
      }
    },
  },
});
