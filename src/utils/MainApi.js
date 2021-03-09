import { mainApiSettings } from "./constants";
import Api from "./Api";

class MainApi extends Api {
  constructor({ baseUrl, headers }) {
    super({ baseUrl, headers });
  }

  async signUp({ password, email }) {
    const params = {
      relativePath: "/signup",
      method: "POST",
      body: JSON.stringify({ password, email }),
    };
    const response = await this._getProxy(params);
    return await this._handleResponse(response);
  }

  async signIn({ password, email }) {
    const params = {
      relativePath: "/signin",
      method: "POST",
      body: JSON.stringify({ password, email }),
    };
    const response = await this._getProxy(params);
    return await this._handleResponse(response);
  }

  async signOut() {
    const params = {
      relativePath: "/signout",
      method: "POST",
    };
    const response = await this._getProxy(params);
    return await this._handleResponse(response);
  }

  async getUserData() {
    const params = {
      relativePath: "/users/me",
      method: "GET",
    };
    const response = await this._getProxy(params);
    return await this._handleResponse(response);
  }

  async setUserData({ name, about }) {
    const params = {
      relativePath: "/users/me",
      method: "POST",
      body: JSON.stringify({ name, about }),
    };
    const response = await this._getProxy(params);
    return await this._handleResponse(response);
  }

  async getMoviesList() {
    const params = {
      relativePath: "/movies",
      method: "GET",
    };
    const response = await this._getProxy(params);
    return await this._handleResponse(response);
  }

  async addMovies({ name, link }) {
    const params = {
      relativePath: "/movies",
      method: "POST",
      body: JSON.stringify({ name, link }),
    };
    const response = await this._getProxy(params);
    return await this._handleResponse(response);
  }

  async deleteMovies(id) {
    const params = {
      relativePath: `/cards/${id}`,
      method: "DELETE",
    };
    const response = await this._getProxy(params);
    return await this._handleResponse(response);
  }
}

export default new MainApi(mainApiSettings);
