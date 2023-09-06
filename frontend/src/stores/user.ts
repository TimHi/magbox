import { ref, } from 'vue'
import { defineStore } from 'pinia'
import { UserModel } from '../model/userModel';
import { PocketBaseService } from '../service/pocketBaseService';

export const useUserStore = defineStore('user', () => {
  const user = ref({ displayName: '', email: '', isLoggedIn: false } as UserModel)

  function setLoginStats(status: boolean) {
    user.value.isLoggedIn = status;
  }


  return { user, setLoginStats }
})
