const TOKEN = "token";

export const auth = {
  setToken(dados: any) {
    localStorage.setItem(TOKEN, dados);
  },

  getToken(): any {
    return localStorage.getItem(TOKEN);
  },
};
