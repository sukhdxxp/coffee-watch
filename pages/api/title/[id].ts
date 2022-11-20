// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchTitleOffersForAllCountries } from "../../../lib/title";

type Data = {
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {
    query: { id },
  } = req;
  const data = await fetchTitleOffersForAllCountries(id as string);
  res.status(200).json({ data });
}
