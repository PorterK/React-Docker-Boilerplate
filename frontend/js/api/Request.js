import store from 'store';


function RequestException(message) {
  this.message = message;
  this.name = 'RequestException';
}

export default class Request {
  // possible calls: list, getById, create, update, remove
  // special calls: login, logout
  // use all of the methods by default, as most endpoints should.
  constructor(endpoint, calls = ['list', 'getById', 'create', 'update', 'remove']) {
    this.endpoint = endpoint;
    this.calls = calls;
  }

  static request(method, endpoint, body = {}, auth = false) {
    const token = auth ? store.get('token') : '';

    return new Promise((resolve, reject) => {
      request(method, `/api/${endpoint}`)
        .send(body)
        .set('token', token)
        .then(resolve)
        .catch((err) => {
          console.error(err);
          const resp = { status: err.status, error: err.res };
          reject(new Error(resp));
        });
    });
  }

  list() {
    if (_.includes(this.calls, 'list')) {
      return Request.request('GET', this.endpoint);
    }
    throw new RequestException('ListNotValid');
  }

  get(id) {
    if (_.includes(this.calls, 'getById')) {
      return Request.request('GET', `${this.endpoint}/${id}`);
    }
    throw new RequestException('getByIdNotValid');
  }

  create(data, auth = false) {
    if (_.includes(this.calls, 'create')) {
      return Request.request('POST', this.endpoint, data, auth);
    }
    throw new RequestException('CreateNotValid');
  }

  remove(id, auth = false) {
    if (_.includes(this.calls, 'remove')) {
      return Request.request('delete', `${this.endpoint}/${id}`, {}, auth);
    }
    throw new RequestException('RemoveNotValid');
  }

  update(id, data, auth = false) {
    if (_.includes(this.calls, 'update')) {
      return Request.request('put', `${this.endpoint}/${id}`, data, auth);
    }
    throw new RequestException('UpdateNotValid');
  }

}
