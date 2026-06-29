// Dynamic import required because dist/server/server.js is an ES module
exports.handler = async (event, context) => {
  const { default: serverEntry } = await import("../../dist/server/server.js");

  const url = new URL(event.path, `https://${event.headers.host}`);
  if (event.queryStringParameters) {
    Object.entries(event.queryStringParameters).forEach(([k, v]) => {
      url.searchParams.set(k, v);
    });
  }

  const request = new Request(url.toString(), {
    method: event.httpMethod,
    headers: event.headers,
    body: event.body ? event.body : undefined,
  });

  const response = await serverEntry.fetch(request, {}, context);

  const headers = {};
  response.headers.forEach((value, key) => {
    headers[key] = value;
  });

  const body = await response.text();

  return {
    statusCode: response.status,
    headers,
    body,
  };
};
