import { stripIndent } from "common-tags";
import { Subsection, ContentHeading, P, Code, CodeBlock, Ul, Li } from "../../shared/components";

export function Authorization() {
  return (
    <Subsection id="basic-usage-authorization" title="Authorization">
      <ContentHeading id="basic-usage-authorization-react" title="React" />
      <P>
        To check authentication state in your React components, use the{" "}
        authentication state components from <Code>convex/react</Code>.
      </P>
      <CodeBlock
        language="tsx"
        filename="App.tsx"
        code={stripIndent`
            import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";

            export default function App() {
              return (
                <>
                  <AuthLoading>
                    <div>Loading...</div>
                  </AuthLoading>
                  <Authenticated>
                    <Dashboard />
                  </Authenticated>
                  <Unauthenticated>
                    <SignIn />
                  </Unauthenticated>
                </>
              )
            }
          `}
      />
      <ContentHeading
        id="basic-usage-authorization-convex-functions"
        title="Convex Functions"
      />
      <P>
        For authorization and user checks inside Convex functions (queries,
        mutations, actions), use Convex&apos;s <Code>ctx.auth</Code> or the
        <Code>getAuthUserId()</Code>/<Code>getAuthUser()</Code> methods on
        the Better Auth Convex component:
      </P>
      <CodeBlock
        language="ts"
        filename="convex/someFile.ts"
        code={stripIndent`
            import { betterAuthComponent } from "./auth";
            import { Id } from "./_generated/dataModel";

            export const myFunction = query({
              args: {},
              handler: async (ctx) => {
                // You can get the user id directly from Convex via ctx.auth
                const identity = await ctx.auth.getUserIdentity();
                if (!identity) {
                  return null;
                }
                // For now the id type requires an assertion
                const userIdFromCtx = identity.subject as Id<"users">;

                // The component provides a convenience method to get the user id
                const userId = await betterAuthComponent.getAuthUserId(ctx);
                if (!userId) {
                  return null
                }

                const user = await ctx.db.get(userId as Id<"users">);


                // Get user email and other metadata from the Better Auth component
                const userMetadata = await betterAuthComponent.getAuthUser(ctx);

                // You can combine them if you want
                return { ...userMetadata, ...user };
              }
            });
          `}
      />

      <ContentHeading
        id="basic-usage-authorization-framework-server"
        title="Framework server"
      />
      <P>
        Framework server-side authentication with the Better Auth component
        works similar to other Convex authentication providers. See the
        Convex docs for your framework for more details.
      </P>
      <Ul>
        <Li>
          <a
            href="https://docs.convex.dev/client/react/nextjs/server-rendering#server-side-authentication"
            className="underline"
          >
            Next.js
          </a>
        </Li>
        <Li>
          <a
            href="https://docs.convex.dev/client/react/tanstack-start/#authentication"
            className="underline"
          >
            TanStack Start
          </a>
        </Li>
      </Ul>

      <P>
        Framework server side authentication with Convex requires a token.
        To get an identity token with Better Auth, use the framework
        appropriate <Code>getToken</Code> approach.
      </P>

      <CodeBlock
        variantGroup="framework"
        variants={[
          {
            id: "next",
            label: "Next.js",
            language: "typescript",
            filename: "app/actions.ts",
            code: stripIndent`
            "use server";

            import { api } from "@/convex/_generated/api";
            import { getToken } from "@convex-dev/better-auth/nextjs";
            import { fetchMutation } from "convex/nextjs";
            import { createAuth } from "../lib/auth";

            // Authenticated mutation via server function
            export async function createPost(title: string, content: string) {
              const token = await getToken(createAuth);
              await fetchMutation(api.posts.create, { title, content }, { token });
            }
          `,
          },
          {
            id: "tanstack",
            label: "TanStack Router",
            language: "typescript",
            filename: "src/routes/index.tsx",
            code: stripIndent`
              import { createServerFn } from "@tanstack/react-start";
              import { ConvexHttpClient } from "convex/browser";
              import { getCookieName } from "../lib/server-auth-utils";
              import { api } from "../../convex/_generated/api";

              const setupClient = (token?: string) => {
                const client = new ConvexHttpClient(import.meta.env.VITE_CONVEX_URL)
                if (token) {
                  client.setAuth(token)
                }
                return client
              }

              const getToken = async () => {
                const sessionCookieName = await getCookieName()
                return getCookie(sessionCookieName)
              }

              export const createPost = createServerFn({ method: 'POST' })
                .handler(async ({ data: { title, content } }) => {
                  const token = await getToken()
                  await setupClient(token).mutation(api.posts.create, {
                    title,
                    content,
                  })
                })
            `,
          },
        ]}
      />
    </Subsection>
  );
}