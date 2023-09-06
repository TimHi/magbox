import { ref, } from 'vue'
import { defineStore } from 'pinia'
import type { UserModel } from '@/model/userModel';


export const useUserStore = defineStore('user', () => {
  const user = ref({ displayName: '', email: '', isLoggedIn: false } as UserModel)

  function setLoginStats(status: boolean) {
    user.value.isLoggedIn = status;
  }


  return { user, setLoginStats }
})
