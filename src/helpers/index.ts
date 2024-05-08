export const replaceUrl = (query, route?) => {
  return `${document.location.origin}${route ? route : ""}?${JSON.stringify(
    query,
  )
    .replace(/[{},"']/g, "")
    .replace(/[:]/g, "=")}`;
};
