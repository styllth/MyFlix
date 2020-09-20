/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NextApiRequest, NextApiResponse } from 'next';

import data from 'data/data.json';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const {
    query: { id },
    method,
  } = request;

  switch (method) {
    case 'GET':
      // Get data from your database
      response.status(200).json(data);
      break;
    case 'PUT':
      // Update or create data in your database
      response.status(200).json({ id });
      break;
    default:
      response.setHeader('Allow', ['GET', 'PUT']);
      response.status(405).end(`Method ${method} Not Allowed`);
  }
};
