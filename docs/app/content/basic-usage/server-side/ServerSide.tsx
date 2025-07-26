import { stripIndent } from "common-tags";
import { Subsection, ContentHeading, P, Code, CodeBlock, Callout } from "../../shared/components";

export function ServerSide() {
  return (
    <Subsection id="basic-usage-server-side" title="Server side">
      <ContentHeading id="using-auth-api" title="Using auth.api" />
      <P>
        For full stack frameworks like Next.js and TanStack Start, Better
        Auth provides server side functionality via <Code>auth.api</Code>{" "}
        methods. With Convex, you would instead run these methods in your
        Convex functions.
      </P>
      <P>
        <Code>auth.api</Code> methods require request headers. The Convex
        component provides a method for generating headers for the current
        session.
      </P>
      <Callout>
        <Code>auth.api</Code> read-only methods can be run in a query. Use a
        mutation for anything that updates Better Auth tables.
      </Callout>

      <CodeBlock
        language="typescript"
        filename="convex/someFile.ts"
        code={stripIndent`
            import { betterAuthComponent } from "./auth";
            import { createAuth } from "../src/lib/auth";

            // Example: using the getSession method in a Convex query

            export const getSession = query({
              args: {},
              handler: async (ctx) => {
                const auth = createAuth(ctx);
                const headers = await betterAuthComponent.getHeaders(ctx);
                const session = await auth.api.getSession({
                  headers,
                });
                if (!session) {
                  return null;
                }
                // Do something with the session
                return session;
              }
            });
          `}
      />
    </Subsection>
  );
}