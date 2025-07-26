"use client";

import { stripIndent } from "common-tags";
import { useSelectedVariant } from "@/app/code-block-variant-store";
import { 
  Subsection, 
  InstallationStep,
  P, 
  Callout, 
  CodeBlock, 
  Code,
  QuickTip,
  StepSection
} from "../../shared/components";
import { GenerateSecret } from "./components/GenerateSecret";

export function Installation() {
  const selectedFramework = useSelectedVariant("framework");

  const installationSteps = [
    {
      id: "install-component",
      title: "Install Component",
      description: "Install the Better Auth Convex component and dependencies",
    },
    {
      id: "set-environment-variables",
      title: "Environment Setup",
      description: "Configure environment variables and secrets",
    },
    {
      id: "better-auth-instance",
      title: "Initialize Auth",
      description: "Create Better Auth instance and configure database",
    },
    {
      id: "create-better-auth-client", 
      title: "Client Setup",
      description: "Create client instance for frontend integration",
    },
    {
      id: "mount-handlers",
      title: "Route Handlers",
      description: "Mount authentication route handlers",
    },
    {
      id: "setup-convex-client",
      title: "Provider Setup",
      description: "Wrap app with authentication provider",
    },
  ];

  return (
    <Subsection id="installation" title="Installation">
      <InstallationStep 
        id="install-component" 
        title="Install Component" 
        stepNumber={2}
        estimatedTime="1 min"
      >
        <StepSection title="Package Installation">
          <P>
            To get started, install the component, a pinned version of Better
            Auth, and the latest version of Convex.
          </P>

          <QuickTip type="warning">
            This component requires Convex <Code>1.25.0</Code> or later.
          </QuickTip>

      <CodeBlock
        variantGroup="package-manager"
        variants={[
          {
            id: "npm",
            label: "npm",
            code: stripIndent`
                npm install @convex-dev/better-auth
                npm install better-auth@1.2.12 --save-exact
                npm install convex@latest
              `,
            language: "shell",
          },
          {
            id: "pnpm",
            label: "pnpm",
            code: stripIndent`
                pnpm add @convex-dev/better-auth
                pnpm add better-auth@1.2.12 --save-exact
                pnpm add convex@latest
              `,
            language: "shell",
          },
          {
            id: "yarn",
            code: stripIndent`
                yarn add @convex-dev/better-auth
                yarn add better-auth@1.2.12 --exact
                yarn add convex@latest
              `,
            language: "shell",
          },
          {
            id: "bun",
            code: stripIndent`
                bun add @convex-dev/better-auth
                bun add better-auth@1.2.12 --exact
                bun add convex@latest
              `,
            language: "shell",
          },
        ]}
      />

        </StepSection>

        <StepSection title="Add to Convex Config">
          <P>Add the component to your application.</P>

          <CodeBlock
            language="typescript"
            filename="convex/convex.config.ts"
            highlightedLines={[2, 5]}
            code={stripIndent`
                import { defineApp } from 'convex/server'
                import betterAuth from '@convex-dev/better-auth/convex.config'

                const app = defineApp()
                app.use(betterAuth)

                export default app
              `}
          />
        </StepSection>

        <StepSection title="Configure Auth Provider">
          <P>
            Add a <Code>convex/auth.config.ts</Code> file to configure Better
            Auth as an authentication provider:
          </P>

          <CodeBlock
            language="typescript"
            filename="convex/auth.config.ts"
            code={stripIndent`
                export default {
                  providers: [
                    {
                      // Your Convex site URL is provided in a system
                      // environment variable
                      domain: process.env.CONVEX_SITE_URL,

                      // Application ID has to be "convex"
                      applicationID: "convex",
                    },
                  ],
                }
              `}
          />
        </StepSection>
      </InstallationStep>

      <InstallationStep 
        id="set-environment-variables" 
        title="Environment Setup" 
        stepNumber={3}
        estimatedTime="3 min"
      >

        <StepSection title="Generate Authentication Secret">
          <P>
            Generate a secret for encryption and generating hashes. Use the
            command below if you have openssl installed, or use the button to
            generate a random value instead.
          </P>

          <GenerateSecret />
        </StepSection>

        <StepSection title="Configure Environment Variables">
          <P>
            Add the Convex site URL environment variable to the{" "}
            <Code>.env.local</Code> file created by <Code>npx convex dev</Code>.
            It will be picked up by your framework dev server.
          </P>

      <CodeBlock
        variantGroup="framework"
        variants={[
          {
            id: "react",
            label: "React",
            language: "shell",
            filename: ".env.local",
            highlightedLines: [6, 7],
            code: stripIndent`
              # Deployment used by \`npx convex dev\`
              CONVEX_DEPLOYMENT=dev:adjective-animal-123 # team: team-name, project: project-name

              VITE_CONVEX_URL=https://adjective-animal-123.convex.cloud
              
              # Same as VITE_CONVEX_URL but ends in .site
              VITE_CONVEX_SITE_URL=https://adjective-animal-123.convex.site
            `,
          },
          {
            id: "nextjs",
            label: "Next.js",
            language: "shell",
            filename: ".env.local",
            highlightedLines: [6, 7],
            code: stripIndent`
              # Deployment used by \`npx convex dev\`
              CONVEX_DEPLOYMENT=dev:adjective-animal-123 # team: team-name, project: project-name

              NEXT_PUBLIC_CONVEX_URL=https://adjective-animal-123.convex.cloud
              
              # Same as NEXT_PUBLIC_CONVEX_URL but ends in .site
              NEXT_PUBLIC_CONVEX_SITE_URL=https://adjective-animal-123.convex.site
            `,
          },
          {
            id: "tanstack",
            label: "TanStack Start",
            language: "shell",
            filename: ".env.local",
            highlightedLines: [6, 7],
            code: stripIndent`
              # Deployment used by \`npx convex dev\`
              CONVEX_DEPLOYMENT=dev:adjective-animal-123 # team: team-name, project: project-name

              VITE_CONVEX_URL=https://adjective-animal-123.convex.cloud
              
              # Same as VITE_CONVEX_URL but ends in .site
              VITE_CONVEX_SITE_URL=https://adjective-animal-123.convex.site
            `,
          },
        ]}
      />
        </StepSection>
      </InstallationStep>

      <InstallationStep 
        id="better-auth-instance" 
        title="Initialize Better Auth" 
        stepNumber={4}
        estimatedTime="5 min"
      >
        <QuickTip type="info">
          The Better Auth component uses the Convex database adapter, which
          handles all things schema and migration related automatically.
        </QuickTip>

        <StepSection title="Add Users Table to Schema">
          <P>
            First, add a users table to your schema. Name it whatever you like.
            Better Auth has its own user table that tracks basic user data, so
            your application user table only needs fields specific to your app
            (or none at all).
          </P>

          <CodeBlock
            language="typescript"
            filename="convex/schema.ts"
            highlightedLines={[4, 5, 6]}
            code={stripIndent`
                import { defineSchema, defineTable } from "convex/server";

                export default defineSchema({
                  users: defineTable({
                    // Fields are optional
                  }),
                });
              `}
          />
        </StepSection>

        <StepSection title="Create Better Auth Instance">
          <P>Create your Better Auth instance.</P>
          
          <QuickTip type="warning">
            <strong>Note:</strong> Some Typescript errors will show until you
            save the file.
          </QuickTip>
      <CodeBlock
        variantGroup="framework"
        variants={[
          {
            id: "react",
            label: "React",
            language: "typescript",
            filename: "src/lib/auth.ts",
            code: stripIndent`
              import { convexAdapter } from "@convex-dev/better-auth";
              import { convex, crossDomain } from "@convex-dev/better-auth/plugins";
              import { betterAuth } from "better-auth";
              import { betterAuthComponent } from "../../convex/auth";
              import { type GenericCtx } from "../../convex/_generated/server";

              // You'll want to replace this with an environment variable
              const siteUrl = "http://localhost:5173";

              export const createAuth = (ctx: GenericCtx) =>
                // Configure your Better Auth instance here
                betterAuth({
                  trustedOrigins: [siteUrl],
                  database: convexAdapter(ctx, betterAuthComponent),

                  // Simple non-verified email/password to get started
                  emailAndPassword: {
                    enabled: true,
                    requireEmailVerification: false,
                  },
                  plugins: [
                    // The Convex plugin is required
                    convex(),

                    // The cross domain plugin is required for client side frameworks
                    crossDomain({
                      siteUrl,
                    }),
                  ],
                });
            `,
          },
          {
            id: "nextjs",
            label: "Next.js",
            language: "typescript",
            filename: "lib/auth.ts",
            code: stripIndent`
              import { convexAdapter } from "@convex-dev/better-auth";
              import { convex } from "@convex-dev/better-auth/plugins";
              import { betterAuth } from "better-auth";
              import { betterAuthComponent } from "../convex/auth";
              import { type GenericCtx } from "../convex/_generated/server";

              // You'll want to replace this with an environment variable
              const siteUrl = "http://localhost:3000";

              export const createAuth = (ctx: GenericCtx) =>
                // Configure your Better Auth instance here
                betterAuth({
                  // All auth requests will be proxied through your next.js server
                  baseURL: siteUrl,
                  database: convexAdapter(ctx, betterAuthComponent),

                  // Simple non-verified email/password to get started
                  emailAndPassword: {
                    enabled: true,
                    requireEmailVerification: false,
                  },
                  plugins: [
                    // The Convex plugin is required
                    convex(),
                  ],
                });
            `,
          },
          {
            id: "tanstack",
            label: "TanStack Start",
            language: "typescript",
            filename: "src/lib/auth.ts",
            code: stripIndent`
              import { convexAdapter } from "@convex-dev/better-auth";
              import { convex } from "@convex-dev/better-auth/plugins";
              import { betterAuth } from "better-auth";
              import { betterAuthComponent } from "../../convex/auth";
              import { type GenericCtx } from "../../convex/_generated/server";

              // You'll want to replace this with an environment variable
              const siteUrl = "http://localhost:3000";

              export const createAuth = (ctx: GenericCtx) =>
                // Configure your Better Auth instance here
                betterAuth({
                  // All auth requests will be proxied through your TanStack Start server
                  baseURL: siteUrl,
                  database: convexAdapter(ctx, betterAuthComponent),

                  // Simple non-verified email/password to get started
                  emailAndPassword: {
                    enabled: true,
                    requireEmailVerification: false,
                  },
                  plugins: [
                    // The Convex plugin is required
                    convex(),
                  ],
                });
            `,
          },
        ]}
      />

      <CodeBlock
        variantGroup="framework"
        variants={[
          {
            id: "react",
            label: "React",
            language: "typescript",
            filename: "convex/auth.ts",
            code: stripIndent`
              import {
                BetterAuth,
                type AuthFunctions,
              } from "@convex-dev/better-auth";
              import { api, components, internal } from "./_generated/api";
              import { query } from "./_generated/server";
              import type { Id, DataModel } from "./_generated/dataModel";

              // Typesafe way to pass Convex functions defined in this file
              const authFunctions: AuthFunctions = internal.auth;

              // Initialize the component
              export const betterAuthComponent = new BetterAuth(
                components.betterAuth,
                {
                  authFunctions,
                }
              );

              // These are required named exports
              export const {
                createUser,
                updateUser,
                deleteUser,
                createSession,
              } =
                betterAuthComponent.createAuthFunctions<DataModel>({
                  // Must create a user and return the user id
                  onCreateUser: async (ctx, user) => {
                    return ctx.db.insert("users", {});
                  },

                  // Delete the user when they are deleted from Better Auth
                  onDeleteUser: async (ctx, userId) => {
                    await ctx.db.delete(userId as Id<"users">);
                  },
                });

              // Example function for getting the current user
              // Feel free to edit, omit, etc.
              export const getCurrentUser = query({
                args: {},
                handler: async (ctx) => {
                  // Get user data from Better Auth - email, name, image, etc.
                  const userMetadata = await betterAuthComponent.getAuthUser(ctx);
                  if (!userMetadata) {
                    return null;
                  }
                  // Get user data from your application's database
                  // (skip this if you have no fields in your users table schema)
                  const user = await ctx.db.get(userMetadata.userId as Id<"users">);
                  return {
                    ...user,
                    ...userMetadata,
                  };
                },
              });
            `,
          },
          {
            id: "nextjs",
            label: "Next.js",
            language: "typescript",
            filename: "convex/auth.ts",
            code: stripIndent`
              import {
                BetterAuth,
                type AuthFunctions,
                type PublicAuthFunctions,
              } from "@convex-dev/better-auth";
              import { api, components, internal } from "./_generated/api";
              import { query } from "./_generated/server";
              import type { Id, DataModel } from "./_generated/dataModel";

              // Typesafe way to pass Convex functions defined in this file
              const authFunctions: AuthFunctions = internal.auth;
              const publicAuthFunctions: PublicAuthFunctions = api.auth;

              // Initialize the component
              export const betterAuthComponent = new BetterAuth(
                components.betterAuth,
                {
                  authFunctions,
                  publicAuthFunctions,
                }
              );

              // These are required named exports
              export const {
                createUser,
                updateUser,
                deleteUser,
                createSession,
                isAuthenticated,
              } =
                betterAuthComponent.createAuthFunctions<DataModel>({
                  // Must create a user and return the user id
                  onCreateUser: async (ctx, user) => {
                    return ctx.db.insert("users", {});
                  },

                  // Delete the user when they are deleted from Better Auth
                  onDeleteUser: async (ctx, userId) => {
                    await ctx.db.delete(userId as Id<"users">);
                  },
                });

              // Example function for getting the current user
              // Feel free to edit, omit, etc.
              export const getCurrentUser = query({
                args: {},
                handler: async (ctx) => {
                  // Get user data from Better Auth - email, name, image, etc.
                  const userMetadata = await betterAuthComponent.getAuthUser(ctx);
                  if (!userMetadata) {
                    return null;
                  }
                  // Get user data from your application's database
                  // (skip this if you have no fields in your users table schema)
                  const user = await ctx.db.get(userMetadata.userId as Id<"users">);
                  return {
                    ...user,
                    ...userMetadata,
                  };
                },
              });
            `,
          },
          {
            id: "tanstack",
            label: "TanStack Start",
            language: "typescript",
            filename: "convex/auth.ts",
            code: stripIndent`
              import {
                BetterAuth,
                type AuthFunctions,
                type PublicAuthFunctions,
              } from "@convex-dev/better-auth";
              import { api, components, internal } from "./_generated/api";
              import { query } from "./_generated/server";
              import type { Id, DataModel } from "./_generated/dataModel";

              // Typesafe way to pass Convex functions defined in this file
              const authFunctions: AuthFunctions = internal.auth;
              const publicAuthFunctions: PublicAuthFunctions = api.auth;

              // Initialize the component
              export const betterAuthComponent = new BetterAuth(
                components.betterAuth,
                {
                  authFunctions,
                  publicAuthFunctions,
                }
              );

              // These are required named exports
              export const {
                createUser,
                updateUser,
                deleteUser,
                createSession,
                isAuthenticated,
              } =
                betterAuthComponent.createAuthFunctions<DataModel>({
                  // Must create a user and return the user id
                  onCreateUser: async (ctx, user) => {
                    return ctx.db.insert("users", {});
                  },

                  // Delete the user when they are deleted from Better Auth
                  onDeleteUser: async (ctx, userId) => {
                    await ctx.db.delete(userId as Id<"users">);
                  },
                });

              // Example function for getting the current user
              // Feel free to edit, omit, etc.
              export const getCurrentUser = query({
                args: {},
                handler: async (ctx) => {
                  // Get user data from Better Auth - email, name, image, etc.
                  const userMetadata = await betterAuthComponent.getAuthUser(ctx);
                  if (!userMetadata) {
                    return null;
                  }
                  // Get user data from your application's database
                  // (skip this if you have no fields in your users table schema)
                  const user = await ctx.db.get(userMetadata.userId as Id<"users">);
                  return {
                    ...user,
                    ...userMetadata,
                  };
                },
              });
            `,
          },
        ]}
      />
        </StepSection>
      </InstallationStep>

      <InstallationStep 
        id="create-better-auth-client" 
        title="Client Setup" 
        stepNumber={5}
        estimatedTime="3 min"
      >
        <StepSection title="Create Auth Client">
          <P>
            Create a Better Auth client instance for interacting with the Better
            Auth server from your client.
          </P>

      <CodeBlock
        variantGroup="framework"
        variants={[
          {
            id: "react",
            label: "React",
            language: "typescript",
            filename: "src/lib/auth-client.ts",
            code: stripIndent`
              import { createAuthClient } from "better-auth/react";
              import {
                convexClient,
                crossDomainClient,
              } from "@convex-dev/better-auth/client/plugins";

              export const authClient = createAuthClient({
                baseURL: import.meta.env.VITE_CONVEX_SITE_URL,
                plugins: [
                  convexClient(),
                  crossDomainClient(),
                ],
              });
          `,
          },
          {
            id: "nextjs",
            label: "Next.js",
            language: "typescript",
            filename: "lib/auth-client.ts",
            code: stripIndent`
              import { createAuthClient } from "better-auth/react";
              import { convexClient } from "@convex-dev/better-auth/client/plugins";

              export const authClient = createAuthClient({
                plugins: [
                  convexClient(),
                ],
              });
          `,
          },
          {
            id: "tanstack",
            label: "TanStack Start",
            language: "typescript",
            filename: "src/lib/auth-client.ts",
            code: stripIndent`
              import { createAuthClient } from "better-auth/react";
              import { convexClient } from "@convex-dev/better-auth/client/plugins";

              export const authClient = createAuthClient({
                plugins: [
                  convexClient(),
                ],
              });
          `,
          },
        ]}
      />

      {selectedFramework === "tanstack" && (
        <>
          <P>
            You&apos;ll also want to export some framework helpers here.
          </P>

          <CodeBlock
            variantGroup="framework"
            variants={[
              {
                id: "react",
                label: "React",
                language: "typescript",
                filename: "src/lib/server-auth-utils.ts",
                addedLines: [1, 2, 3, 4, 5, 6, 7],
                code: stripIndent`
                  import { createAuth } from './auth'
                  import { reactStartHelpers } from '@convex-dev/better-auth/react-start'

                  export const { fetchSession, reactStartHandler, getCookieName } =
                    reactStartHelpers(createAuth, {
                      convexSiteUrl: import.meta.env.VITE_CONVEX_SITE_URL,
                    })

                `,
              },
            ]}
          />
        </>
      )}
        </StepSection>
      </InstallationStep>

      <InstallationStep 
        id="mount-handlers" 
        title="Mount Handlers" 
        stepNumber={6}
        estimatedTime="2 min"
      >
        <StepSection title="Register Route Handlers">
          <P>Register Better Auth route handlers on your Convex deployment.</P>

      <CodeBlock
        variantGroup="framework"
        variants={[
          {
            id: "react",
            label: "React",
            language: "typescript",
            filename: "convex/http.ts",
            code: stripIndent`
              import { httpRouter } from 'convex/server'
              import { betterAuthComponent } from './auth'
              import { createAuth } from '../src/lib/auth'

              const http = httpRouter()

              // { cors: true } is required for client side frameworks
              betterAuthComponent.registerRoutes(http, createAuth, { cors: true })

              export default http
            `,
          },
          {
            id: "nextjs",
            label: "Next.js",
            language: "typescript",
            filename: "convex/http.ts",
            code: stripIndent`
              import { httpRouter } from 'convex/server'
              import { betterAuthComponent } from './auth'
              import { createAuth } from '../lib/auth'

              const http = httpRouter()

              betterAuthComponent.registerRoutes(http, createAuth)

              export default http
            `,
          },
          {
            id: "tanstack",
            label: "TanStack Start",
            language: "typescript",
            filename: "convex/http.ts",
            code: stripIndent`
              import { httpRouter } from 'convex/server'
              import { betterAuthComponent } from './auth'
              import { createAuth } from '../src/lib/auth'

              const http = httpRouter()

              betterAuthComponent.registerRoutes(http, createAuth)

              export default http
            `,
          },
        ]}
      />

      {selectedFramework !== "react" && (
        <>
          <P>
            Set up route handlers to proxy auth requests from your framework
            server to your Convex deployment.
          </P>

          <CodeBlock
            variantGroup="framework"
            variants={[
              {
                id: "react",
                label: "React",
                language: "shell",
                code: stripIndent`
                  // The cross domain plugin is used to redirect auth requests
                  // for client apps. This is also an option for any framework if
                  // server side auth is not needed.
                `,
              },
              {
                id: "nextjs",
                label: "Next.js",
                language: "typescript",
                filename: "app/api/auth/[...all]/route.ts",
                code: stripIndent`
                  import { nextJsHandler } from "@convex-dev/better-auth/nextjs";

                  export const { GET, POST } = nextJsHandler();
                `,
              },
              {
                id: "tanstack",
                label: "TanStack Start",
                language: "typescript",
                filename: "src/routes/api/auth/$.ts",
                code: stripIndent`
                  import { reactStartHandler } from '@/lib/auth-client'

                  export const ServerRoute = createServerFileRoute().methods({
                    GET: ({ request }) => {
                      return reactStartHandler(request)
                    },
                    POST: ({ request }) => {
                      return reactStartHandler(request)
                    },
                  })
                `,
              },
            ]}
          />
        </>
      )}
        </StepSection>
      </InstallationStep>

      <InstallationStep 
        id="setup-convex-client" 
        title="Provider Setup" 
        stepNumber={7}
        estimatedTime="2 min"
      >

        <StepSection title="Wrap Application with Provider">
          {selectedFramework === "tanstack" && (
            <>
              <P>
                Wrap your application root with{" "}
                <Code>ConvexBetterAuthProvider</Code> and make auth available in
                loaders.
              </P>
          <CodeBlock
            variantGroup="framework"
            variants={[
              {
                id: "react",
                label: "React",
                language: "typescript",
                filename: "",
                code: "",
              },
              {
                id: "nextjs",
                label: "Next.js",
                language: "typescript",
                filename: "",
                code: "",
              },
              {
                id: "tanstack",
                label: "TanStack Start",
                language: "typescript",
                filename: "src/routes/__root.tsx",
                highlightedLines: [
                  4,
                  9,
                  [14, 22],
                  [24, 34],
                  [38, 39],
                  [56, 69],
                  [74, 78],
                  83,
                ],
                code: stripIndent`
                  import {
                    Outlet,
                    createRootRouteWithContext,
                    useRouteContext,
                  } from '@tanstack/react-router'
                  import {
                    Meta,
                    Scripts,
                    createServerFn,
                  } from '@tanstack/react-start'
                  import { QueryClient } from '@tanstack/react-query'
                  import * as React from 'react'
                  import appCss from '@/styles/app.css?url'
                  import { ConvexQueryClient } from '@convex-dev/react-query'
                  import { ConvexReactClient } from 'convex/react'
                  import { getCookie, getWebRequest } from '@tanstack/react-start/server'
                  import { ConvexBetterAuthProvider } from '@convex-dev/better-auth/react'
                  import { createAuth } from '../lib/auth'
                  import {
                    authClient,
                    fetchSession,
                    getCookieName,
                  } from '@/lib/server-auth-utils'

                  // Server side session request
                  const fetchAuth = createServerFn({ method: 'GET' }).handler(async () => {
                    const sessionCookieName = await getCookieName()
                    const token = getCookie(sessionCookieName)
                    const request = getWebRequest()
                    const { session } = await fetchSession(createAuth, request)
                    return {
                      userId: session?.user.id,
                      token,
                    }
                  })

                  export const Route = createRootRouteWithContext<{
                    queryClient: QueryClient
                    convexClient: ConvexReactClient
                    convexQueryClient: ConvexQueryClient
                  }>()({
                    head: () => ({
                      meta: [
                        {
                          charSet: 'utf-8',
                        },
                        {
                          name: 'viewport',
                          content: 'width=device-width, initial-scale=1',
                        },
                      ],
                      links: [
                        { rel: 'stylesheet', href: appCss },
                        { rel: 'icon', href: '/favicon.ico' },
                      ],
                    }),
                    beforeLoad: async (ctx) => {
                      // all queries, mutations and action made with TanStack Query will be
                      // authenticated by an identity token.
                      const auth = await fetchAuth()
                      const { userId, token } = auth

                      // During SSR only (the only time serverHttpClient exists),
                      // set the auth token for Convex to make HTTP queries with.
                      if (token) {
                        ctx.context.convexQueryClient.serverHttpClient?.setAuth(token)
                      }

                      return { userId, token }
                    },
                    component: RootComponent,
                  })

                  function RootComponent() {
                    const context = useRouteContext({ from: Route.id })
                    return (
                      <ConvexBetterAuthProvider
                        client={context.convexClient}
                        authClient={authClient}
                      >
                        <RootDocument>
                          <Outlet />
                        </RootDocument>
                      </ConvexBetterAuthProvider>
                    )
                  }

                  function RootDocument({ children }: { children: React.ReactNode }) {
                    return (
                      <html lang="en" className="dark">
                        <head>
                          <Meta />
                        </head>
                        <body className="bg-neutral-950 text-neutral-50">
                          {children}
                          <Scripts />
                        </body>
                      </html>
                    )
                  }
              `,
              },
            ]}
          />
            </>
          )}

          {["react", "nextjs"].includes(selectedFramework) && (
            <P>
              Wrap your app with the <Code>ConvexBetterAuthProvider</Code>{" "}
              component.
            </P>
          )}

          {selectedFramework === "tanstack" && (
            <P>Provide context from Convex to your routes.</P>
          )}

      <CodeBlock
        variantGroup="framework"
        variants={[
          {
            id: "react",
            label: "React",
            language: "typescript",
            filename: "src/main.tsx",
            highlightedLines: [6, 7, 13, 15],
            code: stripIndent`
              import React from "react";
              import ReactDOM from "react-dom/client";
              import App from "./App";
              import "./index.css";
              import { ConvexReactClient } from "convex/react";
              import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
              import { authClient } from "@/lib/auth-client";

              const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

              ReactDOM.createRoot(document.getElementById("root")!).render(
                <React.StrictMode>
                  <ConvexBetterAuthProvider client={convex} authClient={authClient}>
                    <App />
                  </ConvexBetterAuthProvider>
                </React.StrictMode>
              );

          `,
          },
          {
            id: "nextjs",
            label: "Next.js",
            language: "typescript",
            filename: "app/ConvexClientProvider.tsx",
            highlightedLines: [5, 6, 12, 14],
            code: stripIndent`
              "use client";

              import { ReactNode } from "react";
              import { ConvexReactClient } from "convex/react";
              import { authClient } from "@/lib/auth-client";
              import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";

              const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

              export function ConvexClientProvider({ children }: { children: ReactNode }) {
                return (
                  <ConvexBetterAuthProvider client={convex} authClient={authClient}>
                    {children}
                  </ConvexBetterAuthProvider>
                );
              }
          `,
          },
          {
            id: "tanstack",
            label: "TanStack Start",
            language: "typescript",
            filename: "src/router.tsx",
            highlightedLines: [[13, 16], 33],
            code: stripIndent`
              import { createRouter as createTanStackRouter } from '@tanstack/react-router'
              import { routeTree } from './routeTree.gen'
              import { routerWithQueryClient } from '@tanstack/react-router-with-query'
              import { ConvexProvider, ConvexReactClient } from 'convex/react'
              import { ConvexQueryClient } from '@convex-dev/react-query'
              import { QueryClient } from '@tanstack/react-query'

              export function createRouter() {
                const CONVEX_URL = (import.meta as any).env.VITE_CONVEX_URL!
                if (!CONVEX_URL) {
                  throw new Error('missing VITE_CONVEX_URL envar')
                }
                const convex = new ConvexReactClient(CONVEX_URL, {
                  unsavedChangesWarning: false,
                })
                const convexQueryClient = new ConvexQueryClient(convex)

                const queryClient: QueryClient = new QueryClient({
                  defaultOptions: {
                    queries: {
                      queryKeyHashFn: convexQueryClient.hashFn(),
                      queryFn: convexQueryClient.queryFn(),
                    },
                  },
                })
                convexQueryClient.connect(queryClient)

                const router = routerWithQueryClient(
                  createTanStackRouter({
                    routeTree,
                    defaultPreload: 'intent',
                    scrollRestoration: true,
                    context: { queryClient, convexClient: convex, convexQueryClient },
                    Wrap: ({ children }) => (
                      <ConvexProvider client={convexQueryClient.convexClient}>
                        {children}
                      </ConvexProvider>
                    ),
                  }),
                  queryClient,
                )

                return router
              }

              declare module '@tanstack/react-router' {
                interface Register {
                  router: ReturnType<typeof createRouter>
                }
              }

            `,
          },
        ]}
      />
        </StepSection>
      </InstallationStep>
    </Subsection>
  );
}