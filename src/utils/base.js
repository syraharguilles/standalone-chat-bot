export const getAbsoluteURL = (session, uri) => {
  const url = new URL(session.HTTP_URL);
  if (typeof window !== 'undefined') {
    url.port = PUBLIC_PORT.toString();
  }
  url.pathname = [url.pathname, uri].join('/').replace(/\/{2,}/g, '/');
  return url.toString();
  };

  if (typeof module !== 'undefined') {
  module.exports = {
    getAbsoluteURL
  };
}

export const stripUriSlashes = url => {
  const u = new URL(url);
  u.pathname = u.pathname.replace(/\/{2,}/g, '/');
  return u.toString();
};