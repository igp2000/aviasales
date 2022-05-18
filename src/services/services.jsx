/*
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
*/
const _baseUrl = 'https://aviasales-test-api.kata.academy';

export function getSearchId() {
  const url = `${_baseUrl}/search`;
  return _fetch(url);
}

export function requestTickets(id) {
  const url = `${_baseUrl}/tickets?searchId=${id}`;
  return _fetch(url);
}

async function _fetch(url, data = null) {
  const resp = await fetch(url, data);

  if (!resp.ok) {
    throw `Error ${resp.status}: ${resp.statusText}`;
  }
  return await resp.json();
}
