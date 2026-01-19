import {
  createClient as baseCreateClient,
  type ClientConfig,
  type Route,
} from "@prismicio/client";
import { enableAutoPreviews } from "@prismicio/next";
import sm from "../slicemachine.config.json";

/**
 * The project's Prismic repository name.
 */
export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || sm.repositoryName;

/**
 * Extended fetch options that include Next.js specific cache options
 */
type NextFetchOptions = RequestInit & {
  next?: {
    tags?: string[];
    revalidate?: number;
  };
  cache?: RequestCache;
};

/**
 * A list of Route Resolver objects that define how a document's `url` field is resolved.
 *
 * {@link https://prismic.io/docs/route-resolver#route-resolver}
 */
// TODO: Update the routes array to match your project's route structure.
const routes: Route[] = [
  { type: "page", path: "/:uid" },
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export const createClient = (config: ClientConfig = {}) => {
  const fetchOptions: NextFetchOptions =
    process.env.NODE_ENV === "production"
      ? { next: { tags: ["prismic"] }, cache: "force-cache" }
      : { next: { revalidate: 5 } };

  const client = baseCreateClient(repositoryName, {
    routes,
    fetchOptions: fetchOptions as any,
    ...config,
  });

  enableAutoPreviews({ client });

  return client;
};
