import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: "l6cf3d7a",
  dataset: "production",
  useCdn: true,
  apiVersion: "2021-10-21",
});

const imgbuilder = imageUrlBuilder(client);
export const urlFor = (source) => imgbuilder.image(source);

export default client;
