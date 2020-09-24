/* eslint-disable no-return-await */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { VideoProps } from 'interfaces';

const URL_VIDEOS = `${
  process.env.URL_BACKEND || 'http://localhost:8080'
}/videos`;

const create = async (video: VideoProps) => {
  const response = await fetch(`${URL_VIDEOS}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(video),
  });
  if (response.ok) {
    return await response.json();
  }
  throw new Error('Não foi possível cadastrar os dados.');
};

const getSearchVideos = async (query: string) => {
  return fetch(`${URL_VIDEOS}?_expand=category&q=${query}`).then(
    async response => {
      if (response.ok) {
        return await response.json();
      }

      throw new Error('Não foi possível pegar os dados.');
    },
  );
};

export default {
  getSearchVideos,
  create,
};
