
const _URL = 'https://localhost:7173/api/Customers';

const handleResponse = (response: Response) => {
  if (response.ok) {
    return response.json();
  }
  throw new Error('Error en la solicitud.');
};

const getAll = () => {
  return fetch(_URL)
    .then(handleResponse)
    .catch((error) => console.log(error));
};

const get = (id: number) => {
  return fetch(`${_URL}/${id}`)
    .then(handleResponse)
    .catch((error) => console.log(error));
};

const post = (data: any) => {
  return fetch(`${_URL}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(handleResponse)
    .catch((error) => console.log(error));
};



const remove = (id: number) => {
  return fetch(`${_URL}/delete/${id}`, {
    method: 'DELETE',
  })
    .then((response: Response) => {
      if (response.ok) {
        return true;
      }
      throw new Error('Error en la solicitud.');
    })
    .catch((error) => console.log(error));
};

export const customerService = {
    get, getAll, remove, post
}