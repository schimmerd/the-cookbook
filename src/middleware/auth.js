import Cookies from "js-cookie";

class Auth {

  logout() {
    Cookies.remove("__session");
    window.location.reload();
  }

  getSession() {
    const __session = Cookies.get("__session");
    return JSON.parse(__session);
  }

  setAuthenticated(authenticated, user) {
    const session = {
      authenticated: authenticated,
      profile: user
    };
    Cookies.set("__session", JSON.stringify(session));
  }

  isAuthenticated() {
    const session = Cookies.get("__session");
    if (!session) {
      return false;
    }
    return JSON.parse(session).authenticated;
  }
}

export default new Auth();
