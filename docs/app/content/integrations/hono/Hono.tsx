import { stripIndent } from "common-tags";
import { Subsection, P, Code, CodeBlock, Callout } from "../../shared/components";

export function Hono() {
  return (
    <Subsection id="integrations-hono" title="Hono">
      <P>
        <a href="https://hono.dev/" className="underline">
          Hono
        </a>{" "}
        can be used in place of the component <Code>registerRoutes()</Code>{" "}
        method. Check out the{" "}
        <a
          href="https://stack.convex.dev/hono-with-convex#using-hono-with-convex"
          className="underline"
        >
          Convex w/ Hono Stack article
        </a>{" "}
        and the{" "}
        <a
          href="https://www.better-auth.com/docs/integrations/hono"
          className="underline"
        >
          Better Auth Hono docs
        </a>{" "}
        for more details.
      </P>
      <Callout>
        You&apos;ll need to install the <Code>convex-helpers</Code> package
        if you haven&apos;t already.
      </Callout>
      <CodeBlock
        variantGroup="framework"
        variants={[
          {
            id: "react",
            label: "React",
            language: "typescript",
            filename: "convex/http.ts",
            code: stripIndent`
              import { Hono } from "hono";
              import { HonoWithConvex, HttpRouterWithHono } from "convex-helpers/server/hono";
              import { cors } from "hono/cors";
              import { ActionCtx } from "./_generated/server";
              import { createAuth } from "../lib/auth";

              const app: HonoWithConvex<ActionCtx> = new Hono();

              app.use(
                "/api/auth/*",
                cors({
                  origin: "http://localhost:5173",
                  allowHeaders: ["Content-Type", "Authorization", "Better-Auth-Cookie"],
                  allowMethods: ["GET", "POST", "OPTIONS"],
                  exposeHeaders: ["Content-Length", "Set-Better-Auth-Cookie"],
                  maxAge: 600,
                  credentials: true,
                })
              );

              // Redirect root well-known to api well-known
              app.get("/.well-known/openid-configuration", async (c) => {
                return c.redirect('/api/auth/convex/.well-known/openid-configuration')
              });

              app.on(["POST", "GET"], "/api/auth/*", async (c) => {
                const auth = createAuth(c.env);
                return auth.handler(c.req.raw);
              });

              const http = new HttpRouterWithHono(app);

              export default http;
            `,
          },
          {
            id: "next",
            label: "Next.js",
            language: "typescript",
            filename: "convex/http.ts",
            code: stripIndent`
              import { Hono } from "hono";
              import { HonoWithConvex, HttpRouterWithHono } from "convex-helpers/server/hono";
              import { ActionCtx } from "./_generated/server";
              import { createAuth } from "../lib/auth";

              const app: HonoWithConvex<ActionCtx> = new Hono();

              // Redirect root well-known to api well-known
              app.get("/.well-known/openid-configuration", async (c) => {
                return c.redirect('/api/auth/convex/.well-known/openid-configuration')
              });

              app.on(["POST", "GET"], "/api/auth/*", async (c) => {
                const auth = createAuth(c.env);
                return auth.handler(c.req.raw);
              });

              const http = new HttpRouterWithHono(app);

              export default http;
            `,
          },
          {
            id: "tanstack",
            label: "TanStack Start",
            language: "typescript",
            filename: "convex/http.ts",
            code: stripIndent`
              import { Hono } from "hono";
              import { HonoWithConvex, HttpRouterWithHono } from "convex-helpers/server/hono";
              import { ActionCtx } from "./_generated/server";
              import { createAuth } from "../src/lib/auth";

              const app: HonoWithConvex<ActionCtx> = new Hono();

              // Redirect root well-known to api well-known
              app.get("/.well-known/openid-configuration", async (c) => {
                return c.redirect('/api/auth/convex/.well-known/openid-configuration')
              });

              app.on(["POST", "GET"], "/api/auth/*", async (c) => {
                const auth = createAuth(c.env);
                return auth.handler(c.req.raw);
              });

              const http = new HttpRouterWithHono(app);

              export default http;
            `,
          },
        ]}
      />
    </Subsection>
  );
}