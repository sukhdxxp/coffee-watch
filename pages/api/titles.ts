// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { searchTitle } from "../../lib/search";

type Data = {
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {
    query: { search },
  } = req;
  const searchTerm = search as string;
  const data = await searchTitle(searchTerm);
  res.status(200).json({ data });
}
