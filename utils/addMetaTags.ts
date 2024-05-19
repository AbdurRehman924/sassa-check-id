import * as cheerio from "cheerio";

export default (tags: string) => {
  const $ = cheerio.load(tags);
  const title = $("title").text();
  const metas = $("meta")
    .toArray()
    .map((meta) => $(meta).attr());

  useHead({
    title,
    meta: metas.map((meta) => ({ ...meta, hid: meta?.name || meta?.property })),
  });
};
