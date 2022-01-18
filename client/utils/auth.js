import decode from "jwt-decode";

class AuthService {
	getToken() {
		return localStorage.getItem("id_token");
	}
	isTokenExpired(token) {
		try {
			const decodedToken = decode(token);
			if (decodedToken.exp < Date.now() / 1000) {
				return true;
			} else {
				return false;
			}
		} catch (err) {
			console.error(err);
			return false;
		}
	}
	login(idToken) {
		// save the user's token to localstorage
		localStorage.setItem("id_token", idToken);
		window.location.assign("/");
	}
	logout() {
		// delete user's token from localstorage
		localStorage.removeItem("id_token");
		// reset app state
		window.location.assign("/");
	}
	loggedIn() {
		// look for a token, if found check to see that token is still valid
		const token = this.getToken();
		return !!token && !this.isTokenExpired(token);
	}
}

export default new AuthService();
