import { moviesApiSettings } from "./constants";
import Api from "./Api";

class MoviesApi extends Api {
  constructor({ baseUrl, headers }) {
    super({ baseUrl, headers });
  }

  async getMoviesList() {
    const params = {
      relativePath: "/beatfilm-movies",
      method: "GET",
    };
    const response = await this._getProxy(params);
    return await this._handleResponse(response);
  }
}

export default new MoviesApi(moviesApiSettings);
