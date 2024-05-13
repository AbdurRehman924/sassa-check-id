import * as cheerio from "cheerio";
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const fetchSeoData = async (page_slug) => {
    try {
      const response = await fetch(
        `${config.public.domain}/wp-json/rankmath/v1/getHead?url=${config.public.domain}/${page_slug}`
      );
      const data = await response.json();

      const $ = cheerio.load(data.head);
      const title = $("title").text();
      const metas = $("meta")
        .toArray()
        .map((meta) => $(meta).attr());
      //   const scripts = $("script")
      //     .toArray()
      //     .map((script) => {
      //       const type = $(script).attr("type");
      //       const content = $(script).html();
      //       return { type, content };
      //     });

      return { title, metas };
    } catch (error) {
      console.error(error);
    }
  };
  return {
    provide: {
      fetchSeoData,
    },
  };
});
