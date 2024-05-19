export default (pageUri) =>
  $fetch(`${wordpressSEOUrl}/?url=${wordpressBaseUrl}/${pageUri}/`);
