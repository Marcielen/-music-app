const TOKEN = "token";

export const auth = {
  setToken(dados: any) {
    localStorage.setItem(TOKEN, dados);
  },

  getToken(): any {
    if (typeof window !== "undefined") {
      return localStorage.getItem(TOKEN);
    } else {
      return "";
    }
  },
};
