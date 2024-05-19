import type { SeoResponse } from "~/types";

export default (pageUri: string): Promise<SeoResponse> =>
  $fetch(`${wordpressSEOUrl}/?url=${wordpressBaseUrl}/${pageUri}/`);
