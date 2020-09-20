/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NextApiRequest, NextApiResponse } from 'next';

import data from 'data/data.json';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  response.status(200).json({ id: request.query.id, data });
};
