import { defineStore } from "pinia";
import { toast } from "vue-sonner";

import { axiosAPI } from "@/api/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: null,
    username: null,
  }),
  actions: {
    async getCSRFToken() {
      const response = await axiosAPI.get("csrf/");
      let token = response.headers.get("X-CSRFToken");
      return token;
    },

    // async getSession() {
    //   await axiosAPI.get("/session/");
    // },

    // async login(email, password) {
    //   try {
    //     await axiosAPI.post("_allauth/browser/v1/auth/login", email, password);
    //     const response = await axiosAPI.get("_allauth/browser/v1/auth/session");
    //     this.username = response.data.data.user.display;
    //     this.isAuthenticated = true;
    //     toast("Logged in");

    //   } catch (error) {
    //     toast(error.response.data.errors.map((err) => err.message).join("; "));
    //   }
    // },

    async logout() {
      this.isAuthenticated = null;
      this.username = null;
      localStorage.removeItem("auth");
      toast("Logged out");
      await axiosAPI.delete("_allauth/browser/v1/auth/session");
    },

    // async register(username, email, password, password2) {

    //   try {
    //     const response = await axiosAPI.post(
    //       "_allauth/browser/v1/auth/signup",
    //       username,
    //       email,
    //       password,
    //       password2
    //     );

    //     if (
    //       response.status === 401 ||
    //       response.status === 200 ||
    //       response.data.flows
    //     ) {
    //       const flows = response.data.flows;
    //       console.log(response.data);
    //       console.log(flows);
    //       router.push("/verify-email");
    //       if (
    //         flows.some((flow) => flow.id === "verify_email" && flow.is_pending)
    //       ) {
    //         return;
    //       }
    //     }
    //   } catch (error) {
    //     console.log(error)
    //     toast(error.response.data.errors.map((err) => err.message).join("; "));
    //   }
    // },

    // async verifyEmail(key) {
    //   await axiosAPI.post("_allauth/browser/v1/auth/email/verify", key);
    // },
  },
  persist: true,
});
