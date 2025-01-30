const API_URL = 'https://679a6036747b09cdccceab12.mockapi.io/todos';

const services = {
  get: (id) => fetch(API_URL + (id ? `/${id}` : '')).then(data => data.json()),
  delete: (id) => fetch(API_URL + `/${id}`, {method: 'DELETE'}).then(data => data.json()),
  put: (id, item) => fetch(API_URL + `/${id}`, 
    {
      method: 'PUT', 
      body: JSON.stringify(item), 
      headers: {
        "Content-type": "application/json"
      }
    }).then(data => data.json()),
  post: (item) => fetch((API_URL), 
    {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        "Content-type": "application/json"
      }
    }).then(data => data.json())
}

export {services};
