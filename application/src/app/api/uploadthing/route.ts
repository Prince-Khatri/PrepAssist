import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";
import { config } from "@/config/config";

export const runtime = 'edge';

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    token: config.uploadthing_secret
  }
});
