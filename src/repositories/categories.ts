/* eslint-disable no-return-await */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CategoryProps } from 'interfaces';

const URL_CATEGORIES = `${
  process.env.URL_BACKEND || 'http://localhost:8080'
}/categories`;

const create = async (category: CategoryProps) => {
  return fetch(`${URL_CATEGORIES}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(category),
  }).then(async response => {
    if (response.ok) return await response.json();

    throw new Error('Não foi possível cadastrar os dados :(');
  });
};

const remove = async (id: number) => {
  const response = await fetch(`${URL_CATEGORIES}/${id}`, {
    method: 'DELETE',
  });
  if (response.ok) return await response.json();
  throw new Error('Não foi possível remover os dados :(');
};

const getAll = async () => {
  return fetch(`${URL_CATEGORIES}`).then(async response => {
    if (response.ok) return await response.json();

    throw new Error('Não foi possível pegar os dados :(');
  });
};

const getAllWithVideos = async () => {
  return fetch(`${URL_CATEGORIES}?_embed=videos`).then(async response => {
    if (response.ok) return await response.json();

    throw new Error('Não foi possível pegar os dados :(');
  });
};

export default {
  create,
  remove,
  getAllWithVideos,
  getAll,
};
