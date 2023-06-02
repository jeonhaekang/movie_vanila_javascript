export const toQueryString = params => {
  const query = Object.entries(params).reduce((queries, [key, value]) => {
    return [...queries, `${key}=${value}`];
  }, []);

  return query.join("&");
};
