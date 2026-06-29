import serverEntry from "../../dist/server/server.js";

export default async (request, context) => {
  return serverEntry.fetch(request, {}, context);
};
