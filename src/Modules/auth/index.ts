const TOKEN = "token";

export const auth = {
  setToken(dados: any) {
    localStorage.setItem(TOKEN, dados.token);
  },

  getToken(): any {
    return localStorage.getItem(TOKEN);
  },
};
