import { defineStore } from "pinia";

const useLoginStore = defineStore("login", {
  state: () => {
    return {
      isLogin: false,
      username: "",
    };
  },
  getters: {
    getIsLogin(state) {
      return state.isLogin;
    },
    getUsername(state) {
      return state.username;
    },
  },
  actions: {},
  persist: true,
});

export default useLoginStore;
