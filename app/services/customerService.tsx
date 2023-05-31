
const _URL = 'https://localhost:7173/api/Customers';
const _URL_Address = 'https://localhost:7173/api/address';

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
    body: JSON.stringify({
      "name": data.name,
      "phoneNumber": data.phoneNumber,
      "email": data.email,
      "addresses": null
    }),
  })
  .then((response: Response) => {
    if (response.ok) {
      return true;
    }
    throw new Error('Error en la solicitud.');
  })
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

const removeAddress = (id: number) => {
  return fetch(`${_URL_Address}/delete/${id}`, {
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

const getAddresses = (id: number) => {
  return fetch(`${_URL_Address}/${id}`)
    .then(handleResponse)
    .catch((error) => console.log(error));
};

const postAddress = (data: any) => {
  return fetch(`${_URL_Address}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "customerId": data.customerId,
      "house_Apt": data.house_Apt,
      "street": data.street,
      "city": data.city,
      "state": data.state,
      "postalCode": data.postalCode,
      "country": data.country
    }),
  })
  .then((response: Response) => {
    if (response.ok) {
      return true;
    }
    throw new Error('Error en la solicitud.');
  })
  .catch((error) => console.log(error));
};

const updateAddress = (data: any) => {
  return fetch(`${_URL_Address}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "addressId": data.address.addressId,
      "customerId": data.customerId,
      "house_Apt": data.house_Apt,
      "street": data.street,
      "city": data.city,
      "state": data.state,
      "postalCode": data.postalCode,
      "country": data.country
    }),
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
    get, getAll, remove, post, postAddress ,getAddresses ,removeAddress, updateAddress
}