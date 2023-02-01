const TOKEN = "token";
const NAMEUSER = "nameUser";
const PHOTOUSER = "photoUser";
const EMAIL = "email";

export const auth = {
  setToken(data: any) {
    localStorage.setItem(TOKEN, data);
  },

  setNameUser(data: any) {
    localStorage.setItem(NAMEUSER, data);
  },

  setEmail(data: any) {
    localStorage.setItem(EMAIL, data);
  },

  setPhotoUser(data: any) {
    localStorage.setItem(PHOTOUSER, data);
  },

  getToken(): any {
    if (typeof window !== "undefined") {
      return localStorage.getItem(TOKEN);
    } else {
      return "";
    }
  },

  getNameUser(): any {
    if (typeof window !== "undefined") {
      return localStorage.getItem(NAMEUSER);
    } else {
      return "";
    }
  },

  getEmail(): any {
    if (typeof window !== "undefined") {
      return localStorage.getItem(EMAIL);
    } else {
      return "";
    }
  },

  getPhotoUser(): any {
    if (typeof window !== "undefined") {
      return localStorage.getItem(PHOTOUSER);
    } else {
      return "";
    }
  },

  clearToken(): any {
    localStorage.clear();
  },
};
