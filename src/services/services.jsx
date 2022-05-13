//import { isEmpty } from 'lodash.isempty';

export default class SearchTickets {
  _baseUrl = 'https://aviasales-test-api.kata.academy';

  getSearchId() {
    const url = `${this._baseUrl}/search`;
    return this._fetch(url);
  }

  getTickets(id) {
    const url = `${this._baseUrl}/tickets?searchId=${id}`;
    return this._fetch(url);
  }

  async _fetch(url, data = null) {
    const resp = await fetch(url, data);

    if (!resp.ok) {
      throw `Error ${resp.status}: ${resp.statusText}`;
    }
    return await resp.json();
  }
}
