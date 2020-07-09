import fetch from "node-fetch";
global.fetch = fetch;

import Unsplash, { toJson } from "unsplash-js";

const unsplash = new Unsplash({
  accessKey: process.env.UNSPLASH_KEY,
  secret: process.env.UNSPLASH_SECRET,
});

export default async (req, res) => {
  const { term } = JSON.parse(req.body);

  try {
    const response = await unsplash.search.photos(term, 1, 50, { orientation: 'landscape' }).then(toJson);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.json({ error });
  }
};